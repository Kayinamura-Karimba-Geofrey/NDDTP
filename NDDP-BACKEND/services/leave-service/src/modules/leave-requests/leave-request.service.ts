import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  LeaveRequestRepository, LeaveApprovalRepository, LeaveStatusHistoryRepository,
} from './repositories/leave-request.repository';
import { LeaveTypeRepository } from '../leave-types/repositories/leave-type.repository';
import { LeaveBalanceService } from '../leave-balances/leave-balance.service';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  ResourceNotFoundException, InvalidStatusTransitionException,
  InsufficientBalanceException, BusinessRuleViolationException,
} from '../../common/exceptions/leave.exceptions';
import { CreateLeaveRequestDto, RejectLeaveDto } from './dto/leave-request.dto';
import { LeaveRequestStatus, LeaveApprovalDecision } from '../../common/enums';
import { LEAVE_STATUS_TRANSITIONS } from '../../common/constants';
import { calculateLeaveDays, getCurrentYear } from '../../common/utils/leave-days.util';

@Injectable()
export class LeaveRequestService {
  private readonly logger = new Logger(LeaveRequestService.name);

  constructor(
    private readonly repo: LeaveRequestRepository,
    private readonly approvalRepo: LeaveApprovalRepository,
    private readonly historyRepo: LeaveStatusHistoryRepository,
    private readonly typeRepo: LeaveTypeRepository,
    private readonly balanceService: LeaveBalanceService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(userId: string, dto: CreateLeaveRequestDto) {
    const leaveType = await this.typeRepo.findById(dto.leaveTypeId);
    if (!leaveType) throw new ResourceNotFoundException('LeaveType', dto.leaveTypeId);

    const totalDays = calculateLeaveDays(dto.startDate, dto.endDate);
    if (totalDays <= 0) throw new BusinessRuleViolationException('End date must be on or after start date');
    if (leaveType.maxConsecutiveDays && totalDays > leaveType.maxConsecutiveDays) {
      throw new BusinessRuleViolationException(`Maximum consecutive days for ${leaveType.name} is ${leaveType.maxConsecutiveDays}`);
    }

    const requestNumber = `LV-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const request = await this.repo.create({
      requestNumber,
      userId,
      leaveTypeId: dto.leaveTypeId,
      startDate: dto.startDate,
      endDate: dto.endDate,
      totalDays,
      reason: dto.reason ?? null,
      approverId: dto.approverId ?? null,
      status: LeaveRequestStatus.DRAFT,
    });

    await this.historyRepo.create({
      leaveRequestId: request.id,
      fromStatus: null,
      toStatus: LeaveRequestStatus.DRAFT,
      notes: 'Leave request created',
      changedBy: userId,
    });

    return this.repo.findById(request.id);
  }

  async submit(id: string, userId: string, correlationId?: string) {
    const request = await this.getAndValidateOwner(id, userId);
    this.assertTransition(request.status, LeaveRequestStatus.SUBMITTED);

    const reserve = await this.balanceService.reserveDays(
      request.userId, request.leaveTypeId, Number(request.totalDays), getCurrentYear(),
    );
    if (!reserve.ok) {
      throw new InsufficientBalanceException(reserve.available ?? 0, Number(request.totalDays));
    }

    await this.transition(id, request.status, LeaveRequestStatus.PENDING_APPROVAL, userId, 'Submitted for approval');
    await this.repo.update(id, { submittedAt: new Date(), status: LeaveRequestStatus.PENDING_APPROVAL });

    await this.publisher.publishRequestSubmitted({
      requestId: id, requestNumber: request.requestNumber, userId: request.userId,
      leaveTypeId: request.leaveTypeId, totalDays: request.totalDays,
      startDate: request.startDate, endDate: request.endDate,
    }, correlationId);

    this.logger.log(`Leave request ${request.requestNumber} submitted`);
    return this.repo.findById(id);
  }

  async approve(id: string, approverId: string, comments?: string, correlationId?: string) {
    const request = await this.findById(id);
    if (request.status !== LeaveRequestStatus.PENDING_APPROVAL) {
      throw new BusinessRuleViolationException('Only pending requests can be approved');
    }

    await this.approvalRepo.create({
      leaveRequestId: id,
      approverId,
      decision: LeaveApprovalDecision.APPROVED,
      comments: comments ?? null,
    });

    await this.balanceService.confirmDays(
      request.userId, request.leaveTypeId, Number(request.totalDays), getCurrentYear(),
    );

    await this.transition(id, request.status, LeaveRequestStatus.APPROVED, approverId, comments);
    await this.repo.update(id, { status: LeaveRequestStatus.APPROVED, approvedAt: new Date() });

    await this.publisher.publishRequestApproved({
      requestId: id, requestNumber: request.requestNumber, userId: request.userId,
      approverId, totalDays: request.totalDays, startDate: request.startDate, endDate: request.endDate,
    }, correlationId);

    return this.repo.findById(id);
  }

  async reject(id: string, approverId: string, dto: RejectLeaveDto, correlationId?: string) {
    const request = await this.findById(id);
    if (request.status !== LeaveRequestStatus.PENDING_APPROVAL) {
      throw new BusinessRuleViolationException('Only pending requests can be rejected');
    }

    await this.approvalRepo.create({
      leaveRequestId: id,
      approverId,
      decision: LeaveApprovalDecision.REJECTED,
      comments: dto.comments ?? null,
    });

    await this.balanceService.releaseDays(
      request.userId, request.leaveTypeId, Number(request.totalDays), getCurrentYear(),
    );

    await this.transition(id, request.status, LeaveRequestStatus.REJECTED, approverId, dto.rejectionReason);
    await this.repo.update(id, { status: LeaveRequestStatus.REJECTED, rejectionReason: dto.rejectionReason });

    await this.publisher.publishRequestRejected({
      requestId: id, requestNumber: request.requestNumber, userId: request.userId,
      approverId, rejectionReason: dto.rejectionReason,
    }, correlationId);

    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string, correlationId?: string) {
    const request = await this.getAndValidateOwner(id, userId);
    const cancellable = [LeaveRequestStatus.DRAFT, LeaveRequestStatus.SUBMITTED, LeaveRequestStatus.PENDING_APPROVAL];
    if (!cancellable.includes(request.status)) {
      throw new BusinessRuleViolationException('This request cannot be cancelled');
    }

    if (request.status === LeaveRequestStatus.PENDING_APPROVAL) {
      await this.balanceService.releaseDays(
        request.userId, request.leaveTypeId, Number(request.totalDays), getCurrentYear(),
      );
    }

    await this.transition(id, request.status, LeaveRequestStatus.CANCELLED, userId, 'Cancelled by requester');
    await this.repo.update(id, { status: LeaveRequestStatus.CANCELLED });

    await this.publisher.publishRequestCancelled({
      requestId: id, requestNumber: request.requestNumber, userId: request.userId,
    }, correlationId);

    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: LeaveRequestStatus; userId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.userId);
  }

  async findById(id: string) {
    const request = await this.repo.findById(id);
    if (!request) throw new ResourceNotFoundException('LeaveRequest', id);
    return request;
  }

  async findMyRequests(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, userId);
  }

  async findPendingApprovals(approverId: string, page = 1, limit = 20) {
    const [data, total] = await this.repo.findPendingForApprover(approverId, page, limit);
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  private async getAndValidateOwner(id: string, userId: string) {
    const request = await this.findById(id);
    if (request.userId !== userId) throw new BusinessRuleViolationException('You can only manage your own leave requests');
    return request;
  }

  private assertTransition(from: LeaveRequestStatus, to: LeaveRequestStatus) {
    const allowed = LEAVE_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to) && to !== LeaveRequestStatus.PENDING_APPROVAL) {
      // submit goes DRAFT -> SUBMITTED then immediately PENDING_APPROVAL
      if (!(from === LeaveRequestStatus.DRAFT && to === LeaveRequestStatus.SUBMITTED)) {
        throw new InvalidStatusTransitionException(from, to);
      }
    }
  }

  private async transition(
    requestId: string, from: LeaveRequestStatus, to: LeaveRequestStatus,
    changedBy: string, notes?: string,
  ) {
    await this.historyRepo.create({
      leaveRequestId: requestId,
      fromStatus: from,
      toStatus: to,
      notes: notes ?? null,
      changedBy,
    });
  }
}

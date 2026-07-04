import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ClaimRepository, ClaimStatusHistoryRepository, DisbursementRepository } from './repositories/claim.repository';
import { ProgramRepository } from '../programs/repositories/program.repository';
import { DependentRepository } from '../dependents/repositories/dependent.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  ResourceNotFoundException, InvalidStatusTransitionException,
  BusinessRuleViolationException,
} from '../../common/exceptions/welfare.exceptions';
import { CreateClaimDto, ApproveClaimDto, RejectClaimDto, DisburseClaimDto } from './dto/claim.dto';
import { ClaimStatus, ProgramStatus, DisbursementStatus } from '../../common/enums';
import { CLAIM_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class ClaimService {
  private readonly logger = new Logger(ClaimService.name);

  constructor(
    private readonly repo: ClaimRepository,
    private readonly historyRepo: ClaimStatusHistoryRepository,
    private readonly disbursementRepo: DisbursementRepository,
    private readonly programRepo: ProgramRepository,
    private readonly dependentRepo: DependentRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(userId: string, dto: CreateClaimDto) {
    const program = await this.programRepo.findById(dto.programId);
    if (!program) throw new ResourceNotFoundException('WelfareProgram', dto.programId);
    if (program.status !== ProgramStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Program is not active');
    }
    if (Number(dto.requestedAmount) > Number(program.maxAmount) && Number(program.maxAmount) > 0) {
      throw new BusinessRuleViolationException(`Requested amount exceeds program maximum of ${program.maxAmount}`);
    }
    if (dto.dependentId) {
      const dep = await this.dependentRepo.findById(dto.dependentId);
      if (!dep || dep.userId !== userId) throw new ResourceNotFoundException('Dependent', dto.dependentId);
    }

    const claimNumber = `WCL-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const claim = await this.repo.create({
      claimNumber,
      userId,
      programId: dto.programId,
      dependentId: dto.dependentId ?? null,
      requestedAmount: dto.requestedAmount,
      justification: dto.justification,
      status: ClaimStatus.DRAFT,
    });

    await this.recordStatus(claim.id, null, ClaimStatus.DRAFT, userId, 'Claim created');
    return this.repo.findById(claim.id);
  }

  async submit(id: string, userId: string) {
    const claim = await this.getOwned(id, userId);
    this.assertTransition(claim.status, ClaimStatus.SUBMITTED);

    await this.recordStatus(id, claim.status, ClaimStatus.UNDER_REVIEW, userId, 'Submitted for review');
    await this.repo.update(id, { status: ClaimStatus.UNDER_REVIEW, submittedAt: new Date() });

    await this.publisher.publishClaimSubmitted({
      claimId: id, claimNumber: claim.claimNumber, userId, programId: claim.programId,
      requestedAmount: claim.requestedAmount,
    });

    this.logger.log(`Claim ${claim.claimNumber} submitted`);
    return this.repo.findById(id);
  }

  async approve(id: string, reviewerId: string, dto: ApproveClaimDto) {
    const claim = await this.findById(id);
    if (claim.status !== ClaimStatus.UNDER_REVIEW && claim.status !== ClaimStatus.SUBMITTED) {
      throw new BusinessRuleViolationException('Only submitted/under-review claims can be approved');
    }
    if (dto.approvedAmount > Number(claim.requestedAmount)) {
      throw new BusinessRuleViolationException('Approved amount cannot exceed requested amount');
    }

    await this.recordStatus(id, claim.status, ClaimStatus.APPROVED, reviewerId, dto.notes);
    await this.repo.update(id, {
      status: ClaimStatus.APPROVED,
      approvedAmount: dto.approvedAmount,
      approvedAt: new Date(),
      reviewerId,
    });

    await this.disbursementRepo.create({
      claimId: id,
      amount: dto.approvedAmount,
      status: DisbursementStatus.PENDING,
    });

    await this.publisher.publishClaimApproved({
      claimId: id, claimNumber: claim.claimNumber, userId: claim.userId,
      approvedAmount: dto.approvedAmount, reviewerId,
    });

    return this.repo.findById(id);
  }

  async reject(id: string, reviewerId: string, dto: RejectClaimDto) {
    const claim = await this.findById(id);
    if (![ClaimStatus.SUBMITTED, ClaimStatus.UNDER_REVIEW].includes(claim.status)) {
      throw new BusinessRuleViolationException('Only submitted/under-review claims can be rejected');
    }

    await this.recordStatus(id, claim.status, ClaimStatus.REJECTED, reviewerId, dto.rejectionReason);
    await this.repo.update(id, { status: ClaimStatus.REJECTED, rejectionReason: dto.rejectionReason, reviewerId });

    await this.publisher.publishClaimRejected({
      claimId: id, claimNumber: claim.claimNumber, userId: claim.userId,
      rejectionReason: dto.rejectionReason, reviewerId,
    });

    return this.repo.findById(id);
  }

  async disburse(id: string, processorId: string, dto: DisburseClaimDto) {
    const claim = await this.findById(id);
    if (claim.status !== ClaimStatus.APPROVED) {
      throw new BusinessRuleViolationException('Only approved claims can be disbursed');
    }

    const disbursement = await this.disbursementRepo.findByClaimId(id);
    if (!disbursement) throw new ResourceNotFoundException('Disbursement', id);

    await this.disbursementRepo.update(disbursement.id, {
      status: DisbursementStatus.PROCESSED,
      paymentReference: dto.paymentReference ?? null,
      notes: dto.notes ?? null,
      processedBy: processorId,
      processedAt: new Date(),
    });

    await this.recordStatus(id, claim.status, ClaimStatus.DISBURSED, processorId, 'Disbursement processed');
    await this.repo.update(id, { status: ClaimStatus.DISBURSED });

    await this.publisher.publishClaimDisbursed({
      claimId: id, claimNumber: claim.claimNumber, userId: claim.userId,
      amount: disbursement.amount, paymentReference: dto.paymentReference,
    });

    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string) {
    const claim = await this.getOwned(id, userId);
    const cancellable = [ClaimStatus.DRAFT, ClaimStatus.SUBMITTED, ClaimStatus.UNDER_REVIEW];
    if (!cancellable.includes(claim.status)) {
      throw new BusinessRuleViolationException('This claim cannot be cancelled');
    }

    await this.recordStatus(id, claim.status, ClaimStatus.CANCELLED, userId, 'Cancelled by claimant');
    await this.repo.update(id, { status: ClaimStatus.CANCELLED });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: ClaimStatus; userId?: string; programId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.userId, filter.programId);
  }

  async findById(id: string) {
    const claim = await this.repo.findById(id);
    if (!claim) throw new ResourceNotFoundException('WelfareClaim', id);
    return claim;
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, userId);
  }

  async findPendingReview(page = 1, limit = 20) {
    const [data, total] = await this.repo.findPendingReview(page, limit);
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  private async getOwned(id: string, userId: string) {
    const claim = await this.findById(id);
    if (claim.userId !== userId) throw new BusinessRuleViolationException('You can only manage your own claims');
    return claim;
  }

  private assertTransition(from: ClaimStatus, to: ClaimStatus) {
    const allowed = CLAIM_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to) && !(from === ClaimStatus.DRAFT && to === ClaimStatus.SUBMITTED)) {
      throw new InvalidStatusTransitionException(from, to);
    }
  }

  private async recordStatus(claimId: string, from: ClaimStatus | null, to: ClaimStatus, changedBy: string, notes?: string) {
    await this.historyRepo.create({
      claimId, fromStatus: from, toStatus: to, notes: notes ?? null, changedBy,
    });
  }
}

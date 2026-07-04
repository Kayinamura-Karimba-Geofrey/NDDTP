import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { WorkOrderRepository } from './repositories/work-order.repository';
import { RequestRepository } from '../requests/repositories/request.repository';
import { RequestService } from '../requests/request.service';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/maintenance.exceptions';
import { CreateWorkOrderDto, ScheduleWorkOrderDto } from './dto/work-order.dto';
import { WorkOrderStatus, RequestStatus, TaskStatus } from '../../common/enums';
import { WORK_ORDER_STATUS_TRANSITIONS, CACHE_KEYS } from '../../common/constants';

@Injectable()
export class WorkOrderService {
  private readonly logger = new Logger(WorkOrderService.name);

  constructor(
    private readonly repo: WorkOrderRepository,
    private readonly requestRepo: RequestRepository,
    private readonly requestService: RequestService,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(createdBy: string, dto: CreateWorkOrderDto) {
    if (!dto.tasks?.length) throw new BusinessRuleViolationException('Work order must have at least one task');

    if (dto.requestId) {
      const req = await this.requestRepo.findById(dto.requestId);
      if (!req) throw new ResourceNotFoundException('MaintenanceRequest', dto.requestId);
      if (req.status !== RequestStatus.APPROVED) {
        throw new BusinessRuleViolationException('Request must be APPROVED before creating work order');
      }
    }

    const orderNumber = `WO-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const order = await this.repo.createWithTasks(
      {
        orderNumber,
        requestId: dto.requestId ?? null,
        assignedTo: dto.assignedTo ?? null,
        status: WorkOrderStatus.DRAFT,
        scheduledDate: dto.scheduledDate ? new Date(dto.scheduledDate) : null,
        createdBy,
        notes: dto.notes ?? null,
      },
      dto.tasks.map((t) => ({ description: t.description, estimatedHours: t.estimatedHours ?? null })),
    );

    if (dto.requestId) await this.requestService.markInProgress(dto.requestId);

    await this.repo.createLog({ workOrderId: order!.id, eventType: 'CREATED', notes: 'Work order created', recordedBy: createdBy });
    await this.publisher.publishWorkOrderCreated({ workOrderId: order!.id, orderNumber, requestId: dto.requestId });
    this.logger.log(`Work order created: ${orderNumber}`);
    return order;
  }

  async schedule(id: string, userId: string, dto: ScheduleWorkOrderDto) {
    const order = await this.findById(id);
    this.assertTransition(order.status, WorkOrderStatus.SCHEDULED);

    await this.repo.update(id, {
      status: WorkOrderStatus.SCHEDULED,
      scheduledDate: new Date(dto.scheduledDate),
      assignedTo: dto.assignedTo ?? order.assignedTo,
    });
    await this.repo.createLog({ workOrderId: id, eventType: 'SCHEDULED', notes: `Scheduled for ${dto.scheduledDate}`, recordedBy: userId });
    await this.redis.del(CACHE_KEYS.WORK_ORDER(id));
    return this.repo.findById(id);
  }

  async start(id: string, userId: string) {
    const order = await this.findById(id);
    this.assertTransition(order.status, WorkOrderStatus.IN_PROGRESS);

    await this.repo.update(id, { status: WorkOrderStatus.IN_PROGRESS, startedAt: new Date() });
    await this.repo.createLog({ workOrderId: id, eventType: 'STARTED', notes: 'Work started', recordedBy: userId });
    await this.redis.del(CACHE_KEYS.WORK_ORDER(id));
    await this.publisher.publishWorkOrderStarted({ workOrderId: id, orderNumber: order.orderNumber });
    return this.repo.findById(id);
  }

  async complete(id: string, userId: string) {
    const order = await this.findById(id);
    this.assertTransition(order.status, WorkOrderStatus.COMPLETED);

    const pendingTasks = (order.tasks || []).filter((t) => t.status !== TaskStatus.COMPLETED && t.status !== TaskStatus.SKIPPED);
    if (pendingTasks.length) {
      throw new BusinessRuleViolationException('All tasks must be completed or skipped before closing work order');
    }

    await this.repo.update(id, { status: WorkOrderStatus.COMPLETED, completedAt: new Date() });
    await this.repo.createLog({ workOrderId: id, eventType: 'COMPLETED', notes: 'Work order completed', recordedBy: userId });
    await this.redis.del(CACHE_KEYS.WORK_ORDER(id));
    await this.publisher.publishWorkOrderCompleted({ workOrderId: id, orderNumber: order.orderNumber });

    if (order.requestId) await this.requestService.complete(order.requestId);
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string) {
    const order = await this.findById(id);
    this.assertTransition(order.status, WorkOrderStatus.CANCELLED);
    await this.repo.update(id, { status: WorkOrderStatus.CANCELLED });
    await this.repo.createLog({ workOrderId: id, eventType: 'CANCELLED', notes: 'Work order cancelled', recordedBy: userId });
    await this.redis.del(CACHE_KEYS.WORK_ORDER(id));
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: WorkOrderStatus; assignedTo?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.assignedTo);
  }

  findLogs(workOrderId: string) {
    return this.repo.findLogs(workOrderId);
  }

  async findById(id: string) {
    const order = await this.repo.findById(id);
    if (!order) throw new ResourceNotFoundException('WorkOrder', id);
    return order;
  }

  private assertTransition(from: WorkOrderStatus, to: WorkOrderStatus) {
    const allowed = WORK_ORDER_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}

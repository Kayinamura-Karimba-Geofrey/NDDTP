import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RequisitionRepository } from './repositories/requisition.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/procurement.exceptions';
import { CreateRequisitionDto, RejectRequisitionDto } from './dto/requisition.dto';
import { RequisitionStatus, ProcurementPriority } from '../../common/enums';
import { REQUISITION_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class RequisitionService {
  private readonly logger = new Logger(RequisitionService.name);

  constructor(
    private readonly repo: RequisitionRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(requestedBy: string, dto: CreateRequisitionDto) {
    if (!dto.items?.length) throw new BusinessRuleViolationException('Requisition must have at least one item');

    const requisitionNumber = `REQ-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const requisition = await this.repo.createWithItems(
      {
        requisitionNumber,
        requestedBy,
        departmentId: dto.departmentId ?? null,
        status: RequisitionStatus.DRAFT,
        priority: dto.priority ?? ProcurementPriority.ROUTINE,
        justification: dto.justification ?? null,
      },
      dto.items.map((i) => ({
        description: i.description,
        quantity: i.quantity,
        unit: i.unit ?? 'EACH',
        estimatedUnitCost: i.estimatedUnitCost ?? null,
        inventoryItemId: i.inventoryItemId ?? null,
      })),
    );

    this.logger.log(`Requisition created: ${requisitionNumber}`);
    return requisition;
  }

  async submit(id: string, userId: string) {
    const req = await this.findById(id);
    if (req.requestedBy !== userId) throw new BusinessRuleViolationException('You can only submit your own requisitions');
    this.assertTransition(req.status, RequisitionStatus.SUBMITTED);

    await this.repo.update(id, { status: RequisitionStatus.SUBMITTED });
    await this.publisher.publishRequisitionSubmitted({ requisitionId: id, requisitionNumber: req.requisitionNumber, requestedBy: userId });
    return this.repo.findById(id);
  }

  async approve(id: string, reviewerId: string) {
    const req = await this.findById(id);
    this.assertTransition(req.status, RequisitionStatus.APPROVED);

    await this.repo.update(id, { status: RequisitionStatus.APPROVED, reviewerId, approvedAt: new Date() });
    await this.publisher.publishRequisitionApproved({ requisitionId: id, requisitionNumber: req.requisitionNumber, reviewerId });
    return this.repo.findById(id);
  }

  async reject(id: string, reviewerId: string, dto: RejectRequisitionDto) {
    const req = await this.findById(id);
    this.assertTransition(req.status, RequisitionStatus.REJECTED);

    await this.repo.update(id, { status: RequisitionStatus.REJECTED, reviewerId, rejectionReason: dto.rejectionReason });
    await this.publisher.publishRequisitionRejected({ requisitionId: id, requisitionNumber: req.requisitionNumber, reason: dto.rejectionReason });
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string) {
    const req = await this.findById(id);
    if (req.requestedBy !== userId) throw new BusinessRuleViolationException('You can only cancel your own requisitions');
    this.assertTransition(req.status, RequisitionStatus.CANCELLED);
    await this.repo.update(id, { status: RequisitionStatus.CANCELLED });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: RequisitionStatus }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, userId);
  }

  async findPending(page = 1, limit = 20) {
    const [data, total] = await this.repo.findPending(page, limit);
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  async findById(id: string) {
    const req = await this.repo.findById(id);
    if (!req) throw new ResourceNotFoundException('PurchaseRequisition', id);
    return req;
  }

  async markOrdered(id: string) {
    const req = await this.findById(id);
    this.assertTransition(req.status, RequisitionStatus.ORDERED);
    await this.repo.update(id, { status: RequisitionStatus.ORDERED });
    return this.repo.findById(id);
  }

  private assertTransition(from: RequisitionStatus, to: RequisitionStatus) {
    const allowed = REQUISITION_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}

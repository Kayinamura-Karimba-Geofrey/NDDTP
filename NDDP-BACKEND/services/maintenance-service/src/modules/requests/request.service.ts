import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RequestRepository } from './repositories/request.repository';
import { CategoryRepository } from '../categories/repositories/category.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  ResourceNotFoundException, InvalidStatusTransitionException,
} from '../../common/exceptions/maintenance.exceptions';
import { CreateRequestDto, RejectRequestDto } from './dto/request.dto';
import { RequestStatus, MaintenancePriority, AssetReferenceType } from '../../common/enums';
import { REQUEST_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class RequestService {
  private readonly logger = new Logger(RequestService.name);

  constructor(
    private readonly repo: RequestRepository,
    private readonly categoryRepo: CategoryRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async submit(requestedBy: string, dto: CreateRequestDto) {
    const category = await this.categoryRepo.findById(dto.categoryId);
    if (!category) throw new ResourceNotFoundException('MaintenanceCategory', dto.categoryId);

    const requestNumber = `MNT-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const request = await this.repo.create({
      requestNumber,
      categoryId: dto.categoryId,
      assetType: dto.assetType,
      assetId: dto.assetId,
      requestedBy,
      status: RequestStatus.SUBMITTED,
      priority: dto.priority ?? MaintenancePriority.ROUTINE,
      description: dto.description,
    });

    await this.publisher.publishRequestSubmitted({
      requestId: request.id, requestNumber, assetType: dto.assetType, assetId: dto.assetId, requestedBy,
    });
    this.logger.log(`Request submitted: ${requestNumber}`);
    return this.repo.findById(request.id);
  }

  async approve(id: string, reviewerId: string) {
    const req = await this.findById(id);
    this.assertTransition(req.status, RequestStatus.APPROVED);
    await this.repo.update(id, { status: RequestStatus.APPROVED, reviewerId });
    await this.publisher.publishRequestApproved({ requestId: id, requestNumber: req.requestNumber, reviewerId });
    return this.repo.findById(id);
  }

  async reject(id: string, reviewerId: string, dto: RejectRequestDto) {
    const req = await this.findById(id);
    this.assertTransition(req.status, RequestStatus.REJECTED);
    await this.repo.update(id, { status: RequestStatus.REJECTED, reviewerId, rejectionReason: dto.rejectionReason });
    await this.publisher.publishRequestRejected({ requestId: id, requestNumber: req.requestNumber, reason: dto.rejectionReason });
    return this.repo.findById(id);
  }

  async cancel(id: string) {
    const req = await this.findById(id);
    this.assertTransition(req.status, RequestStatus.CANCELLED);
    await this.repo.update(id, { status: RequestStatus.CANCELLED });
    return this.repo.findById(id);
  }

  async markInProgress(id: string) {
    const req = await this.findById(id);
    this.assertTransition(req.status, RequestStatus.IN_PROGRESS);
    await this.repo.update(id, { status: RequestStatus.IN_PROGRESS });
    return this.repo.findById(id);
  }

  async complete(id: string) {
    const req = await this.findById(id);
    this.assertTransition(req.status, RequestStatus.COMPLETED);
    await this.repo.update(id, { status: RequestStatus.COMPLETED });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: RequestStatus; assetType?: AssetReferenceType }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.assetType);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, undefined, userId);
  }

  async findPending(page = 1, limit = 20) {
    const [data, total] = await this.repo.findPending(page, limit);
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  async findById(id: string) {
    const req = await this.repo.findById(id);
    if (!req) throw new ResourceNotFoundException('MaintenanceRequest', id);
    return req;
  }

  private assertTransition(from: RequestStatus, to: RequestStatus) {
    const allowed = REQUEST_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RequestRepository } from './repositories/request.repository';
import { WarehouseRepository } from '../warehouses/repositories/warehouse.repository';
import { ItemRepository } from '../items/repositories/item.repository';
import { StockService } from '../stock/stock.service';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/inventory.exceptions';
import { CreateRequestDto, ApproveRequestDto, RejectRequestDto } from './dto/request.dto';
import { RequestStatus } from '../../common/enums';
import { REQUEST_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class RequestService {
  private readonly logger = new Logger(RequestService.name);

  constructor(
    private readonly repo: RequestRepository,
    private readonly warehouseRepo: WarehouseRepository,
    private readonly itemRepo: ItemRepository,
    private readonly stockService: StockService,
    private readonly publisher: EventPublisherService,
  ) {}

  async submit(requestedBy: string, dto: CreateRequestDto) {
    const warehouse = await this.warehouseRepo.findById(dto.warehouseId);
    if (!warehouse) throw new ResourceNotFoundException('Warehouse', dto.warehouseId);
    const item = await this.itemRepo.findById(dto.itemId);
    if (!item) throw new ResourceNotFoundException('InventoryItem', dto.itemId);

    const requestNumber = `REQ-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const request = await this.repo.create({
      requestNumber,
      warehouseId: dto.warehouseId,
      itemId: dto.itemId,
      requestedBy,
      requestedQuantity: dto.requestedQuantity,
      justification: dto.justification ?? null,
      status: RequestStatus.PENDING,
    });

    await this.publisher.publishRequestSubmitted({
      requestId: request.id, requestNumber, requestedBy, warehouseId: dto.warehouseId, itemId: dto.itemId,
    });

    this.logger.log(`Request ${requestNumber} submitted`);
    return this.repo.findById(request.id);
  }

  async approve(id: string, reviewerId: string, dto: ApproveRequestDto) {
    const request = await this.findById(id);
    this.assertTransition(request.status, RequestStatus.APPROVED);
    if (dto.approvedQuantity > request.requestedQuantity) {
      throw new BusinessRuleViolationException('Approved quantity cannot exceed requested quantity');
    }

    await this.repo.update(id, { status: RequestStatus.APPROVED, approvedQuantity: dto.approvedQuantity, reviewerId });
    await this.publisher.publishRequestApproved({
      requestId: id, requestNumber: request.requestNumber, approvedQuantity: dto.approvedQuantity, reviewerId,
    });
    return this.repo.findById(id);
  }

  async reject(id: string, reviewerId: string, dto: RejectRequestDto) {
    const request = await this.findById(id);
    this.assertTransition(request.status, RequestStatus.REJECTED);

    await this.repo.update(id, { status: RequestStatus.REJECTED, rejectionReason: dto.rejectionReason, reviewerId });
    return this.repo.findById(id);
  }

  async fulfill(id: string, fulfilledBy: string) {
    const request = await this.findById(id);
    this.assertTransition(request.status, RequestStatus.FULFILLED);
    const qty = request.approvedQuantity ?? request.requestedQuantity;

    await this.stockService.issue(fulfilledBy, {
      warehouseId: request.warehouseId,
      itemId: request.itemId,
      quantity: qty,
      notes: `Fulfilled request ${request.requestNumber}`,
    });

    await this.repo.update(id, { status: RequestStatus.FULFILLED, fulfilledAt: new Date() });
    await this.publisher.publishRequestFulfilled({
      requestId: id, requestNumber: request.requestNumber, quantity: qty, fulfilledBy,
    });
    return this.repo.findById(id);
  }

  async cancel(id: string, userId: string) {
    const request = await this.findById(id);
    if (request.requestedBy !== userId) {
      throw new BusinessRuleViolationException('You can only cancel your own requests');
    }
    this.assertTransition(request.status, RequestStatus.CANCELLED);
    await this.repo.update(id, { status: RequestStatus.CANCELLED });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: RequestStatus; requestedBy?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.requestedBy);
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
    const request = await this.repo.findById(id);
    if (!request) throw new ResourceNotFoundException('StockRequest', id);
    return request;
  }

  private assertTransition(from: RequestStatus, to: RequestStatus) {
    const allowed = REQUEST_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}

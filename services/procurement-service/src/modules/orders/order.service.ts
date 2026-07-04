import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OrderRepository } from './repositories/order.repository';
import { VendorRepository } from '../vendors/repositories/vendor.repository';
import { RequisitionRepository } from '../requisitions/repositories/requisition.repository';
import { RequisitionService } from '../requisitions/requisition.service';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/procurement.exceptions';
import { CreateOrderDto } from './dto/order.dto';
import { OrderStatus, RequisitionStatus } from '../../common/enums';
import { ORDER_STATUS_TRANSITIONS, CACHE_KEYS } from '../../common/constants';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly repo: OrderRepository,
    private readonly vendorRepo: VendorRepository,
    private readonly requisitionRepo: RequisitionRepository,
    private readonly requisitionService: RequisitionService,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(createdBy: string, dto: CreateOrderDto) {
    if (!dto.items?.length) throw new BusinessRuleViolationException('Order must have at least one item');

    const vendor = await this.vendorRepo.findById(dto.vendorId);
    if (!vendor) throw new ResourceNotFoundException('Vendor', dto.vendorId);

    if (dto.requisitionId) {
      const req = await this.requisitionRepo.findById(dto.requisitionId);
      if (!req) throw new ResourceNotFoundException('PurchaseRequisition', dto.requisitionId);
      if (req.status !== RequisitionStatus.APPROVED) {
        throw new BusinessRuleViolationException('Requisition must be APPROVED before creating order');
      }
    }

    const orderNumber = `PO-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const totalAmount = dto.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);

    const order = await this.repo.createWithItems(
      {
        orderNumber,
        vendorId: dto.vendorId,
        requisitionId: dto.requisitionId ?? null,
        status: OrderStatus.DRAFT,
        totalAmount,
        createdBy,
        expectedDelivery: dto.expectedDelivery ? new Date(dto.expectedDelivery) : null,
        notes: dto.notes ?? null,
      },
      dto.items.map((i) => ({
        description: i.description,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        unit: i.unit ?? 'EACH',
        inventoryItemId: i.inventoryItemId ?? null,
        receivedQuantity: 0,
      })),
    );

    if (dto.requisitionId) {
      await this.requisitionService.markOrdered(dto.requisitionId);
    }

    await this.publisher.publishOrderCreated({ orderId: order!.id, orderNumber, vendorId: dto.vendorId, totalAmount });
    this.logger.log(`Order created: ${orderNumber}`);
    return order;
  }

  async issue(id: string) {
    const order = await this.findById(id);
    this.assertTransition(order.status, OrderStatus.ISSUED);

    await this.repo.update(id, { status: OrderStatus.ISSUED, issuedAt: new Date() });
    await this.redis.del(CACHE_KEYS.ORDER(id));
    await this.publisher.publishOrderIssued({ orderId: id, orderNumber: order.orderNumber, vendorId: order.vendorId });
    return this.repo.findById(id);
  }

  async cancel(id: string) {
    const order = await this.findById(id);
    this.assertTransition(order.status, OrderStatus.CANCELLED);
    await this.repo.update(id, { status: OrderStatus.CANCELLED });
    await this.redis.del(CACHE_KEYS.ORDER(id));
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: OrderStatus; vendorId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.vendorId);
  }

  async findById(id: string) {
    const order = await this.repo.findById(id);
    if (!order) throw new ResourceNotFoundException('PurchaseOrder', id);
    return order;
  }

  async updateOrderStatusFromReceipt(orderId: string) {
    const order = await this.findById(orderId);
    const items = order.items || [];
    const allReceived = items.every((i) => i.receivedQuantity >= i.quantity);
    const anyReceived = items.some((i) => i.receivedQuantity > 0);

    let newStatus: OrderStatus | null = null;
    if (allReceived) newStatus = OrderStatus.RECEIVED;
    else if (anyReceived) newStatus = OrderStatus.PARTIALLY_RECEIVED;

    if (newStatus && newStatus !== order.status) {
      this.assertTransition(order.status, newStatus);
      await this.repo.update(orderId, { status: newStatus });
    }
  }

  private assertTransition(from: OrderStatus, to: OrderStatus) {
    const allowed = ORDER_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}

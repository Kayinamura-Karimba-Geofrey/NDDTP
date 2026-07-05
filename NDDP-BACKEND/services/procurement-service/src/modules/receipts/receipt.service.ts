import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ReceiptRepository } from './repositories/receipt.repository';
import { OrderRepository } from '../orders/repositories/order.repository';
import { OrderService } from '../orders/order.service';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/procurement.exceptions';
import { RecordReceiptDto } from './dto/receipt.dto';
import { OrderStatus } from '../../common/enums';

@Injectable()
export class ReceiptService {
  private readonly logger = new Logger(ReceiptService.name);

  constructor(
    private readonly repo: ReceiptRepository,
    private readonly orderRepo: OrderRepository,
    private readonly orderService: OrderService,
    private readonly publisher: EventPublisherService,
  ) {}

  async record(receivedBy: string, dto: RecordReceiptDto) {
    const order = await this.orderRepo.findById(dto.orderId);
    if (!order) throw new ResourceNotFoundException('PurchaseOrder', dto.orderId);
    if (![OrderStatus.ISSUED, OrderStatus.PARTIALLY_RECEIVED].includes(order.status)) {
      throw new BusinessRuleViolationException('Order must be ISSUED or PARTIALLY_RECEIVED to record receipt');
    }

    const orderItem = await this.orderRepo.findItemById(dto.orderItemId);
    if (!orderItem || orderItem.orderId !== dto.orderId) {
      throw new ResourceNotFoundException('PurchaseOrderItem', dto.orderItemId);
    }

    const remaining = orderItem.quantity - orderItem.receivedQuantity;
    if (dto.quantity > remaining) {
      throw new BusinessRuleViolationException(`Cannot receive ${dto.quantity}; only ${remaining} remaining`);
    }

    const receiptNumber = `GRN-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const receipt = await this.repo.create({
      receiptNumber,
      orderId: dto.orderId,
      orderItemId: dto.orderItemId,
      quantity: dto.quantity,
      receivedBy,
      warehouseId: dto.warehouseId ?? null,
      notes: dto.notes ?? null,
    });

    await this.orderRepo.updateItem(dto.orderItemId, { receivedQuantity: orderItem.receivedQuantity + dto.quantity });
    await this.orderService.updateOrderStatusFromReceipt(dto.orderId);

    await this.publisher.publishReceiptRecorded({
      receiptId: receipt.id, receiptNumber, orderId: dto.orderId, orderItemId: dto.orderItemId, quantity: dto.quantity,
    });
    this.logger.log(`Receipt recorded: ${receiptNumber}`);
    return this.repo.findById(receipt.id);
  }

  findByOrder(orderId: string) {
    return this.repo.findByOrder(orderId);
  }

  async findById(id: string) {
    const receipt = await this.repo.findById(id);
    if (!receipt) throw new ResourceNotFoundException('GoodsReceipt', id);
    return receipt;
  }
}

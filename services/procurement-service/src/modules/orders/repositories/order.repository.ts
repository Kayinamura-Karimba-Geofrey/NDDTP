import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrder } from '../../../database/entities/purchase-order.entity';
import { PurchaseOrderItem } from '../../../database/entities/purchase-order-item.entity';
import { OrderStatus } from '../../../common/enums';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(PurchaseOrder) private readonly orderRepo: Repository<PurchaseOrder>,
    @InjectRepository(PurchaseOrderItem) private readonly itemRepo: Repository<PurchaseOrderItem>,
  ) {}

  async createWithItems(order: Partial<PurchaseOrder>, items: Partial<PurchaseOrderItem>[]) {
    const saved = await this.orderRepo.save(this.orderRepo.create(order));
    if (items.length) {
      await this.itemRepo.save(items.map((i) => this.itemRepo.create({ ...i, orderId: saved.id })));
    }
    return this.findById(saved.id);
  }

  update(id: string, data: Partial<PurchaseOrder>) {
    return this.orderRepo.update(id, data as Record<string, unknown>);
  }

  findById(id: string) {
    return this.orderRepo.findOne({
      where: { id },
      relations: ['vendor', 'requisition', 'items'],
    });
  }

  findItemById(id: string) {
    return this.itemRepo.findOne({ where: { id } });
  }

  updateItem(id: string, data: Partial<PurchaseOrderItem>) {
    return this.itemRepo.update(id, data as Record<string, unknown>);
  }

  async findAll(page: number, limit: number, status?: OrderStatus, vendorId?: string) {
    const qb = this.orderRepo.createQueryBuilder('o')
      .leftJoinAndSelect('o.vendor', 'vendor')
      .leftJoinAndSelect('o.items', 'items');
    if (status) qb.andWhere('o.status = :status', { status });
    if (vendorId) qb.andWhere('o.vendorId = :vendorId', { vendorId });
    const [data, total] = await qb.orderBy('o.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

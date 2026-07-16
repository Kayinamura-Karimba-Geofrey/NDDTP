import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodsReceipt } from '../../../database/entities/goods-receipt.entity';

@Injectable()
export class ReceiptRepository {
  constructor(@InjectRepository(GoodsReceipt) private readonly repo: Repository<GoodsReceipt>) {}

  create(data: Partial<GoodsReceipt>) { return this.repo.save(this.repo.create(data)); }

  findByOrder(orderId: string) {
    return this.repo.find({ where: { orderId }, order: { receivedAt: 'DESC' } });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['order'] });
  }
}

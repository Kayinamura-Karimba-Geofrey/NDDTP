import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from '../../../database/entities/inventory-item.entity';
import { ItemCategory } from '../../../common/enums';

@Injectable()
export class ItemRepository {
  constructor(@InjectRepository(InventoryItem) private readonly repo: Repository<InventoryItem>) {}

  create(data: Partial<InventoryItem>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findBySku(sku: string) { return this.repo.findOne({ where: { sku } }); }

  async findAll(page: number, limit: number, category?: ItemCategory) {
    const qb = this.repo.createQueryBuilder('i').where('i.isActive = true');
    if (category) qb.andWhere('i.category = :category', { category });
    const [data, total] = await qb.orderBy('i.name', 'ASC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  findLowStock() {
    return this.repo.createQueryBuilder('i')
      .innerJoin('stock_levels', 'sl', 'sl.item_id = i.id')
      .where('sl.quantity <= i.reorder_level')
      .andWhere('i.reorder_level > 0')
      .getMany();
  }
}

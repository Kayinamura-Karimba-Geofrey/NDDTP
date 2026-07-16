import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockLevel } from '../../../database/entities/stock-level.entity';
import { StockMovement } from '../../../database/entities/stock-movement.entity';

@Injectable()
export class StockRepository {
  constructor(
    @InjectRepository(StockLevel) private readonly levelRepo: Repository<StockLevel>,
    @InjectRepository(StockMovement) private readonly movementRepo: Repository<StockMovement>,
  ) {}

  findLevel(warehouseId: string, itemId: string) {
    return this.levelRepo.findOne({ where: { warehouseId, itemId }, relations: ['item', 'warehouse'] });
  }

  async findByWarehouse(warehouseId: string) {
    return this.levelRepo.find({ where: { warehouseId }, relations: ['item'], order: { updatedAt: 'DESC' } });
  }

  async upsertLevel(warehouseId: string, itemId: string, delta: number): Promise<StockLevel> {
    let level = await this.levelRepo.findOne({ where: { warehouseId, itemId } });
    if (!level) {
      level = await this.levelRepo.save(this.levelRepo.create({ warehouseId, itemId, quantity: 0, reservedQuantity: 0 }));
    }
    level.quantity += delta;
    return this.levelRepo.save(level);
  }

  setLevel(warehouseId: string, itemId: string, quantity: number): Promise<StockLevel> {
    return this.levelRepo.save(
      this.levelRepo.create({ warehouseId, itemId, quantity, reservedQuantity: 0 }),
    ).then(async (created) => {
      const existing = await this.levelRepo.findOne({ where: { warehouseId, itemId } });
      if (existing && existing.id !== created.id) {
        existing.quantity = quantity;
        return this.levelRepo.save(existing);
      }
      return created;
    });
  }

  createMovement(data: Partial<StockMovement>) {
    return this.movementRepo.save(this.movementRepo.create(data));
  }

  findMovements(warehouseId?: string, itemId?: string) {
    const qb = this.movementRepo.createQueryBuilder('m').orderBy('m.createdAt', 'DESC');
    if (warehouseId) qb.andWhere('m.warehouseId = :warehouseId', { warehouseId });
    if (itemId) qb.andWhere('m.itemId = :itemId', { itemId });
    return qb.take(100).getMany();
  }
}

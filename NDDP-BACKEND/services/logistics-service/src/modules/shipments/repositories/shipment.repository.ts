import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from '../../../database/entities/shipment.entity';
import { ShipmentItem } from '../../../database/entities/shipment-item.entity';
import { ShipmentStatus } from '../../../common/enums';

@Injectable()
export class ShipmentRepository {
  constructor(
    @InjectRepository(Shipment) private readonly shipmentRepo: Repository<Shipment>,
    @InjectRepository(ShipmentItem) private readonly itemRepo: Repository<ShipmentItem>,
  ) {}

  async createWithItems(shipment: Partial<Shipment>, items: Partial<ShipmentItem>[]) {
    const saved = await this.shipmentRepo.save(this.shipmentRepo.create(shipment));
    if (items.length) {
      await this.itemRepo.save(items.map((i) => this.itemRepo.create({ ...i, shipmentId: saved.id })));
    }
    return this.findById(saved.id);
  }

  update(id: string, data: Partial<Shipment>) {
    return this.shipmentRepo.update(id, data as Record<string, unknown>);
  }

  findById(id: string) {
    return this.shipmentRepo.findOne({
      where: { id },
      relations: ['originLocation', 'destinationLocation', 'route', 'items'],
    });
  }

  async findAll(page: number, limit: number, status?: ShipmentStatus, originLocationId?: string, destinationLocationId?: string) {
    const qb = this.shipmentRepo.createQueryBuilder('s')
      .leftJoinAndSelect('s.originLocation', 'origin')
      .leftJoinAndSelect('s.destinationLocation', 'destination')
      .leftJoinAndSelect('s.items', 'items');
    if (status) qb.andWhere('s.status = :status', { status });
    if (originLocationId) qb.andWhere('s.originLocationId = :originLocationId', { originLocationId });
    if (destinationLocationId) qb.andWhere('s.destinationLocationId = :destinationLocationId', { destinationLocationId });
    const [data, total] = await qb.orderBy('s.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShipmentTracking } from '../../../database/entities/shipment-tracking.entity';

@Injectable()
export class TrackingRepository {
  constructor(@InjectRepository(ShipmentTracking) private readonly repo: Repository<ShipmentTracking>) {}

  create(data: Partial<ShipmentTracking>) { return this.repo.save(this.repo.create(data)); }

  findByShipment(shipmentId: string) {
    return this.repo.find({ where: { shipmentId }, order: { recordedAt: 'ASC' } });
  }
}

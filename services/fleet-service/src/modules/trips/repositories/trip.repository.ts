import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripLog } from '../../../database/entities/trip-log.entity';

@Injectable()
export class TripRepository {
  constructor(@InjectRepository(TripLog) private readonly repo: Repository<TripLog>) {}

  create(data: Partial<TripLog>) { return this.repo.save(this.repo.create(data)); }

  findByVehicle(vehicleId: string) {
    return this.repo.find({ where: { vehicleId }, order: { loggedAt: 'DESC' }, take: 100 });
  }

  findByDriver(driverId: string) {
    return this.repo.find({ where: { driverId }, order: { loggedAt: 'DESC' }, take: 100 });
  }
}

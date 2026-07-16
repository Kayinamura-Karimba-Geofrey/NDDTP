import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleInspection } from '../../../database/entities/vehicle-inspection.entity';
import { InspectionStatus } from '../../../common/enums';

@Injectable()
export class InspectionRepository {
  constructor(@InjectRepository(VehicleInspection) private readonly repo: Repository<VehicleInspection>) {}

  create(data: Partial<VehicleInspection>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<VehicleInspection>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['vehicle'] });
  }

  findByVehicle(vehicleId: string) {
    return this.repo.find({ where: { vehicleId }, order: { scheduledDate: 'DESC' } });
  }

  findScheduled(page: number, limit: number) {
    return this.repo.findAndCount({
      where: { status: InspectionStatus.SCHEDULED },
      relations: ['vehicle'],
      order: { scheduledDate: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}

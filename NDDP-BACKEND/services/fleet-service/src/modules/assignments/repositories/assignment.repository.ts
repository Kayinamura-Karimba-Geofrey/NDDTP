import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleAssignment } from '../../../database/entities/vehicle-assignment.entity';
import { AssignmentStatus } from '../../../common/enums';

@Injectable()
export class AssignmentRepository {
  constructor(@InjectRepository(VehicleAssignment) private readonly repo: Repository<VehicleAssignment>) {}

  create(data: Partial<VehicleAssignment>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<VehicleAssignment>) { return this.repo.update(id, data as Record<string, unknown>); }

  findActiveByVehicle(vehicleId: string) {
    return this.repo.findOne({ where: { vehicleId, status: AssignmentStatus.ACTIVE } });
  }

  findByVehicle(vehicleId: string) {
    return this.repo.find({ where: { vehicleId }, order: { assignedAt: 'DESC' } });
  }

  findByDriver(driverId: string) {
    return this.repo.find({ where: { driverId }, relations: ['vehicle'], order: { assignedAt: 'DESC' } });
  }
}

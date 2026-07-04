import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleType } from '../../../database/entities/vehicle-type.entity';

@Injectable()
export class VehicleTypeRepository {
  constructor(@InjectRepository(VehicleType) private readonly repo: Repository<VehicleType>) {}

  create(data: Partial<VehicleType>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { isActive: true }, order: { name: 'ASC' } }); }
}

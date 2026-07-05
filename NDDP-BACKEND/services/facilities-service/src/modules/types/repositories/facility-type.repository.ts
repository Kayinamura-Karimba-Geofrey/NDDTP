import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacilityType } from '../../../database/entities/facility-type.entity';

@Injectable()
export class FacilityTypeRepository {
  constructor(@InjectRepository(FacilityType) private readonly repo: Repository<FacilityType>) {}

  create(data: Partial<FacilityType>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { isActive: true }, order: { name: 'ASC' } }); }
}

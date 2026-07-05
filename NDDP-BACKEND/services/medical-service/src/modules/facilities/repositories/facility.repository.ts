import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalFacility } from '../../../database/entities/medical-facility.entity';
import { FacilityStatus } from '../../../common/enums';

@Injectable()
export class FacilityRepository {
  constructor(@InjectRepository(MedicalFacility) private readonly repo: Repository<MedicalFacility>) {}

  create(data: Partial<MedicalFacility>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<MedicalFacility>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }

  findActive() {
    return this.repo.find({ where: { status: FacilityStatus.ACTIVE }, order: { name: 'ASC' } });
  }

  async findAll(page: number, limit: number) {
    const [data, total] = await this.repo.findAndCount({ order: { name: 'ASC' }, skip: (page - 1) * limit, take: limit });
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

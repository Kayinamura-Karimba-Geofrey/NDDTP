import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facility } from '../../../database/entities/facility.entity';
import { FacilityStatus } from '../../../common/enums';

@Injectable()
export class FacilityRepository {
  constructor(@InjectRepository(Facility) private readonly repo: Repository<Facility>) {}

  create(data: Partial<Facility>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['type', 'spaces'] }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }

  findActive() {
    return this.repo.find({ where: { status: FacilityStatus.ACTIVE }, relations: ['type'], order: { name: 'ASC' } });
  }

  async findAll(page: number, limit: number, status?: FacilityStatus, typeId?: string) {
    const qb = this.repo.createQueryBuilder('f').leftJoinAndSelect('f.type', 'type');
    if (status) qb.andWhere('f.status = :status', { status });
    if (typeId) qb.andWhere('f.typeId = :typeId', { typeId });
    const [data, total] = await qb.orderBy('f.name', 'ASC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

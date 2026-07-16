import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacilitySpace } from '../../../database/entities/facility-space.entity';
import { SpaceStatus } from '../../../common/enums';

@Injectable()
export class FacilitySpaceRepository {
  constructor(@InjectRepository(FacilitySpace) private readonly repo: Repository<FacilitySpace>) {}

  create(data: Partial<FacilitySpace>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['facility', 'facility.type'] }); }

  findByFacilityAndCode(facilityId: string, code: string) {
    return this.repo.findOne({ where: { facilityId, code } });
  }

  findAvailable(facilityId?: string) {
    const qb = this.repo.createQueryBuilder('s').leftJoinAndSelect('s.facility', 'facility')
      .where('s.status = :status', { status: SpaceStatus.AVAILABLE });
    if (facilityId) qb.andWhere('s.facilityId = :facilityId', { facilityId });
    return qb.orderBy('s.name', 'ASC').getMany();
  }

  async findAll(page: number, limit: number, facilityId?: string, status?: SpaceStatus) {
    const qb = this.repo.createQueryBuilder('s').leftJoinAndSelect('s.facility', 'facility');
    if (facilityId) qb.andWhere('s.facilityId = :facilityId', { facilityId });
    if (status) qb.andWhere('s.status = :status', { status });
    const [data, total] = await qb.orderBy('s.name', 'ASC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

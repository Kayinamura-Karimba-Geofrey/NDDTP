import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformanceCycle } from '../../../database/entities/performance-cycle.entity';
import { CycleStatus } from '../../../common/enums';

@Injectable()
export class CycleRepository {
  constructor(@InjectRepository(PerformanceCycle) private readonly repo: Repository<PerformanceCycle>) {}

  create(data: Partial<PerformanceCycle>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<PerformanceCycle>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }

  findActive() {
    return this.repo.findOne({ where: { status: CycleStatus.ACTIVE }, order: { startDate: 'DESC' } });
  }

  async findAll(page: number, limit: number) {
    const [data, total] = await this.repo.findAndCount({ order: { startDate: 'DESC' }, skip: (page - 1) * limit, take: limit });
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

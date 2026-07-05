import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalyticsQuery } from '../../../database/entities/analytics-query.entity';
import { QueryStatus } from '../../../common/enums';
import { PaginatedResult } from '@nddtp/platform-core';

@Injectable()
export class AnalyticsQueryRepository {
  constructor(@InjectRepository(AnalyticsQuery) private readonly repo: Repository<AnalyticsQuery>) {}

  create(data: Partial<AnalyticsQuery>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  update(id: string, data: Partial<AnalyticsQuery>) { return this.repo.update(id, data as Record<string, unknown>); }

  async findAll(page: number, limit: number, status?: QueryStatus, requestedBy?: string): Promise<PaginatedResult<AnalyticsQuery>> {
    const qb = this.repo.createQueryBuilder('q').orderBy('q.createdAt', 'DESC');
    if (status) qb.andWhere('q.status = :status', { status });
    if (requestedBy) qb.andWhere('q.requestedBy = :requestedBy', { requestedBy });
    const total = await qb.getCount();
    const data = await qb.skip((page - 1) * limit).take(limit).getMany();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

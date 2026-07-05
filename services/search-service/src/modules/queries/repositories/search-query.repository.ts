import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchQuery } from '../../../database/entities/search-query.entity';
import { QueryStatus } from '../../../common/enums';
import { PaginatedResult } from '../../../common/interfaces';

@Injectable()
export class SearchQueryRepository {
  constructor(@InjectRepository(SearchQuery) private readonly repo: Repository<SearchQuery>) {}

  create(data: Partial<SearchQuery>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  update(id: string, data: Partial<SearchQuery>) { return this.repo.update(id, data as Record<string, unknown>); }

  async findAll(page: number, limit: number, requestedBy?: string, status?: QueryStatus): Promise<PaginatedResult<SearchQuery>> {
    const qb = this.repo.createQueryBuilder('q').orderBy('q.createdAt', 'DESC');
    if (requestedBy) qb.andWhere('q.requestedBy = :requestedBy', { requestedBy });
    if (status) qb.andWhere('q.status = :status', { status });
    const [data, total] = await qb.skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

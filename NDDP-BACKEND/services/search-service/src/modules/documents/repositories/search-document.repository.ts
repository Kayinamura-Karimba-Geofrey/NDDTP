import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchDocument } from '../../../database/entities/search-document.entity';
import { DocumentStatus } from '../../../common/enums';
import { PaginatedResult } from '@nddtp/platform-core';

@Injectable()
export class SearchDocumentRepository {
  constructor(@InjectRepository(SearchDocument) private readonly repo: Repository<SearchDocument>) {}

  create(data: Partial<SearchDocument>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['index'] }); }
  findByIndexAndExternalId(indexId: string, externalId: string) {
    return this.repo.findOne({ where: { indexId, externalId } });
  }
  update(id: string, data: Partial<SearchDocument>) { return this.repo.update(id, data as Record<string, unknown>); }

  async findByIndex(indexId: string, page: number, limit: number): Promise<PaginatedResult<SearchDocument>> {
    const [data, total] = await this.repo.findAndCount({
      where: { indexId, status: DocumentStatus.INDEXED },
      order: { indexedAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  async search(indexId: string | null, query: string, limit: number) {
    const qb = this.repo.createQueryBuilder('d')
      .where('d.status = :status', { status: DocumentStatus.INDEXED })
      .andWhere('(d.title ILIKE :q OR d.content ILIKE :q)', { q: `%${query}%` });
    if (indexId) qb.andWhere('d.indexId = :indexId', { indexId });
    return qb.orderBy('d.indexedAt', 'DESC').take(limit).getMany();
  }
}

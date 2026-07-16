import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportRequest } from '../../../database/entities/report-request.entity';
import { RequestStatus } from '../../../common/enums';

@Injectable()
export class ReportRequestRepository {
  constructor(@InjectRepository(ReportRequest) private readonly repo: Repository<ReportRequest>) {}

  create(data: Partial<ReportRequest>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<ReportRequest>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['definition', 'schedule'] });
  }

  async findAll(page: number, limit: number, status?: RequestStatus, definitionId?: string, requestedBy?: string) {
    const qb = this.repo.createQueryBuilder('r')
      .leftJoinAndSelect('r.definition', 'definition')
      .leftJoinAndSelect('r.schedule', 'schedule');
    if (status) qb.andWhere('r.status = :status', { status });
    if (definitionId) qb.andWhere('r.definitionId = :definitionId', { definitionId });
    if (requestedBy) qb.andWhere('r.requestedBy = :requestedBy', { requestedBy });
    const [data, total] = await qb.orderBy('r.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

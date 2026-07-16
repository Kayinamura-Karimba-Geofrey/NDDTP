import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BiReportExecution } from '../../../database/entities/bi-report-execution.entity';
import { ExecutionStatus } from '../../../common/enums';
import { PaginatedResult } from '@nddtp/platform-core';

@Injectable()
export class BiReportExecutionRepository {
  constructor(@InjectRepository(BiReportExecution) private readonly repo: Repository<BiReportExecution>) {}

  create(data: Partial<BiReportExecution>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['report', 'report.model'] }); }
  update(id: string, data: Partial<BiReportExecution>) { return this.repo.update(id, data as Record<string, unknown>); }

  async findAll(page: number, limit: number, status?: ExecutionStatus, reportId?: string, requestedBy?: string): Promise<PaginatedResult<BiReportExecution>> {
    const qb = this.repo.createQueryBuilder('e')
      .leftJoinAndSelect('e.report', 'report')
      .leftJoinAndSelect('report.model', 'model');
    if (status) qb.andWhere('e.status = :status', { status });
    if (reportId) qb.andWhere('e.reportId = :reportId', { reportId });
    if (requestedBy) qb.andWhere('e.requestedBy = :requestedBy', { requestedBy });
    const [data, total] = await qb.orderBy('e.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

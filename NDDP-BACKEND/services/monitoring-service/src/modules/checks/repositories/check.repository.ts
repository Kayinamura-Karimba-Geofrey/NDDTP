import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonitoringCheck } from '../../../database/entities/monitoring-check.entity';
import { CheckStatus } from '../../../common/enums';

@Injectable()
export class CheckRepository {
  constructor(@InjectRepository(MonitoringCheck) private readonly repo: Repository<MonitoringCheck>) {}

  create(data: Partial<MonitoringCheck>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<MonitoringCheck>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['target'] });
  }

  async findAll(page: number, limit: number, status?: CheckStatus, targetId?: string, initiatedBy?: string) {
    const qb = this.repo.createQueryBuilder('c').leftJoinAndSelect('c.target', 'target');
    if (status) qb.andWhere('c.status = :status', { status });
    if (targetId) qb.andWhere('c.targetId = :targetId', { targetId });
    if (initiatedBy) qb.andWhere('c.initiatedBy = :initiatedBy', { initiatedBy });
    const [data, total] = await qb.orderBy('c.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

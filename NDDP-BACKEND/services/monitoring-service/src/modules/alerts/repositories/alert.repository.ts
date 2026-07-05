import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonitoringAlert } from '../../../database/entities/monitoring-alert.entity';
import { AlertSeverity, AlertStatus } from '../../../common/enums';

@Injectable()
export class AlertRepository {
  constructor(@InjectRepository(MonitoringAlert) private readonly repo: Repository<MonitoringAlert>) {}

  create(data: Partial<MonitoringAlert>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<MonitoringAlert>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['check', 'check.target'] });
  }

  async findAll(page: number, limit: number, status?: AlertStatus, severity?: AlertSeverity) {
    const qb = this.repo.createQueryBuilder('a')
      .leftJoinAndSelect('a.check', 'check')
      .leftJoinAndSelect('check.target', 'target');
    if (status) qb.andWhere('a.status = :status', { status });
    if (severity) qb.andWhere('a.severity = :severity', { severity });
    const [data, total] = await qb.orderBy('a.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

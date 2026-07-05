import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackupRestore } from '../../../database/entities/backup-restore.entity';
import { RestoreStatus } from '../../../common/enums';

@Injectable()
export class RestoreRepository {
  constructor(@InjectRepository(BackupRestore) private readonly repo: Repository<BackupRestore>) {}

  create(data: Partial<BackupRestore>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<BackupRestore>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['job', 'job.policy'] });
  }

  async findAll(page: number, limit: number, status?: RestoreStatus, jobId?: string, requestedBy?: string) {
    const qb = this.repo.createQueryBuilder('r')
      .leftJoinAndSelect('r.job', 'job')
      .leftJoinAndSelect('job.policy', 'policy');
    if (status) qb.andWhere('r.status = :status', { status });
    if (jobId) qb.andWhere('r.jobId = :jobId', { jobId });
    if (requestedBy) qb.andWhere('r.requestedBy = :requestedBy', { requestedBy });
    const [data, total] = await qb.orderBy('r.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

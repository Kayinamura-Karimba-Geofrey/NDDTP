import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackupJob } from '../../../database/entities/backup-job.entity';
import { JobStatus } from '../../../common/enums';

@Injectable()
export class JobRepository {
  constructor(@InjectRepository(BackupJob) private readonly repo: Repository<BackupJob>) {}

  create(data: Partial<BackupJob>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<BackupJob>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['policy'] });
  }

  async findAll(page: number, limit: number, status?: JobStatus, policyId?: string, initiatedBy?: string) {
    const qb = this.repo.createQueryBuilder('j').leftJoinAndSelect('j.policy', 'policy');
    if (status) qb.andWhere('j.status = :status', { status });
    if (policyId) qb.andWhere('j.policyId = :policyId', { policyId });
    if (initiatedBy) qb.andWhere('j.initiatedBy = :initiatedBy', { initiatedBy });
    const [data, total] = await qb.orderBy('j.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

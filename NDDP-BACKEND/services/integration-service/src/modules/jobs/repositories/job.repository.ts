import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntegrationJob } from '../../../database/entities/integration-job.entity';
import { JobStatus } from '../../../common/enums';

@Injectable()
export class JobRepository {
  constructor(@InjectRepository(IntegrationJob) private readonly repo: Repository<IntegrationJob>) {}

  create(data: Partial<IntegrationJob>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<IntegrationJob>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['connector', 'endpoint'] });
  }

  async findAll(page: number, limit: number, status?: JobStatus, connectorId?: string, submittedBy?: string) {
    const qb = this.repo.createQueryBuilder('j')
      .leftJoinAndSelect('j.connector', 'connector')
      .leftJoinAndSelect('j.endpoint', 'endpoint');
    if (status) qb.andWhere('j.status = :status', { status });
    if (connectorId) qb.andWhere('j.connectorId = :connectorId', { connectorId });
    if (submittedBy) qb.andWhere('j.submittedBy = :submittedBy', { submittedBy });
    const [data, total] = await qb.orderBy('j.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

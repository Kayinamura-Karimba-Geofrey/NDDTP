import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowInstance } from '../../../database/entities/workflow-instance.entity';
import { InstanceStatus, WorkflowEntityType } from '../../../common/enums';

@Injectable()
export class WorkflowInstanceRepository {
  constructor(@InjectRepository(WorkflowInstance) private readonly repo: Repository<WorkflowInstance>) {}

  create(data: Partial<WorkflowInstance>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<WorkflowInstance>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['definition', 'definition.steps'] });
  }

  async findAll(page: number, limit: number, status?: InstanceStatus, entityType?: WorkflowEntityType, initiatedBy?: string) {
    const qb = this.repo.createQueryBuilder('i').leftJoinAndSelect('i.definition', 'definition');
    if (status) qb.andWhere('i.status = :status', { status });
    if (entityType) qb.andWhere('i.entityType = :entityType', { entityType });
    if (initiatedBy) qb.andWhere('i.initiatedBy = :initiatedBy', { initiatedBy });
    const [data, total] = await qb.orderBy('i.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

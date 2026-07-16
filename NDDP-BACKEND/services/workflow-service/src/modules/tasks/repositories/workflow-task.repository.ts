import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowTask } from '../../../database/entities/workflow-task.entity';
import { TaskStatus } from '../../../common/enums';

@Injectable()
export class WorkflowTaskRepository {
  constructor(@InjectRepository(WorkflowTask) private readonly repo: Repository<WorkflowTask>) {}

  create(data: Partial<WorkflowTask>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<WorkflowTask>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['instance', 'step'] });
  }

  findByInstanceAndStepOrder(instanceId: string, stepOrder: number) {
    return this.repo.findOne({ where: { instanceId, stepOrder } });
  }

  findByInstanceId(instanceId: string) {
    return this.repo.find({ where: { instanceId }, relations: ['step'], order: { stepOrder: 'ASC' } });
  }

  async findPending(page: number, limit: number, approverRole?: string) {
    const qb = this.repo.createQueryBuilder('t')
      .leftJoinAndSelect('t.instance', 'instance')
      .leftJoinAndSelect('t.step', 'step')
      .where('t.status = :status', { status: TaskStatus.PENDING });
    if (approverRole) qb.andWhere('t.approverRole = :approverRole', { approverRole });
    const [data, total] = await qb.orderBy('t.createdAt', 'ASC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  async findMine(userId: string, page: number, limit: number) {
    const [data, total] = await this.repo.findAndCount({
      where: { assigneeId: userId, status: TaskStatus.PENDING },
      relations: ['instance', 'step'],
      order: { createdAt: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

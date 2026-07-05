import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImprovementPlan } from '../../../database/entities/improvement-plan.entity';
import { PlanStatus } from '../../../common/enums';

@Injectable()
export class PlanRepository {
  constructor(@InjectRepository(ImprovementPlan) private readonly repo: Repository<ImprovementPlan>) {}

  create(data: Partial<ImprovementPlan>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<ImprovementPlan>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }

  async findAll(page: number, limit: number, userId?: string, status?: PlanStatus) {
    const qb = this.repo.createQueryBuilder('p');
    if (userId) qb.andWhere('p.userId = :userId', { userId });
    if (status) qb.andWhere('p.status = :status', { status });
    const [data, total] = await qb.orderBy('p.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

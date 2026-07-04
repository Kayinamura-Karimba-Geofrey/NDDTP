import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformanceGoal } from '../../../database/entities/performance-goal.entity';

@Injectable()
export class GoalRepository {
  constructor(@InjectRepository(PerformanceGoal) private readonly repo: Repository<PerformanceGoal>) {}

  create(data: Partial<PerformanceGoal>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<PerformanceGoal>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['cycle'] }); }

  async findAll(page: number, limit: number, userId?: string, cycleId?: string) {
    const qb = this.repo.createQueryBuilder('g').leftJoinAndSelect('g.cycle', 'cycle');
    if (userId) qb.andWhere('g.userId = :userId', { userId });
    if (cycleId) qb.andWhere('g.cycleId = :cycleId', { cycleId });
    const [data, total] = await qb.orderBy('g.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

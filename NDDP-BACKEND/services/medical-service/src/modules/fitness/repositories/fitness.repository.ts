import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FitnessAssessment } from '../../../database/entities/fitness-assessment.entity';
import { FitnessStatus } from '../../../common/enums';

@Injectable()
export class FitnessRepository {
  constructor(@InjectRepository(FitnessAssessment) private readonly repo: Repository<FitnessAssessment>) {}

  create(data: Partial<FitnessAssessment>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<FitnessAssessment>) { return this.repo.update(id, data as Record<string, unknown>); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }

  findActiveByUser(userId: string) {
    return this.repo.findOne({
      where: { userId, status: FitnessStatus.ACTIVE },
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(page: number, limit: number, userId?: string) {
    const qb = this.repo.createQueryBuilder('f');
    if (userId) qb.andWhere('f.userId = :userId', { userId });
    const [data, total] = await qb.orderBy('f.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingSession } from '../../../database/entities/training-session.entity';
import { SessionStatus } from '../../../common/enums';

@Injectable()
export class SessionRepository {
  constructor(@InjectRepository(TrainingSession) private readonly repo: Repository<TrainingSession>) {}

  create(data: Partial<TrainingSession>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<TrainingSession>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['course'] });
  }

  async findAll(page: number, limit: number, courseId?: string, status?: SessionStatus) {
    const qb = this.repo.createQueryBuilder('s').leftJoinAndSelect('s.course', 'course');
    if (courseId) qb.andWhere('s.courseId = :courseId', { courseId });
    if (status) qb.andWhere('s.status = :status', { status });
    const [data, total] = await qb.orderBy('s.startDate', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  countEnrollments(sessionId: string) {
    return this.repo.manager.createQueryBuilder()
      .from('training_enrollments', 'e')
      .where('e.session_id = :sessionId', { sessionId })
      .andWhere('e.status NOT IN (:...excluded)', { excluded: ['REJECTED', 'WITHDRAWN', 'CANCELLED'] })
      .getCount();
  }
}

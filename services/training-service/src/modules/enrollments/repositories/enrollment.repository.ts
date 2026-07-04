import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingEnrollment } from '../../../database/entities/training-enrollment.entity';
import { EnrollmentStatus } from '../../../common/enums';

@Injectable()
export class EnrollmentRepository {
  constructor(@InjectRepository(TrainingEnrollment) private readonly repo: Repository<TrainingEnrollment>) {}

  create(data: Partial<TrainingEnrollment>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<TrainingEnrollment>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['session', 'session.course'] });
  }

  findByUserAndSession(userId: string, sessionId: string) {
    return this.repo.findOne({ where: { userId, sessionId } });
  }

  async findAll(page: number, limit: number, status?: EnrollmentStatus, userId?: string, sessionId?: string) {
    const qb = this.repo.createQueryBuilder('e')
      .leftJoinAndSelect('e.session', 'session')
      .leftJoinAndSelect('session.course', 'course');
    if (status) qb.andWhere('e.status = :status', { status });
    if (userId) qb.andWhere('e.userId = :userId', { userId });
    if (sessionId) qb.andWhere('e.sessionId = :sessionId', { sessionId });
    const [data, total] = await qb.orderBy('e.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  findPendingReview(page: number, limit: number) {
    return this.repo.findAndCount({
      where: { status: EnrollmentStatus.PENDING },
      relations: ['session', 'session.course'],
      order: { submittedAt: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}

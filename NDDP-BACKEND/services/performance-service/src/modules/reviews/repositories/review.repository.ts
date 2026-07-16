import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformanceReview } from '../../../database/entities/performance-review.entity';
import { ReviewRating } from '../../../database/entities/review-rating.entity';
import { ReviewStatus } from '../../../common/enums';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(PerformanceReview) private readonly repo: Repository<PerformanceReview>,
    @InjectRepository(ReviewRating) private readonly ratingRepo: Repository<ReviewRating>,
  ) {}

  create(data: Partial<PerformanceReview>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<PerformanceReview>) { return this.repo.update(id, data as Record<string, unknown>); }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['cycle', 'ratings', 'ratings.criteria'] });
  }

  findByUserAndCycle(userId: string, cycleId: string) {
    return this.repo.findOne({ where: { userId, cycleId } });
  }

  saveRatings(ratings: Partial<ReviewRating>[]) {
    return this.ratingRepo.save(ratings.map((r) => this.ratingRepo.create(r)));
  }

  async findAll(page: number, limit: number, status?: ReviewStatus, userId?: string, cycleId?: string) {
    const qb = this.repo.createQueryBuilder('r').leftJoinAndSelect('r.cycle', 'cycle');
    if (status) qb.andWhere('r.status = :status', { status });
    if (userId) qb.andWhere('r.userId = :userId', { userId });
    if (cycleId) qb.andWhere('r.cycleId = :cycleId', { cycleId });
    const [data, total] = await qb.orderBy('r.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  findPendingManagerReview(page: number, limit: number) {
    return this.repo.findAndCount({
      where: { status: ReviewStatus.SELF_SUBMITTED },
      relations: ['cycle'],
      order: { submittedAt: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}

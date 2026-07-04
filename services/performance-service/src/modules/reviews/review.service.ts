import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ReviewRepository } from './repositories/review.repository';
import { CycleRepository } from '../cycles/repositories/cycle.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/performance.exceptions';
import { CreateReviewDto, SubmitSelfAssessmentDto, SubmitManagerReviewDto } from './dto/review.dto';
import { ReviewStatus, CycleStatus } from '../../common/enums';
import { REVIEW_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger(ReviewService.name);

  constructor(
    private readonly repo: ReviewRepository,
    private readonly cycleRepo: CycleRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(userId: string, dto: CreateReviewDto) {
    const cycle = await this.cycleRepo.findById(dto.cycleId);
    if (!cycle) throw new ResourceNotFoundException('PerformanceCycle', dto.cycleId);
    if (cycle.status !== CycleStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Reviews can only be created for active cycles');
    }

    const existing = await this.repo.findByUserAndCycle(userId, dto.cycleId);
    if (existing) throw new BusinessRuleViolationException('Review already exists for this cycle');

    const reviewNumber = `REV-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const review = await this.repo.create({ reviewNumber, userId, cycleId: dto.cycleId, status: ReviewStatus.DRAFT });
    this.logger.log(`Review ${reviewNumber} created`);
    return this.repo.findById(review.id);
  }

  async submitSelfAssessment(id: string, userId: string, dto: SubmitSelfAssessmentDto) {
    const review = await this.getOwned(id, userId);
    this.assertTransition(review.status, ReviewStatus.SELF_SUBMITTED);

    await this.repo.update(id, { status: ReviewStatus.SELF_SUBMITTED, selfAssessment: dto.selfAssessment, submittedAt: new Date() });
    await this.publisher.publishReviewSubmitted({ reviewId: id, reviewNumber: review.reviewNumber, userId });
    return this.repo.findById(id);
  }

  async submitManagerReview(id: string, reviewerId: string, dto: SubmitManagerReviewDto) {
    const review = await this.findById(id);
    this.assertTransition(review.status, ReviewStatus.MANAGER_REVIEW);

    await this.repo.update(id, {
      status: ReviewStatus.MANAGER_REVIEW,
      reviewerId,
      managerComments: dto.managerComments,
      overallRating: dto.overallRating,
    });

    await this.repo.saveRatings(dto.ratings.map((r) => ({
      reviewId: id,
      criteriaId: r.criteriaId,
      rating: r.rating,
      comments: r.comments ?? null,
    })));

    return this.repo.findById(id);
  }

  async approve(id: string, approverId: string) {
    const review = await this.findById(id);
    const approvable = [ReviewStatus.MANAGER_REVIEW, ReviewStatus.CALIBRATION];
    if (!approvable.includes(review.status)) {
      throw new BusinessRuleViolationException('Review is not ready for approval');
    }

    await this.repo.update(id, { status: ReviewStatus.APPROVED, reviewerId: approverId });
    await this.publisher.publishReviewApproved({ reviewId: id, reviewNumber: review.reviewNumber, userId: review.userId, approverId });
    return this.repo.findById(id);
  }

  async finalize(id: string) {
    const review = await this.findById(id);
    this.assertTransition(review.status, ReviewStatus.FINALIZED);

    await this.repo.update(id, { status: ReviewStatus.FINALIZED, finalizedAt: new Date() });
    await this.publisher.publishReviewFinalized({ reviewId: id, reviewNumber: review.reviewNumber, userId: review.userId });
    return this.repo.findById(id);
  }

  async reject(id: string) {
    const review = await this.findById(id);
    const rejectable = [ReviewStatus.SELF_SUBMITTED, ReviewStatus.MANAGER_REVIEW, ReviewStatus.CALIBRATION];
    if (!rejectable.includes(review.status)) {
      throw new BusinessRuleViolationException('Review cannot be rejected at this stage');
    }
    await this.repo.update(id, { status: ReviewStatus.REJECTED });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: ReviewStatus; userId?: string; cycleId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.userId, filter.cycleId);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, userId);
  }

  async findPendingManagerReview(page = 1, limit = 20) {
    const [data, total] = await this.repo.findPendingManagerReview(page, limit);
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  async findById(id: string) {
    const review = await this.repo.findById(id);
    if (!review) throw new ResourceNotFoundException('PerformanceReview', id);
    return review;
  }

  private async getOwned(id: string, userId: string) {
    const review = await this.findById(id);
    if (review.userId !== userId) throw new BusinessRuleViolationException('You can only manage your own review');
    return review;
  }

  private assertTransition(from: ReviewStatus, to: ReviewStatus) {
    const allowed = REVIEW_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}

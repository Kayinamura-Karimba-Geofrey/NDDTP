import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { EnrollmentRepository } from './repositories/enrollment.repository';
import { SessionRepository } from '../sessions/repositories/session.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/training.exceptions';
import { CreateEnrollmentDto, RejectEnrollmentDto, CompleteEnrollmentDto } from './dto/enrollment.dto';
import { EnrollmentStatus, SessionStatus } from '../../common/enums';
import { ENROLLMENT_STATUS_TRANSITIONS } from '../../common/constants';

@Injectable()
export class EnrollmentService {
  private readonly logger = new Logger(EnrollmentService.name);

  constructor(
    private readonly repo: EnrollmentRepository,
    private readonly sessionRepo: SessionRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async submit(userId: string, dto: CreateEnrollmentDto) {
    const session = await this.sessionRepo.findById(dto.sessionId);
    if (!session) throw new ResourceNotFoundException('TrainingSession', dto.sessionId);
    if (session.status === SessionStatus.CANCELLED || session.status === SessionStatus.COMPLETED) {
      throw new BusinessRuleViolationException('Session is not open for enrollment');
    }

    const existing = await this.repo.findByUserAndSession(userId, dto.sessionId);
    if (existing && ![EnrollmentStatus.REJECTED, EnrollmentStatus.WITHDRAWN, EnrollmentStatus.CANCELLED].includes(existing.status)) {
      throw new BusinessRuleViolationException('You already have an active enrollment for this session');
    }

    const enrolled = await this.sessionRepo.countEnrollments(dto.sessionId);
    if (session.capacity > 0 && enrolled >= session.capacity) {
      throw new BusinessRuleViolationException('Session is at full capacity');
    }

    const enrollmentNumber = `ENR-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const enrollment = await this.repo.create({
      enrollmentNumber,
      userId,
      sessionId: dto.sessionId,
      justification: dto.justification ?? null,
      status: EnrollmentStatus.PENDING,
      submittedAt: new Date(),
    });

    await this.publisher.publishEnrollmentSubmitted({
      enrollmentId: enrollment.id, enrollmentNumber, userId, sessionId: dto.sessionId,
    });

    this.logger.log(`Enrollment ${enrollmentNumber} submitted`);
    return this.repo.findById(enrollment.id);
  }

  async approve(id: string, reviewerId: string) {
    const enrollment = await this.findById(id);
    this.assertTransition(enrollment.status, EnrollmentStatus.APPROVED);

    await this.repo.update(id, { status: EnrollmentStatus.APPROVED, reviewerId, approvedAt: new Date() });
    await this.publisher.publishEnrollmentApproved({
      enrollmentId: id, enrollmentNumber: enrollment.enrollmentNumber, userId: enrollment.userId, reviewerId,
    });
    return this.repo.findById(id);
  }

  async reject(id: string, reviewerId: string, dto: RejectEnrollmentDto) {
    const enrollment = await this.findById(id);
    this.assertTransition(enrollment.status, EnrollmentStatus.REJECTED);

    await this.repo.update(id, {
      status: EnrollmentStatus.REJECTED, reviewerId, rejectionReason: dto.rejectionReason,
    });
    await this.publisher.publishEnrollmentRejected({
      enrollmentId: id, enrollmentNumber: enrollment.enrollmentNumber, userId: enrollment.userId,
      rejectionReason: dto.rejectionReason, reviewerId,
    });
    return this.repo.findById(id);
  }

  async confirmEnrollment(id: string) {
    const enrollment = await this.findById(id);
    this.assertTransition(enrollment.status, EnrollmentStatus.ENROLLED);
    await this.repo.update(id, { status: EnrollmentStatus.ENROLLED });
    return this.repo.findById(id);
  }

  async startTraining(id: string) {
    const enrollment = await this.findById(id);
    this.assertTransition(enrollment.status, EnrollmentStatus.IN_PROGRESS);
    await this.repo.update(id, { status: EnrollmentStatus.IN_PROGRESS });
    return this.repo.findById(id);
  }

  async complete(id: string, dto: CompleteEnrollmentDto) {
    const enrollment = await this.findById(id);
    this.assertTransition(enrollment.status, EnrollmentStatus.COMPLETED);

    await this.repo.update(id, {
      status: EnrollmentStatus.COMPLETED, score: dto.score ?? null, completedAt: new Date(),
    });
    await this.publisher.publishEnrollmentCompleted({
      enrollmentId: id, enrollmentNumber: enrollment.enrollmentNumber, userId: enrollment.userId, score: dto.score,
    });
    return this.repo.findById(id);
  }

  async withdraw(id: string, userId: string) {
    const enrollment = await this.findById(id);
    if (enrollment.userId !== userId) {
      throw new BusinessRuleViolationException('You can only withdraw your own enrollment');
    }
    const withdrawable = [EnrollmentStatus.PENDING, EnrollmentStatus.APPROVED, EnrollmentStatus.ENROLLED];
    if (!withdrawable.includes(enrollment.status)) {
      throw new BusinessRuleViolationException('This enrollment cannot be withdrawn');
    }
    await this.repo.update(id, { status: EnrollmentStatus.WITHDRAWN });
    return this.repo.findById(id);
  }

  findAll(filter: { page?: number; limit?: number; status?: EnrollmentStatus; userId?: string; sessionId?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.userId, filter.sessionId);
  }

  findMine(userId: string, page = 1, limit = 20) {
    return this.repo.findAll(page, limit, undefined, userId);
  }

  async findPendingReview(page = 1, limit = 20) {
    const [data, total] = await this.repo.findPendingReview(page, limit);
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  async findById(id: string) {
    const enrollment = await this.repo.findById(id);
    if (!enrollment) throw new ResourceNotFoundException('TrainingEnrollment', id);
    return enrollment;
  }

  private assertTransition(from: EnrollmentStatus, to: EnrollmentStatus) {
    const allowed = ENROLLMENT_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}

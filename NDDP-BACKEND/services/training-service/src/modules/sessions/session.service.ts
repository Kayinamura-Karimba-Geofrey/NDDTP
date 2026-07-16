import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SessionRepository } from './repositories/session.repository';
import { CourseRepository } from '../courses/repositories/course.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/training.exceptions';
import { CreateSessionDto } from './dto/session.dto';
import { CourseStatus, SessionStatus } from '../../common/enums';
import { CACHE_KEYS } from '../../common/constants';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    private readonly repo: SessionRepository,
    private readonly courseRepo: CourseRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateSessionDto) {
    const course = await this.courseRepo.findById(dto.courseId);
    if (!course) throw new ResourceNotFoundException('TrainingCourse', dto.courseId);
    if (course.status !== CourseStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Course is not active');
    }
    if (new Date(dto.endDate) < new Date(dto.startDate)) {
      throw new BusinessRuleViolationException('End date must be on or after start date');
    }

    const sessionCode = `SES-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const capacity = dto.capacity ?? course.maxParticipants;

    const session = await this.repo.create({
      sessionCode,
      courseId: dto.courseId,
      instructorId: dto.instructorId ?? null,
      location: dto.location ?? null,
      startDate: dto.startDate,
      endDate: dto.endDate,
      capacity,
      notes: dto.notes ?? null,
      status: SessionStatus.SCHEDULED,
    });

    await this.redis.del(CACHE_KEYS.SESSION(session.id));
    await this.publisher.publishSessionScheduled({
      sessionId: session.id, sessionCode, courseId: dto.courseId, startDate: dto.startDate, endDate: dto.endDate,
    });

    this.logger.log(`Session ${sessionCode} scheduled`);
    return this.repo.findById(session.id);
  }

  async start(id: string) {
    const session = await this.findById(id);
    if (session.status !== SessionStatus.SCHEDULED) {
      throw new BusinessRuleViolationException('Only scheduled sessions can be started');
    }
    await this.repo.update(id, { status: SessionStatus.IN_PROGRESS });
    await this.redis.del(CACHE_KEYS.SESSION(id));
    return this.repo.findById(id);
  }

  async complete(id: string) {
    const session = await this.findById(id);
    if (session.status !== SessionStatus.IN_PROGRESS) {
      throw new BusinessRuleViolationException('Only in-progress sessions can be completed');
    }
    await this.repo.update(id, { status: SessionStatus.COMPLETED });
    await this.redis.del(CACHE_KEYS.SESSION(id));
    return this.repo.findById(id);
  }

  async cancel(id: string, reason: string) {
    const session = await this.findById(id);
    if ([SessionStatus.COMPLETED, SessionStatus.CANCELLED].includes(session.status)) {
      throw new BusinessRuleViolationException('Session cannot be cancelled');
    }
    await this.repo.update(id, { status: SessionStatus.CANCELLED, notes: reason });
    await this.redis.del(CACHE_KEYS.SESSION(id));
    return this.repo.findById(id);
  }

  async findById(id: string) {
    const session = await this.repo.findById(id);
    if (!session) throw new ResourceNotFoundException('TrainingSession', id);
    return session;
  }

  findAll(filter: { page?: number; limit?: number; courseId?: string; status?: SessionStatus }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.courseId, filter.status);
  }

  async getAvailableSlots(sessionId: string) {
    const session = await this.findById(sessionId);
    const enrolled = await this.repo.countEnrollments(sessionId);
    return { capacity: session.capacity, enrolled, available: Math.max(0, session.capacity - enrolled) };
  }
}

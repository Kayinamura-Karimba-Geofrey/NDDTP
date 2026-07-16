import { Injectable, Logger } from '@nestjs/common';
import { CourseRepository } from './repositories/course.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { ResourceNotFoundException, DuplicateResourceException } from '../../common/exceptions/training.exceptions';
import { CACHE_KEYS } from '../../common/constants';
import { CourseStatus } from '../../common/enums';

@Injectable()
export class CourseService {
  private readonly logger = new Logger(CourseService.name);

  constructor(
    private readonly repo: CourseRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(dto: CreateCourseDto) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new DuplicateResourceException('code', dto.code);

    const course = await this.repo.create({
      code: dto.code,
      name: dto.name,
      category: dto.category,
      description: dto.description ?? null,
      durationDays: dto.durationDays ?? 1,
      maxParticipants: dto.maxParticipants ?? 0,
      status: CourseStatus.ACTIVE,
    });

    await this.redis.del(CACHE_KEYS.ACTIVE_COURSES);
    await this.publisher.publishCourseCreated({ courseId: course.id, code: course.code, name: course.name });
    this.logger.log(`Course created: ${course.code}`);
    return course;
  }

  async update(id: string, dto: UpdateCourseDto) {
    const course = await this.repo.findById(id);
    if (!course) throw new ResourceNotFoundException('TrainingCourse', id);

    await this.repo.update(id, dto);
    await this.redis.del(CACHE_KEYS.COURSE(id), CACHE_KEYS.ACTIVE_COURSES);
    return this.repo.findById(id);
  }

  async findById(id: string) {
    const cached = await this.redis.get(CACHE_KEYS.COURSE(id));
    if (cached) return JSON.parse(cached);

    const course = await this.repo.findById(id);
    if (!course) throw new ResourceNotFoundException('TrainingCourse', id);
    await this.redis.set(CACHE_KEYS.COURSE(id), JSON.stringify(course), 300);
    return course;
  }

  async findActive() {
    const cached = await this.redis.get(CACHE_KEYS.ACTIVE_COURSES);
    if (cached) return JSON.parse(cached);

    const courses = await this.repo.findActive();
    await this.redis.set(CACHE_KEYS.ACTIVE_COURSES, JSON.stringify(courses), 300);
    return courses;
  }

  findAll(page = 1, limit = 20) {
    return this.repo.findAll(page, limit);
  }
}

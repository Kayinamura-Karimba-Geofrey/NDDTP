import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JobPostingRepository } from './repositories/job-posting.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';
import { DuplicateResourceException, ResourceNotFoundException, BusinessRuleViolationException } from '../../common/exceptions/recruitment.exceptions';
import { CreateJobPostingDto, UpdateJobPostingDto } from './dto/job-posting.dto';
import { JobPostingStatus } from '../../common/enums';

@Injectable()
export class JobPostingService {
  private readonly logger = new Logger(JobPostingService.name);

  constructor(
    private readonly repo: JobPostingRepository,
    private readonly publisher: EventPublisherService,
    private readonly redis: RedisService,
    private readonly cs: ConfigService,
  ) {}

  async create(dto: CreateJobPostingDto, createdBy?: string, correlationId?: string) {
    if (await this.repo.findByReference(dto.referenceNumber)) {
      throw new DuplicateResourceException('referenceNumber', dto.referenceNumber);
    }
    const posting = await this.repo.create({ ...dto, createdBy: createdBy ?? null });
    await this.publisher.publishPostingCreated({
      postingId: posting.id, referenceNumber: posting.referenceNumber, title: posting.title,
    }, correlationId);
    return posting;
  }

  findAll(filter: { page?: number; limit?: number; status?: JobPostingStatus; department?: string; search?: string }) {
    return this.repo.findAll(filter.page || 1, filter.limit || 20, filter.status, filter.department, filter.search);
  }

  async findPublished() {
    const cached = await this.redis.get(CACHE_KEYS.PUBLISHED_POSTINGS);
    if (cached) return JSON.parse(cached);
    const postings = await this.repo.findPublished();
    const ttl = this.cs.get<number>('redis.ttl.posting') || 600;
    await this.redis.set(CACHE_KEYS.PUBLISHED_POSTINGS, JSON.stringify(postings), ttl);
    return postings;
  }

  async findById(id: string) {
    const cached = await this.redis.get(CACHE_KEYS.POSTING(id));
    if (cached) return JSON.parse(cached);
    const posting = await this.repo.findById(id);
    if (!posting) throw new ResourceNotFoundException('JobPosting', id);
    const ttl = this.cs.get<number>('redis.ttl.posting') || 600;
    await this.redis.set(CACHE_KEYS.POSTING(id), JSON.stringify(posting), ttl);
    return posting;
  }

  async update(id: string, dto: UpdateJobPostingDto) {
    const posting = await this.findById(id);
    if (posting.status !== JobPostingStatus.DRAFT) {
      throw new BusinessRuleViolationException('Only DRAFT postings can be edited');
    }
    await this.repo.update(id, dto);
    await this.invalidateCache(id);
    return this.findById(id);
  }

  async publish(id: string, correlationId?: string) {
    const posting = await this.findById(id);
    if (posting.status !== JobPostingStatus.DRAFT) {
      throw new BusinessRuleViolationException('Only DRAFT postings can be published');
    }
    await this.repo.update(id, { status: JobPostingStatus.PUBLISHED, publishedAt: new Date() });
    await this.invalidateCache(id);
    await this.publisher.publishPostingPublished({
      postingId: id, referenceNumber: posting.referenceNumber, title: posting.title,
    }, correlationId);
    this.logger.log(`Published job posting ${id}`);
    return this.findById(id);
  }

  async close(id: string, correlationId?: string) {
    const posting = await this.findById(id);
    if (posting.status !== JobPostingStatus.PUBLISHED) {
      throw new BusinessRuleViolationException('Only PUBLISHED postings can be closed');
    }
    await this.repo.update(id, { status: JobPostingStatus.CLOSED });
    await this.invalidateCache(id);
    await this.publisher.publishPostingClosed({ postingId: id, referenceNumber: posting.referenceNumber }, correlationId);
    return this.findById(id);
  }

  async incrementFilled(id: string) {
    const posting = await this.findById(id);
    await this.repo.update(id, { positionsFilled: posting.positionsFilled + 1 });
    if (posting.positionsFilled + 1 >= posting.positionsAvailable) {
      await this.repo.update(id, { status: JobPostingStatus.CLOSED });
    }
    await this.invalidateCache(id);
  }

  private async invalidateCache(id: string) {
    await this.redis.del(CACHE_KEYS.POSTING(id), CACHE_KEYS.PUBLISHED_POSTINGS);
  }
}

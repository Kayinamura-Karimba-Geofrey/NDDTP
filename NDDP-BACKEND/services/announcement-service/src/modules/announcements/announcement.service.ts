import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AnnouncementRepository, AnnouncementAudienceRepository } from './repositories/announcement.repository';
import { CategoryRepository } from '../categories/repositories/category.repository';
import { RedisService } from '../cache/redis.module';
import { EventPublisherService } from '../../events/event-publisher.service';
import { CreateAnnouncementDto } from './dto/announcement.dto';
import {
  ResourceNotFoundException, InvalidStatusTransitionException, BusinessRuleViolationException,
} from '../../common/exceptions/announcement.exceptions';
import { CACHE_KEYS, ANNOUNCEMENT_STATUS_TRANSITIONS } from '../../common/constants';
import { AnnouncementPriority, AnnouncementStatus, AudienceType, CategoryStatus } from '../../common/enums';

@Injectable()
export class AnnouncementService {
  private readonly logger = new Logger(AnnouncementService.name);

  constructor(
    private readonly repo: AnnouncementRepository,
    private readonly audienceRepo: AnnouncementAudienceRepository,
    private readonly categoryRepo: CategoryRepository,
    private readonly redis: RedisService,
    private readonly publisher: EventPublisherService,
  ) {}

  async create(createdBy: string, dto: CreateAnnouncementDto) {
    const category = await this.categoryRepo.findById(dto.categoryId);
    if (!category) throw new ResourceNotFoundException('AnnouncementCategory', dto.categoryId);
    if (category.status !== CategoryStatus.ACTIVE) {
      throw new BusinessRuleViolationException('Category is not active');
    }

    const audienceType = dto.audienceType ?? AudienceType.ALL;
    if (audienceType !== AudienceType.ALL && !dto.audienceRef) {
      throw new BusinessRuleViolationException('Audience reference is required for targeted announcements');
    }

    const referenceNumber = `ANN-${Date.now().toString(36).toUpperCase()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const announcement = await this.repo.create({
      referenceNumber,
      categoryId: dto.categoryId,
      title: dto.title,
      content: dto.content,
      priority: dto.priority ?? AnnouncementPriority.NORMAL,
      status: AnnouncementStatus.DRAFT,
      audienceType,
      audienceRef: dto.audienceRef ?? null,
      createdBy,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
    });

    if (dto.audiences?.length) {
      for (const a of dto.audiences) {
        await this.audienceRepo.create({
          announcementId: announcement.id,
          audienceType: a.audienceType,
          audienceRef: a.audienceRef,
        });
      }
    }

    await this.publisher.publishCreated({ announcementId: announcement.id, referenceNumber, createdBy });
    this.logger.log(`Announcement created: ${referenceNumber}`);
    return this.repo.findById(announcement.id);
  }

  async publish(id: string, publishedBy: string) {
    const announcement = await this.findById(id);
    this.assertTransition(announcement.status, AnnouncementStatus.PUBLISHED);

    if (announcement.expiresAt && announcement.expiresAt <= new Date()) {
      throw new BusinessRuleViolationException('Cannot publish an already-expired announcement');
    }

    await this.repo.update(id, {
      status: AnnouncementStatus.PUBLISHED,
      publishedBy,
      publishedAt: new Date(),
    });
    await this.redis.del(CACHE_KEYS.PUBLISHED);
    await this.publisher.publishPublished({ announcementId: id, referenceNumber: announcement.referenceNumber, publishedBy });
    return this.repo.findById(id);
  }

  async withdraw(id: string, userId: string) {
    const announcement = await this.findById(id);
    this.assertTransition(announcement.status, AnnouncementStatus.WITHDRAWN);
    if (announcement.createdBy !== userId && announcement.publishedBy !== userId) {
      throw new BusinessRuleViolationException('Only the creator or publisher can withdraw an announcement');
    }
    await this.repo.update(id, { status: AnnouncementStatus.WITHDRAWN });
    await this.redis.del(CACHE_KEYS.PUBLISHED);
    await this.publisher.publishWithdrawn({ announcementId: id, referenceNumber: announcement.referenceNumber });
    return this.repo.findById(id);
  }

  async expire(id: string) {
    const announcement = await this.findById(id);
    this.assertTransition(announcement.status, AnnouncementStatus.EXPIRED);
    await this.repo.update(id, { status: AnnouncementStatus.EXPIRED });
    await this.redis.del(CACHE_KEYS.PUBLISHED);
    return this.repo.findById(id);
  }

  async findPublished() {
    const cached = await this.redis.get(CACHE_KEYS.PUBLISHED);
    if (cached) return JSON.parse(cached);
    const announcements = await this.repo.findPublished();
    await this.redis.set(CACHE_KEYS.PUBLISHED, JSON.stringify(announcements), 300);
    return announcements;
  }

  findAll(page: number, limit: number, status?: AnnouncementStatus, categoryId?: string) {
    return this.repo.findAll(page, limit, status, categoryId);
  }

  async findById(id: string) {
    const announcement = await this.repo.findById(id);
    if (!announcement) throw new ResourceNotFoundException('Announcement', id);
    return announcement;
  }

  async findAudiences(id: string) {
    await this.findById(id);
    return this.audienceRepo.findByAnnouncementId(id);
  }

  private assertTransition(from: AnnouncementStatus, to: AnnouncementStatus) {
    const allowed = ANNOUNCEMENT_STATUS_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) throw new InvalidStatusTransitionException(from, to);
  }
}

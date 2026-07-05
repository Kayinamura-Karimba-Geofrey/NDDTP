import { Injectable, Logger } from '@nestjs/common';
import { AcknowledgementRepository } from './repositories/acknowledgement.repository';
import { AnnouncementRepository } from '../announcements/repositories/announcement.repository';
import { EventPublisherService } from '../../events/event-publisher.service';
import {
  ResourceNotFoundException, DuplicateResourceException, BusinessRuleViolationException,
} from '../../common/exceptions/announcement.exceptions';
import { AnnouncementStatus } from '../../common/enums';

@Injectable()
export class AcknowledgementService {
  private readonly logger = new Logger(AcknowledgementService.name);

  constructor(
    private readonly repo: AcknowledgementRepository,
    private readonly announcementRepo: AnnouncementRepository,
    private readonly publisher: EventPublisherService,
  ) {}

  async acknowledge(announcementId: string, userId: string) {
    const announcement = await this.announcementRepo.findById(announcementId);
    if (!announcement) throw new ResourceNotFoundException('Announcement', announcementId);
    if (announcement.status !== AnnouncementStatus.PUBLISHED) {
      throw new BusinessRuleViolationException('Only published announcements can be acknowledged');
    }

    const existing = await this.repo.findByAnnouncementAndUser(announcementId, userId);
    if (existing) throw new DuplicateResourceException('acknowledgement', `${announcementId}:${userId}`);

    const ack = await this.repo.create({
      announcementId,
      userId,
      acknowledgedAt: new Date(),
    });

    await this.publisher.publishAcknowledged({
      acknowledgementId: ack.id, announcementId, userId, referenceNumber: announcement.referenceNumber,
    });
    this.logger.log(`Announcement acknowledged: ${announcement.referenceNumber} by ${userId}`);
    return ack;
  }

  async findByAnnouncement(announcementId: string) {
    const announcement = await this.announcementRepo.findById(announcementId);
    if (!announcement) throw new ResourceNotFoundException('Announcement', announcementId);
    return this.repo.findByAnnouncementId(announcementId);
  }

  async countByAnnouncement(announcementId: string) {
    await this.findByAnnouncement(announcementId);
    return { announcementId, count: await this.repo.countByAnnouncementId(announcementId) };
  }

  async findMine(userId: string) {
    return this.repo.findByUserId(userId);
  }
}

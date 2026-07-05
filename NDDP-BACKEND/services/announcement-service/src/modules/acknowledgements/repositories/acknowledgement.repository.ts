import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnouncementAcknowledgement } from '../../../database/entities/announcement-acknowledgement.entity';

@Injectable()
export class AcknowledgementRepository {
  constructor(@InjectRepository(AnnouncementAcknowledgement) private readonly repo: Repository<AnnouncementAcknowledgement>) {}

  create(data: Partial<AnnouncementAcknowledgement>) { return this.repo.save(this.repo.create(data)); }
  findByAnnouncementAndUser(announcementId: string, userId: string) {
    return this.repo.findOne({ where: { announcementId, userId } });
  }
  findByAnnouncementId(announcementId: string) {
    return this.repo.find({ where: { announcementId }, order: { acknowledgedAt: 'DESC' } });
  }
  findByUserId(userId: string) {
    return this.repo.find({ where: { userId }, relations: ['announcement'], order: { acknowledgedAt: 'DESC' } });
  }
  countByAnnouncementId(announcementId: string) {
    return this.repo.count({ where: { announcementId } });
  }
}

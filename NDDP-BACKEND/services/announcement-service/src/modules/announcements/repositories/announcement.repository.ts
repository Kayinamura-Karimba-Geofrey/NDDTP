import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from '../../../database/entities/announcement.entity';
import { AnnouncementAudience } from '../../../database/entities/announcement-audience.entity';
import { AnnouncementStatus } from '../../../common/enums';
import { PaginatedResult } from '@nddtp/platform-core';

@Injectable()
export class AnnouncementRepository {
  constructor(@InjectRepository(Announcement) private readonly repo: Repository<Announcement>) {}

  create(data: Partial<Announcement>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id }, relations: ['category'] }); }
  update(id: string, data: Partial<Announcement>) { return this.repo.update(id, data as Record<string, unknown>); }

  async findAll(page: number, limit: number, status?: AnnouncementStatus, categoryId?: string): Promise<PaginatedResult<Announcement>> {
    const qb = this.repo.createQueryBuilder('a').leftJoinAndSelect('a.category', 'category');
    if (status) qb.andWhere('a.status = :status', { status });
    if (categoryId) qb.andWhere('a.categoryId = :categoryId', { categoryId });
    const [data, total] = await qb.orderBy('a.createdAt', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  findPublished() {
    return this.repo.find({
      where: { status: AnnouncementStatus.PUBLISHED },
      relations: ['category'],
      order: { publishedAt: 'DESC' },
    });
  }
}

@Injectable()
export class AnnouncementAudienceRepository {
  constructor(@InjectRepository(AnnouncementAudience) private readonly repo: Repository<AnnouncementAudience>) {}

  create(data: Partial<AnnouncementAudience>) { return this.repo.save(this.repo.create(data)); }
  findByAnnouncementId(announcementId: string) { return this.repo.find({ where: { announcementId } }); }
}

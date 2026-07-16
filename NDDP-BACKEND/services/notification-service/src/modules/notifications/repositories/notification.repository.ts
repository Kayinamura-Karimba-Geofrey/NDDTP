import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../../database/entities/notification.entity';
import { NotificationChannel, NotificationStatus } from '../../../common/enums';
import { PaginatedResult } from '@nddtp/platform-core';

@Injectable()
export class NotificationRepository {
  constructor(@InjectRepository(Notification) private readonly repo: Repository<Notification>) {}

  create(data: Partial<Notification>) {
    return this.repo.save(this.repo.create(data));
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['deliveries'] });
  }

  async findByUserId(
    userId: string, page: number, limit: number, channel?: NotificationChannel, unreadOnly?: boolean,
  ): Promise<PaginatedResult<Notification>> {
    const qb = this.repo.createQueryBuilder('n').where('n.user_id = :userId', { userId });
    if (channel) qb.andWhere('n.channel = :channel', { channel });
    if (unreadOnly) qb.andWhere('n.is_read = false');
    const [data, total] = await qb.orderBy('n.created_at', 'DESC').skip((page - 1) * limit).take(limit).getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return { data, meta: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 } };
  }

  update(id: string, data: Record<string, unknown>) {
    return this.repo.update(id, data);
  }

  countUnread(userId: string) {
    return this.repo.count({ where: { userId, isRead: false, channel: NotificationChannel.IN_APP } });
  }

  async markAsRead(id: string, userId: string) {
    return this.repo.update({ id, userId }, { isRead: true, readAt: new Date() });
  }

  async markAllAsRead(userId: string) {
    return this.repo.update({ userId, isRead: false }, { isRead: true, readAt: new Date() });
  }

  findPendingForRetry(maxRetries: number) {
    return this.repo.find({
      where: { status: NotificationStatus.FAILED },
      take: 50,
      order: { updatedAt: 'ASC' },
    });
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { TemplateRepository } from '../templates/repositories/template.repository';
import { NotificationRepository } from '../notifications/repositories/notification.repository';
import { PreferenceRepository } from '../preferences/repositories/preference.repository';
import { TemplateRendererService } from '../delivery/template-renderer.service';
import { DeliveryEngineService } from '../delivery/delivery-engine.service';
import { SendNotificationDto, NotificationFilterDto } from './dto/notification.dto';
import { ResourceNotFoundException } from '../../common/exceptions/notification.exceptions';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';
import { NotificationChannel, NotificationPriority } from '../../common/enums';
import { EventPublisherService } from '../../events/event-publisher.service';
import { SendNotificationPayload } from '../../common/interfaces';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly templateRepo: TemplateRepository,
    private readonly notificationRepo: NotificationRepository,
    private readonly preferenceRepo: PreferenceRepository,
    private readonly renderer: TemplateRendererService,
    private readonly deliveryEngine: DeliveryEngineService,
    private readonly eventPublisher: EventPublisherService,
    private readonly redis: RedisService,
  ) {}

  async send(dto: SendNotificationDto, correlationId?: string) {
    const template = await this.templateRepo.findByCode(dto.templateCode);
    if (!template) throw new ResourceNotFoundException('Template', dto.templateCode);

    const notificationType = dto.templateCode;
    const enabled = await this.preferenceRepo.isEnabled(dto.userId, notificationType, dto.channel);
    if (!enabled) {
      this.logger.log(`Notification suppressed by user preference: ${dto.userId}/${notificationType}`);
      return { suppressed: true, reason: 'user_preference_disabled' };
    }

    const variables = dto.variables || {};
    const subject = template.subject ? this.renderer.render(template.subject, variables) : null;
    const body = this.renderer.render(template.body, variables);

    const notification = await this.notificationRepo.create({
      userId: dto.userId,
      templateCode: dto.templateCode,
      channel: dto.channel,
      subject,
      body,
      recipientEmail: dto.recipientEmail || null,
      recipientPhone: dto.recipientPhone || null,
      variables,
      priority: NotificationPriority.NORMAL,
      correlationId: correlationId || null,
    });

    await this.deliveryEngine.deliver(notification, correlationId);
    return { notificationId: notification.id, status: 'processing' };
  }

  async sendFromEvent(payload: SendNotificationPayload, correlationId?: string) {
    return this.send({
      userId: payload.userId,
      templateCode: payload.templateCode,
      channel: payload.channel as NotificationChannel,
      recipientEmail: payload.recipientEmail,
      recipientPhone: payload.recipientPhone,
      variables: payload.variables,
    }, correlationId);
  }

  async getUserNotifications(userId: string, filter: NotificationFilterDto) {
    const result = await this.notificationRepo.findByUserId(
      userId, filter.page || 1, filter.limit || 20, filter.channel, filter.unreadOnly,
    );
    return {
      data: result.data.map((n) => ({
        id: n.id, channel: n.channel, subject: n.subject, body: n.body,
        status: n.status, isRead: n.isRead, createdAt: n.createdAt, sentAt: n.sentAt,
      })),
      meta: result.meta,
    };
  }

  async getUnreadCount(userId: string) {
    const cached = await this.redis.get(CACHE_KEYS.UNREAD_COUNT(userId));
    if (cached) return { count: parseInt(cached, 10) };
    const count = await this.notificationRepo.countUnread(userId);
    await this.redis.set(CACHE_KEYS.UNREAD_COUNT(userId), String(count), 300);
    return { count };
  }

  async markAsRead(notificationId: string, userId: string, correlationId?: string) {
    await this.notificationRepo.markAsRead(notificationId, userId);
    await this.redis.del(CACHE_KEYS.UNREAD_COUNT(userId));
    await this.eventPublisher.publishRead({ notificationId, userId }, correlationId);
    return { message: 'Marked as read' };
  }

  async markAllAsRead(userId: string) {
    await this.notificationRepo.markAllAsRead(userId);
    await this.redis.set(CACHE_KEYS.UNREAD_COUNT(userId), '0', 300);
    return { message: 'All notifications marked as read' };
  }

  async getById(id: string) {
    const n = await this.notificationRepo.findById(id);
    if (!n) throw new ResourceNotFoundException('Notification', id);
    return n;
  }
}

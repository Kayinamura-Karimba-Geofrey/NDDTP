import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationRepository } from '../notifications/repositories/notification.repository';
import { DeliveryRepository } from '../notifications/repositories/delivery.repository';
import { EmailProviderService } from './email-provider.service';
import { EventPublisherService } from '../../events/event-publisher.service';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';
import { NotificationChannel, NotificationStatus, DeliveryStatus } from '../../common/enums';
import { Notification } from '../../database/entities/notification.entity';

@Injectable()
export class DeliveryEngineService {
  private readonly logger = new Logger(DeliveryEngineService.name);

  constructor(
    private readonly notificationRepo: NotificationRepository,
    private readonly deliveryRepo: DeliveryRepository,
    private readonly emailProvider: EmailProviderService,
    private readonly eventPublisher: EventPublisherService,
    private readonly redis: RedisService,
    private readonly cs: ConfigService,
  ) {}

  async deliver(notification: Notification, correlationId?: string): Promise<void> {
    const delivery = await this.deliveryRepo.create({
      notificationId: notification.id,
      status: DeliveryStatus.PENDING,
      attemptNumber: 1,
    });

    try {
      await this.notificationRepo.update(notification.id, { status: NotificationStatus.QUEUED });

      switch (notification.channel) {
        case NotificationChannel.EMAIL:
          await this.deliverEmail(notification, delivery.id);
          break;
        case NotificationChannel.IN_APP:
          await this.deliverInApp(notification, delivery.id);
          break;
        case NotificationChannel.SMS:
          await this.deliverSms(notification, delivery.id);
          break;
        case NotificationChannel.PUSH:
          await this.deliverPush(notification, delivery.id);
          break;
      }

      await this.notificationRepo.update(notification.id, {
        status: NotificationStatus.SENT,
        sentAt: new Date(),
      });

      await this.eventPublisher.publishSent({
        notificationId: notification.id,
        userId: notification.userId,
        channel: notification.channel,
      }, correlationId);

      if (notification.channel === NotificationChannel.IN_APP) {
        await this.redis.incr(CACHE_KEYS.UNREAD_COUNT(notification.userId));
      }
    } catch (error) {
      const message = (error as Error).message;
      this.logger.error(`Delivery failed for ${notification.id}: ${message}`);

      await this.deliveryRepo.update(delivery.id, {
        status: DeliveryStatus.FAILED,
        errorMessage: message,
      });

      await this.notificationRepo.update(notification.id, { status: NotificationStatus.FAILED });

      await this.eventPublisher.publishFailed({
        notificationId: notification.id,
        userId: notification.userId,
        error: message,
      }, correlationId);
    }
  }

  private async deliverEmail(notification: Notification, deliveryId: string) {
    if (!notification.recipientEmail) throw new Error('Recipient email required');
    const result = await this.emailProvider.send({
      to: notification.recipientEmail,
      subject: notification.subject || 'NDDTP Notification',
      body: notification.body,
      html: notification.body.includes('<'),
    });
    await this.deliveryRepo.update(deliveryId, {
      status: DeliveryStatus.SENT,
      providerResponse: result.messageId,
      deliveredAt: new Date(),
    });
    await this.notificationRepo.update(notification.id, { status: NotificationStatus.DELIVERED });
  }

  private async deliverInApp(notification: Notification, deliveryId: string) {
    await this.deliveryRepo.update(deliveryId, {
      status: DeliveryStatus.DELIVERED,
      deliveredAt: new Date(),
      providerResponse: 'in_app_stored',
    });
    await this.notificationRepo.update(notification.id, { status: NotificationStatus.DELIVERED });
  }

  private async deliverSms(notification: Notification, deliveryId: string) {
    if (!notification.recipientPhone) throw new Error('Recipient phone required');
    this.logger.log(`SMS stub: would send to ${notification.recipientPhone}`);
    await this.deliveryRepo.update(deliveryId, {
      status: DeliveryStatus.SENT,
      providerResponse: 'sms_stub',
      deliveredAt: new Date(),
    });
  }

  private async deliverPush(notification: Notification, deliveryId: string) {
    this.logger.log(`Push stub: user ${notification.userId}`);
    await this.deliveryRepo.update(deliveryId, {
      status: DeliveryStatus.SENT,
      providerResponse: 'push_stub',
      deliveredAt: new Date(),
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationDelivery } from '../../../database/entities/notification-delivery.entity';
import { DeliveryStatus } from '../../../common/enums';

@Injectable()
export class DeliveryRepository {
  constructor(@InjectRepository(NotificationDelivery) private readonly repo: Repository<NotificationDelivery>) {}

  create(data: Partial<NotificationDelivery>) {
    return this.repo.save(this.repo.create(data));
  }

  update(id: string, data: Record<string, unknown>) {
    return this.repo.update(id, data);
  }

  findByNotificationId(notificationId: string) {
    return this.repo.find({ where: { notificationId }, order: { attemptNumber: 'DESC' } });
  }

  getLatestAttempt(notificationId: string) {
    return this.repo.findOne({ where: { notificationId }, order: { attemptNumber: 'DESC' } });
  }

  countAttempts(notificationId: string) {
    return this.repo.count({ where: { notificationId, status: DeliveryStatus.FAILED } });
  }
}

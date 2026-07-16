import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNotificationPreference } from '../../../database/entities/user-notification-preference.entity';
import { NotificationChannel } from '../../../common/enums';

@Injectable()
export class PreferenceRepository {
  constructor(@InjectRepository(UserNotificationPreference) private readonly repo: Repository<UserNotificationPreference>) {}

  findByUserId(userId: string) {
    return this.repo.find({ where: { userId } });
  }

  findPreference(userId: string, notificationType: string, channel: NotificationChannel) {
    return this.repo.findOne({ where: { userId, notificationType, channel } });
  }

  upsert(data: Partial<UserNotificationPreference>) {
    return this.repo.save(this.repo.create(data));
  }

  async isEnabled(userId: string, notificationType: string, channel: NotificationChannel): Promise<boolean> {
    const pref = await this.findPreference(userId, notificationType, channel);
    return pref ? pref.isEnabled : true;
  }
}

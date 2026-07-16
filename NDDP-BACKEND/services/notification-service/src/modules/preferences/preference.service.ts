import { Injectable } from '@nestjs/common';
import { PreferenceRepository } from './repositories/preference.repository';
import { UpdatePreferenceDto } from '../notifications/dto/notification.dto';
import { RedisService } from '../cache/redis.module';
import { CACHE_KEYS } from '../../common/constants';

@Injectable()
export class PreferenceService {
  constructor(private readonly repo: PreferenceRepository, private readonly redis: RedisService) {}

  async getUserPreferences(userId: string) {
    return this.repo.findByUserId(userId);
  }

  async updatePreference(userId: string, dto: UpdatePreferenceDto) {
    const existing = await this.repo.findPreference(userId, dto.notificationType, dto.channel);
    const pref = await this.repo.upsert({
      id: existing?.id,
      userId,
      notificationType: dto.notificationType,
      channel: dto.channel,
      isEnabled: dto.isEnabled,
    });
    await this.redis.del(CACHE_KEYS.USER_PREFS(userId));
    return pref;
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserNotificationPreference } from '../../database/entities/user-notification-preference.entity';
import { PreferenceController } from './preference.controller';
import { PreferenceService } from './preference.service';
import { PreferenceRepository } from './repositories/preference.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserNotificationPreference])],
  controllers: [PreferenceController],
  providers: [PreferenceService, PreferenceRepository],
  exports: [PreferenceService, PreferenceRepository],
})
export class PreferenceModule {}

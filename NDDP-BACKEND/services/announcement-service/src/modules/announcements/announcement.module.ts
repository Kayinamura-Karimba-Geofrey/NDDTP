import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announcement } from '../../database/entities/announcement.entity';
import { AnnouncementAudience } from '../../database/entities/announcement-audience.entity';
import { AnnouncementRepository, AnnouncementAudienceRepository } from './repositories/announcement.repository';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { CategoryModule } from '../categories/category.module';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Announcement, AnnouncementAudience]),
    CategoryModule,
    RedisModule,
    EventsModule,
  ],
  controllers: [AnnouncementController],
  providers: [AnnouncementRepository, AnnouncementAudienceRepository, AnnouncementService],
  exports: [AnnouncementRepository, AnnouncementService],
})
export class AnnouncementModule {}

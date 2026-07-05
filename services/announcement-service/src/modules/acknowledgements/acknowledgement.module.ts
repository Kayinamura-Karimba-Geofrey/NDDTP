import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementAcknowledgement } from '../../database/entities/announcement-acknowledgement.entity';
import { AcknowledgementRepository } from './repositories/acknowledgement.repository';
import { AcknowledgementService } from './acknowledgement.service';
import { AcknowledgementController } from './acknowledgement.controller';
import { AnnouncementModule } from '../announcements/announcement.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnnouncementAcknowledgement]),
    AnnouncementModule,
    EventsModule,
  ],
  controllers: [AcknowledgementController],
  providers: [AcknowledgementRepository, AcknowledgementService],
})
export class AcknowledgementModule {}

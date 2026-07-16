import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEvent } from '../../database/entities/calendar-event.entity';
import { CalendarEventController } from './calendar-event.controller';
import { CalendarEventService } from './calendar-event.service';
import { CalendarEventRepository } from './repositories/calendar-event.repository';
import { CalendarModule } from '../calendars/calendar.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEvent]), CalendarModule, EventsModule],
  controllers: [CalendarEventController],
  providers: [CalendarEventService, CalendarEventRepository],
  exports: [CalendarEventRepository, CalendarEventService],
})
export class CalendarEventModule {}

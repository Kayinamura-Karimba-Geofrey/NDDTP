import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventAttendee } from '../../database/entities/event-attendee.entity';
import { EventAttendeeController } from './event-attendee.controller';
import { EventAttendeeService } from './event-attendee.service';
import { EventAttendeeRepository } from './repositories/event-attendee.repository';
import { CalendarEventModule } from '../events/calendar-event.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventAttendee]), CalendarEventModule, EventsModule],
  controllers: [EventAttendeeController],
  providers: [EventAttendeeService, EventAttendeeRepository],
  exports: [EventAttendeeRepository, EventAttendeeService],
})
export class EventAttendeeModule {}

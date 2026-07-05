import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule, PlatformHealthModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { CalendarModule } from './modules/calendars/calendar.module';
import { CalendarEventModule } from './modules/events/calendar-event.module';
import { EventAttendeeModule } from './modules/attendees/event-attendee.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-calendar-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    CalendarModule,
    CalendarEventModule,
    EventAttendeeModule,
    PlatformHealthModule,
  ],
})
export class AppModule {}

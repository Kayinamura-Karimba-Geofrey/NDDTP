import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { FacilityTypeModule } from './modules/types/facility-type.module';
import { FacilityModule } from './modules/facilities/facility.module';
import { FacilitySpaceModule } from './modules/spaces/facility-space.module';
import { BookingModule } from './modules/bookings/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-facilities-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    FacilityTypeModule,
    FacilityModule,
    FacilitySpaceModule,
    BookingModule,
  ],
})
export class AppModule {}

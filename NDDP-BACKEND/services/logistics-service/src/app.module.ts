import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { LocationModule } from './modules/locations/location.module';
import { RouteModule } from './modules/routes/route.module';
import { ShipmentModule } from './modules/shipments/shipment.module';
import { TrackingModule } from './modules/tracking/tracking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-logistics-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    LocationModule,
    RouteModule,
    ShipmentModule,
    TrackingModule,
  ],
})
export class AppModule {}

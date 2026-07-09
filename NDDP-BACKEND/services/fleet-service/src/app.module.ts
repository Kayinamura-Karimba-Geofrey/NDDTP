import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { VehicleTypeModule } from './modules/types/vehicle-type.module';
import { VehicleModule } from './modules/vehicles/vehicle.module';
import { AssignmentModule } from './modules/assignments/assignment.module';
import { TripModule } from './modules/trips/trip.module';
import { InspectionModule } from './modules/inspections/inspection.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-fleet-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    VehicleTypeModule,
    VehicleModule,
    AssignmentModule,
    TripModule,
    InspectionModule,
  ],
})
export class AppModule {}

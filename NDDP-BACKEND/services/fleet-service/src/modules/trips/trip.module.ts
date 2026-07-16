import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripLog } from '../../database/entities/trip-log.entity';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TripRepository } from './repositories/trip.repository';
import { VehicleModule } from '../vehicles/vehicle.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([TripLog]), VehicleModule, EventsModule],
  controllers: [TripController],
  providers: [TripService, TripRepository],
})
export class TripModule {}

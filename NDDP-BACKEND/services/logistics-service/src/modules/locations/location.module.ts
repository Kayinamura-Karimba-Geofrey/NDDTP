import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogisticsLocation } from '../../database/entities/logistics-location.entity';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationRepository } from './repositories/location.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([LogisticsLocation]), EventsModule],
  controllers: [LocationController],
  providers: [LocationService, LocationRepository],
  exports: [LocationRepository, LocationService],
})
export class LocationModule {}

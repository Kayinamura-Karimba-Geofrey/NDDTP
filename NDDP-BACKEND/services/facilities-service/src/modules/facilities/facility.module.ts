import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from '../../database/entities/facility.entity';
import { FacilityController } from './facility.controller';
import { FacilityService } from './facility.service';
import { FacilityRepository } from './repositories/facility.repository';
import { FacilityTypeModule } from '../types/facility-type.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Facility]), FacilityTypeModule, EventsModule],
  controllers: [FacilityController],
  providers: [FacilityService, FacilityRepository],
  exports: [FacilityRepository, FacilityService],
})
export class FacilityModule {}

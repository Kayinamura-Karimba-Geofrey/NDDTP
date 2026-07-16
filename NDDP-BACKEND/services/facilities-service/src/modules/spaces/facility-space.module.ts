import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilitySpace } from '../../database/entities/facility-space.entity';
import { FacilitySpaceController } from './facility-space.controller';
import { FacilitySpaceService } from './facility-space.service';
import { FacilitySpaceRepository } from './repositories/facility-space.repository';
import { FacilityModule } from '../facilities/facility.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([FacilitySpace]), FacilityModule, EventsModule],
  controllers: [FacilitySpaceController],
  providers: [FacilitySpaceService, FacilitySpaceRepository],
  exports: [FacilitySpaceRepository, FacilitySpaceService],
})
export class FacilitySpaceModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityType } from '../../database/entities/facility-type.entity';
import { FacilityTypeController } from './facility-type.controller';
import { FacilityTypeService } from './facility-type.service';
import { FacilityTypeRepository } from './repositories/facility-type.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([FacilityType]), EventsModule],
  controllers: [FacilityTypeController],
  providers: [FacilityTypeService, FacilityTypeRepository],
  exports: [FacilityTypeRepository, FacilityTypeService],
})
export class FacilityTypeModule {}

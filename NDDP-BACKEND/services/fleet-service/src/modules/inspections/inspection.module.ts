import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleInspection } from '../../database/entities/vehicle-inspection.entity';
import { InspectionController } from './inspection.controller';
import { InspectionService } from './inspection.service';
import { InspectionRepository } from './repositories/inspection.repository';
import { VehicleModule } from '../vehicles/vehicle.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleInspection]), VehicleModule, EventsModule],
  controllers: [InspectionController],
  providers: [InspectionService, InspectionRepository],
})
export class InspectionModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleType } from '../../database/entities/vehicle-type.entity';
import { VehicleTypeController } from './vehicle-type.controller';
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleTypeRepository } from './repositories/vehicle-type.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType]), EventsModule],
  controllers: [VehicleTypeController],
  providers: [VehicleTypeService, VehicleTypeRepository],
  exports: [VehicleTypeRepository, VehicleTypeService],
})
export class VehicleTypeModule {}

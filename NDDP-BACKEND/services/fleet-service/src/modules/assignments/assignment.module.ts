import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleAssignment } from '../../database/entities/vehicle-assignment.entity';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { AssignmentRepository } from './repositories/assignment.repository';
import { VehicleModule } from '../vehicles/vehicle.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleAssignment]), VehicleModule, EventsModule],
  controllers: [AssignmentController],
  providers: [AssignmentService, AssignmentRepository],
  exports: [AssignmentRepository, AssignmentService],
})
export class AssignmentModule {}

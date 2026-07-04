import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from '../../database/entities';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { AssignmentRepository } from './repositories/assignment.repository';
import { PersonnelModule } from '../personnel/personnel.module';
import { UnitModule } from '../units/unit.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment]), PersonnelModule, UnitModule, EventsModule],
  controllers: [AssignmentController],
  providers: [AssignmentService, AssignmentRepository],
})
export class AssignmentModule {}

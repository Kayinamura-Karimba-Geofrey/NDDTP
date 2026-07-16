import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetAssignment } from '../../database/entities/asset-assignment.entity';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { AssignmentRepository } from './repositories/assignment.repository';
import { AssetModule } from '../assets/asset.module';
import { MovementModule } from '../movements/movement.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssetAssignment]), AssetModule, MovementModule, EventsModule],
  controllers: [AssignmentController],
  providers: [AssignmentService, AssignmentRepository],
})
export class AssignmentModule {}

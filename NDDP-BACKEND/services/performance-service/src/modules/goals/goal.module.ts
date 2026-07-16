import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformanceGoal } from '../../database/entities/performance-goal.entity';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { GoalRepository } from './repositories/goal.repository';
import { CycleModule } from '../cycles/cycle.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([PerformanceGoal]), CycleModule, EventsModule],
  controllers: [GoalController],
  providers: [GoalService, GoalRepository],
})
export class GoalModule {}

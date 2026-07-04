import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImprovementPlan } from '../../database/entities/improvement-plan.entity';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { PlanRepository } from './repositories/plan.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([ImprovementPlan]), EventsModule],
  controllers: [PlanController],
  providers: [PlanService, PlanRepository],
})
export class PlanModule {}

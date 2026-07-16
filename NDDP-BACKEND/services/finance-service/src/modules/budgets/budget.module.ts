import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetAllocation } from '../../database/entities/budget-allocation.entity';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { BudgetRepository } from './repositories/budget.repository';
import { CostAccountModule } from '../accounts/cost-account.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetAllocation]), CostAccountModule, EventsModule],
  controllers: [BudgetController],
  providers: [BudgetService, BudgetRepository],
  exports: [BudgetRepository, BudgetService],
})
export class BudgetModule {}

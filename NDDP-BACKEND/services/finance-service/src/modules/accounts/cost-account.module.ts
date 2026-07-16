import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostAccount } from '../../database/entities/cost-account.entity';
import { CostAccountController } from './cost-account.controller';
import { CostAccountService } from './cost-account.service';
import { CostAccountRepository } from './repositories/cost-account.repository';
import { BudgetCategoryModule } from '../categories/budget-category.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([CostAccount]), BudgetCategoryModule, EventsModule],
  controllers: [CostAccountController],
  providers: [CostAccountService, CostAccountRepository],
  exports: [CostAccountRepository, CostAccountService],
})
export class CostAccountModule {}

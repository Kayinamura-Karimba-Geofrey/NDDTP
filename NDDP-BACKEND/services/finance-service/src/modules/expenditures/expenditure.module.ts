import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenditureRequest } from '../../database/entities/expenditure-request.entity';
import { FinanceTransaction } from '../../database/entities/finance-transaction.entity';
import { ExpenditureController } from './expenditure.controller';
import { ExpenditureService } from './expenditure.service';
import { ExpenditureRepository } from './repositories/expenditure.repository';
import { FinanceTransactionRepository } from './repositories/finance-transaction.repository';
import { BudgetModule } from '../budgets/budget.module';
import { CostAccountModule } from '../accounts/cost-account.module';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenditureRequest, FinanceTransaction]),
    BudgetModule,
    CostAccountModule,
    EventsModule,
  ],
  controllers: [ExpenditureController],
  providers: [ExpenditureService, ExpenditureRepository, FinanceTransactionRepository],
  exports: [ExpenditureRepository, ExpenditureService],
})
export class ExpenditureModule {}

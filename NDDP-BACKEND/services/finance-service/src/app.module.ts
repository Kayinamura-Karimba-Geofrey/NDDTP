import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from '@nddtp/platform-core';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/cache/redis.module';
import { EventsModule } from './events/events.module';
import { BudgetCategoryModule } from './modules/categories/budget-category.module';
import { CostAccountModule } from './modules/accounts/cost-account.module';
import { BudgetModule } from './modules/budgets/budget.module';
import { ExpenditureModule } from './modules/expenditures/expenditure.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, envFilePath: ['.env', '.env.local'] }),
    PlatformModule.forRoot({ serviceName: 'nddtp-finance-service' }),
    DatabaseModule,
    RedisModule,
    EventsModule,
    BudgetCategoryModule,
    CostAccountModule,
    BudgetModule,
    ExpenditureModule,
  ],
})
export class AppModule {}

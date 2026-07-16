import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetCategory } from '../../database/entities/budget-category.entity';
import { BudgetCategoryController } from './budget-category.controller';
import { BudgetCategoryService } from './budget-category.service';
import { BudgetCategoryRepository } from './repositories/budget-category.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetCategory]), EventsModule],
  controllers: [BudgetCategoryController],
  providers: [BudgetCategoryService, BudgetCategoryRepository],
  exports: [BudgetCategoryRepository, BudgetCategoryService],
})
export class BudgetCategoryModule {}

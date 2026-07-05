import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BudgetCategory } from '../../../database/entities/budget-category.entity';

@Injectable()
export class BudgetCategoryRepository {
  constructor(@InjectRepository(BudgetCategory) private readonly repo: Repository<BudgetCategory>) {}

  create(data: Partial<BudgetCategory>) { return this.repo.save(this.repo.create(data)); }
  findById(id: string) { return this.repo.findOne({ where: { id } }); }
  findByCode(code: string) { return this.repo.findOne({ where: { code } }); }
  findActive() { return this.repo.find({ where: { isActive: true }, order: { name: 'ASC' } }); }
}

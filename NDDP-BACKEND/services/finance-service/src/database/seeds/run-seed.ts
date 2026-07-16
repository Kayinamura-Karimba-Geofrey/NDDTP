import dataSource from '../data-source';
import { BudgetCategory } from '../entities/budget-category.entity';
import { CostAccount } from '../entities/cost-account.entity';
import { DEFAULT_BUDGET_CATEGORIES, DEFAULT_COST_ACCOUNTS } from '../../common/constants';
import { BudgetCategoryType, AccountStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const categoryRepo = dataSource.getRepository(BudgetCategory);
  const accountRepo = dataSource.getRepository(CostAccount);
  const categoryMap = new Map<string, string>();

  for (const c of DEFAULT_BUDGET_CATEGORIES) {
    let category = await categoryRepo.findOne({ where: { code: c.code } });
    if (!category) {
      category = await categoryRepo.save({
        code: c.code,
        name: c.name,
        categoryType: c.categoryType as BudgetCategoryType,
        description: c.description,
        isActive: true,
      });
      console.log(`Seeded budget category: ${c.code}`);
    }
    categoryMap.set(c.code, category.id);
  }

  for (const a of DEFAULT_COST_ACCOUNTS) {
    const exists = await accountRepo.findOne({ where: { code: a.code } });
    if (!exists) {
      const categoryId = categoryMap.get(a.categoryCode);
      if (categoryId) {
        await accountRepo.save({
          code: a.code,
          name: a.name,
          categoryId,
          departmentId: a.departmentId,
          status: AccountStatus.ACTIVE,
        });
        console.log(`Seeded cost account: ${a.code}`);
      }
    }
  }

  await dataSource.destroy();
  console.log('Finance seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });

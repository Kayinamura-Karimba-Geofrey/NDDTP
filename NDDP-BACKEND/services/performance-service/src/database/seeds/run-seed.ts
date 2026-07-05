import dataSource from '../data-source';
import { RatingCriteria } from '../entities/rating-criteria.entity';
import { DEFAULT_CRITERIA } from '../../common/constants';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(RatingCriteria);

  for (const c of DEFAULT_CRITERIA) {
    const exists = await repo.findOne({ where: { code: c.code } });
    if (!exists) {
      await repo.save({
        code: c.code,
        name: c.name,
        weight: c.weight,
        description: c.description,
        isActive: true,
      });
      console.log(`Seeded criteria: ${c.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Performance seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });

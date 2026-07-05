import dataSource from '../data-source';
import { AssetCategory } from '../entities/asset-category.entity';
import { DEFAULT_CATEGORIES } from '../../common/constants';
import { AssetType } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(AssetCategory);

  for (const c of DEFAULT_CATEGORIES) {
    const exists = await repo.findOne({ where: { code: c.code } });
    if (!exists) {
      await repo.save({
        code: c.code,
        name: c.name,
        type: c.type as AssetType,
        description: c.description,
        isActive: true,
      });
      console.log(`Seeded category: ${c.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Asset seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });

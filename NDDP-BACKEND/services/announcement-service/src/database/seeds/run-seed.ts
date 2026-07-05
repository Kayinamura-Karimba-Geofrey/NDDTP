import dataSource from '../data-source';
import { AnnouncementCategory } from '../entities/announcement-category.entity';
import { DEFAULT_CATEGORIES } from '../../common/constants';
import { CategoryStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(AnnouncementCategory);

  for (const c of DEFAULT_CATEGORIES) {
    const exists = await repo.findOne({ where: { code: c.code } });
    if (!exists) {
      await repo.save({ code: c.code, name: c.name, status: CategoryStatus.ACTIVE });
      console.log(`Seeded category: ${c.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Announcement seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });

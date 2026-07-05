import dataSource from '../data-source';
import { SearchIndex } from '../entities/search-index.entity';
import { DEFAULT_SEARCH_INDEXES } from '../../common/constants';
import { IndexType, IndexStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(SearchIndex);

  for (const idx of DEFAULT_SEARCH_INDEXES) {
    const exists = await repo.findOne({ where: { code: idx.code } });
    if (!exists) {
      await repo.save({
        code: idx.code,
        name: idx.name,
        indexType: idx.indexType as IndexType,
        status: IndexStatus.ACTIVE,
      });
      console.log(`Seeded search index: ${idx.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Search seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });

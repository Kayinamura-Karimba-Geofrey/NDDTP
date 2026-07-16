import dataSource from '../data-source';
import { ApiProduct } from '../entities/api-product.entity';
import { DEFAULT_API_PRODUCTS } from '../../common/constants';
import { ApiProtocol, ProductStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(ApiProduct);

  for (const p of DEFAULT_API_PRODUCTS) {
    const exists = await repo.findOne({ where: { code: p.code } });
    if (!exists) {
      await repo.save({
        code: p.code,
        name: p.name,
        version: p.version,
        basePath: p.basePath,
        protocol: p.protocol as ApiProtocol,
        status: ProductStatus.ACTIVE,
      });
      console.log(`Seeded API product: ${p.code}`);
    }
  }

  await dataSource.destroy();
  console.log('API Management seed complete');
}

seed().catch((err) => { console.error(err); process.exit(1); });

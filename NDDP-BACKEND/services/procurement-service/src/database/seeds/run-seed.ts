import dataSource from '../data-source';
import { Vendor } from '../entities/vendor.entity';
import { DEFAULT_VENDORS } from '../../common/constants';
import { VendorCategory, VendorStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const vendorRepo = dataSource.getRepository(Vendor);

  for (const v of DEFAULT_VENDORS) {
    const exists = await vendorRepo.findOne({ where: { code: v.code } });
    if (!exists) {
      await vendorRepo.save({
        code: v.code,
        name: v.name,
        category: v.category as VendorCategory,
        contactEmail: v.contactEmail,
        status: VendorStatus.ACTIVE,
      });
      console.log(`Seeded vendor: ${v.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Procurement seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });

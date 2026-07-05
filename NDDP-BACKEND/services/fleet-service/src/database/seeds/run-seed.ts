import dataSource from '../data-source';
import { VehicleType } from '../entities/vehicle-type.entity';
import { DEFAULT_VEHICLE_TYPES } from '../../common/constants';
import { VehicleTypeCategory } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const typeRepo = dataSource.getRepository(VehicleType);

  for (const t of DEFAULT_VEHICLE_TYPES) {
    const exists = await typeRepo.findOne({ where: { code: t.code } });
    if (!exists) {
      await typeRepo.save({
        code: t.code,
        name: t.name,
        category: t.category as VehicleTypeCategory,
        description: t.description,
        isActive: true,
      });
      console.log(`Seeded vehicle type: ${t.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Fleet seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });

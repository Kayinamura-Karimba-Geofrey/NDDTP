import dataSource from '../data-source';
import { MedicalFacility } from '../entities/medical-facility.entity';
import { DEFAULT_FACILITIES } from '../../common/constants';
import { FacilityType, FacilityStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(MedicalFacility);

  for (const f of DEFAULT_FACILITIES) {
    const exists = await repo.findOne({ where: { code: f.code } });
    if (!exists) {
      await repo.save({
        code: f.code,
        name: f.name,
        type: f.type as FacilityType,
        location: f.location,
        capacity: f.capacity,
        status: FacilityStatus.ACTIVE,
      });
      console.log(`Seeded facility: ${f.code}`);
    }
  }

  await dataSource.destroy();
  console.log('Medical seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });

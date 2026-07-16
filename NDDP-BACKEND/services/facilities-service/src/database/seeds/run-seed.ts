import dataSource from '../data-source';
import { FacilityType } from '../entities/facility-type.entity';
import { Facility } from '../entities/facility.entity';
import { DEFAULT_FACILITY_TYPES, DEFAULT_FACILITIES } from '../../common/constants';
import { FacilityTypeCategory, FacilityStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const typeRepo = dataSource.getRepository(FacilityType);
  const facilityRepo = dataSource.getRepository(Facility);
  const typeMap = new Map<string, string>();

  for (const t of DEFAULT_FACILITY_TYPES) {
    let type = await typeRepo.findOne({ where: { code: t.code } });
    if (!type) {
      type = await typeRepo.save({
        code: t.code,
        name: t.name,
        category: t.category as FacilityTypeCategory,
        description: t.description,
        isActive: true,
      });
      console.log(`Seeded facility type: ${t.code}`);
    }
    typeMap.set(t.code, type.id);
  }

  for (const f of DEFAULT_FACILITIES) {
    const exists = await facilityRepo.findOne({ where: { code: f.code } });
    if (!exists) {
      const typeId = typeMap.get(f.typeCode);
      if (typeId) {
        await facilityRepo.save({
          code: f.code,
          name: f.name,
          typeId,
          location: f.location,
          capacity: f.capacity,
          status: FacilityStatus.ACTIVE,
        });
        console.log(`Seeded facility: ${f.code}`);
      }
    }
  }

  await dataSource.destroy();
  console.log('Facilities seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });

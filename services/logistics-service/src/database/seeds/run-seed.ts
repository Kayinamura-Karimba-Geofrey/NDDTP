import dataSource from '../data-source';
import { LogisticsLocation } from '../entities/logistics-location.entity';
import { TransportRoute } from '../entities/transport-route.entity';
import { DEFAULT_LOCATIONS, DEFAULT_ROUTES } from '../../common/constants';
import { LocationType, LocationStatus, TransportMode, RouteStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const locRepo = dataSource.getRepository(LogisticsLocation);
  const routeRepo = dataSource.getRepository(TransportRoute);

  const locationMap = new Map<string, string>();

  for (const l of DEFAULT_LOCATIONS) {
    let loc = await locRepo.findOne({ where: { code: l.code } });
    if (!loc) {
      loc = await locRepo.save({
        code: l.code,
        name: l.name,
        type: l.type as LocationType,
        address: l.address,
        status: LocationStatus.ACTIVE,
      });
      console.log(`Seeded location: ${l.code}`);
    }
    locationMap.set(l.code, loc.id);
  }

  for (const r of DEFAULT_ROUTES) {
    const exists = await routeRepo.findOne({ where: { code: r.code } });
    if (!exists) {
      const originId = locationMap.get(r.originCode);
      const destId = locationMap.get(r.destCode);
      if (originId && destId) {
        await routeRepo.save({
          code: r.code,
          name: r.name,
          originLocationId: originId,
          destinationLocationId: destId,
          transportMode: r.mode as TransportMode,
          distanceKm: r.distanceKm,
          estimatedHours: r.estimatedHours,
          status: RouteStatus.ACTIVE,
        });
        console.log(`Seeded route: ${r.code}`);
      }
    }
  }

  await dataSource.destroy();
  console.log('Logistics seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });

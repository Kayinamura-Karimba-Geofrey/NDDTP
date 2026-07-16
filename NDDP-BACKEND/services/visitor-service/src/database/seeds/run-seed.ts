import dataSource from '../data-source';
import { VisitSite } from '../entities/visit-site.entity';
import { Visitor } from '../entities/visitor.entity';
import { DEFAULT_VISIT_SITES, DEFAULT_VISITORS } from '../../common/constants';
import { SiteType, SiteStatus, IdDocumentType, VisitorStatus } from '../../common/enums';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const siteRepo = dataSource.getRepository(VisitSite);
  const visitorRepo = dataSource.getRepository(Visitor);

  for (const s of DEFAULT_VISIT_SITES) {
    const exists = await siteRepo.findOne({ where: { code: s.code } });
    if (!exists) {
      await siteRepo.save({
        code: s.code,
        name: s.name,
        siteType: s.siteType as SiteType,
        location: s.location,
        status: SiteStatus.ACTIVE,
      });
      console.log(`Seeded visit site: ${s.code}`);
    }
  }

  for (const v of DEFAULT_VISITORS) {
    const exists = await visitorRepo.findOne({ where: { idNumber: v.idNumber } });
    if (!exists) {
      await visitorRepo.save({
        idNumber: v.idNumber,
        firstName: v.firstName,
        lastName: v.lastName,
        organization: v.organization,
        idDocumentType: v.idDocumentType as IdDocumentType,
        status: VisitorStatus.ACTIVE,
        registeredBy: '00000000-0000-0000-0000-000000000001',
      });
      console.log(`Seeded visitor: ${v.idNumber}`);
    }
  }

  await dataSource.destroy();
  console.log('Visitor seed complete');
}

seed().catch((e) => { console.error(e); process.exit(1); });

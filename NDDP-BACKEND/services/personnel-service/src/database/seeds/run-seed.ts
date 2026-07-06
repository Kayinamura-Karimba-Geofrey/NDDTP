import dataSource from '../data-source';
import { Rank } from '../entities/rank.entity';
import { Unit } from '../entities/unit.entity';
import { Qualification } from '../entities/qualification.entity';
import { PersonnelRecord } from '../entities/personnel-record.entity';
import { DEFAULT_RANKS, DEFAULT_UNITS } from '../../common/constants';
import { RankCategory, UnitType, QualificationCategory, PersonnelType, ServiceStatus, ServiceBranch } from '../../common/enums';
import { DEMO_USERS, EXTRA_PERSONNEL } from '../../../../../shared-seeds/demo-users';

const DEFAULT_QUALIFICATIONS = [
  { code: 'BASIC-TRNG', name: 'Basic Military Training', category: 'MILITARY', validityMonths: null },
  { code: 'FIRST-AID', name: 'Combat First Aid', category: 'CERTIFICATION', validityMonths: 24 },
  { code: 'SEC-AWARE', name: 'Security Awareness', category: 'CERTIFICATION', validityMonths: 12 },
  { code: 'BA-DEG', name: 'Bachelor Degree', category: 'EDUCATION', validityMonths: null },
  { code: 'ENG-PROF', name: 'English Proficiency', category: 'LANGUAGE', validityMonths: 36 },
];

async function seed(): Promise<void> {
  await dataSource.initialize();
  const rankRepo = dataSource.getRepository(Rank);
  const unitRepo = dataSource.getRepository(Unit);
  const qualRepo = dataSource.getRepository(Qualification);

  for (const r of DEFAULT_RANKS) {
    const exists = await rankRepo.findOne({ where: { code: r.code } });
    if (!exists) {
      await rankRepo.save(rankRepo.create({ ...r, category: r.category as RankCategory }));
      console.log(`Created rank: ${r.code}`);
    }
  }

  const unitMap = new Map<string, string>();
  for (const u of DEFAULT_UNITS) {
    const exists = await unitRepo.findOne({ where: { code: u.code } });
    if (!exists) {
      const parentId = u.parentCode ? unitMap.get(u.parentCode) ?? null : null;
      const saved = await unitRepo.save(unitRepo.create({
        code: u.code,
        name: u.name,
        unitType: u.unitType as UnitType,
        parentUnitId: parentId,
      }));
      unitMap.set(u.code, saved.id);
      console.log(`Created unit: ${u.code}`);
    } else {
      unitMap.set(u.code, exists.id);
    }
  }

  for (const q of DEFAULT_QUALIFICATIONS) {
    const exists = await qualRepo.findOne({ where: { code: q.code } });
    if (!exists) {
      await qualRepo.save(qualRepo.create({ ...q, category: q.category as QualificationCategory }));
      console.log(`Created qualification: ${q.code}`);
    }
  }

  const personnelRepo = dataSource.getRepository(PersonnelRecord);

  for (const demo of DEMO_USERS) {
    const existing = await personnelRepo.findOne({ where: { userId: demo.id } });
    if (!existing) {
      await personnelRepo.save(
        personnelRepo.create({
          userId: demo.id,
          serviceNumber: demo.serviceNumber,
          employeeNumber: demo.employeeNumber,
          firstName: demo.firstName,
          lastName: demo.lastName,
          email: demo.email,
          personnelType: PersonnelType.OFFICER,
          serviceStatus: ServiceStatus.ACTIVE,
          branch: ServiceBranch.ARMY,
          enlistmentDate: '2015-06-01',
          yearsOfService: 10,
          securityClearance: 'SECRET',
        }),
      );
      console.log(`Created personnel record: ${demo.serviceNumber}`);
    }
  }

  const extraIds = [
    'b0000001-0001-4001-8001-000000000001',
    'b0000002-0002-4002-8002-000000000002',
    'b0000003-0003-4003-8003-000000000003',
    'b0000004-0004-4004-8004-000000000004',
    'b0000005-0005-4005-8005-000000000005',
  ];

  for (let i = 0; i < EXTRA_PERSONNEL.length; i++) {
    const p = EXTRA_PERSONNEL[i];
    const userId = extraIds[i];
    const existing = await personnelRepo.findOne({ where: { serviceNumber: p.serviceNumber } });
    if (!existing) {
      await personnelRepo.save(
        personnelRepo.create({
          userId,
          serviceNumber: p.serviceNumber,
          firstName: p.firstName,
          lastName: p.lastName,
          email: p.email,
          personnelType: PersonnelType.ENLISTED,
          serviceStatus: ServiceStatus.ACTIVE,
          branch: ServiceBranch.ARMY,
          enlistmentDate: '2018-03-15',
          yearsOfService: 7,
        }),
      );
      console.log(`Created personnel record: ${p.serviceNumber}`);
    }
  }

  await dataSource.destroy();
  console.log('Personnel service seed complete');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});

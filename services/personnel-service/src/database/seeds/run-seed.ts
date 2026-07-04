import dataSource from '../data-source';
import { Rank } from '../entities/rank.entity';
import { Unit } from '../entities/unit.entity';
import { Qualification } from '../entities/qualification.entity';
import { DEFAULT_RANKS, DEFAULT_UNITS } from '../../common/constants';
import { RankCategory, UnitType, QualificationCategory } from '../../common/enums';

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

  await dataSource.destroy();
  console.log('Personnel service seed complete');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});

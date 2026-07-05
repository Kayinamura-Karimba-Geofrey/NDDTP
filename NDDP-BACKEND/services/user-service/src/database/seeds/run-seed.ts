import dataSource from '../data-source';
import { Department } from '../entities/department.entity';
import { DepartmentType, DepartmentStatus } from '../../common/enums';

const SEED_DEPARTMENTS = [
  { code: 'HQ', name: 'Headquarters', type: DepartmentType.HEADQUARTERS },
  { code: 'HR', name: 'Human Resources', type: DepartmentType.DEPARTMENT },
  { code: 'FIN', name: 'Finance', type: DepartmentType.DEPARTMENT },
  { code: 'OPS', name: 'Operations', type: DepartmentType.COMMAND },
  { code: 'LOG', name: 'Logistics', type: DepartmentType.DEPARTMENT },
  { code: 'IT', name: 'Information Technology', type: DepartmentType.DEPARTMENT },
  { code: 'REC', name: 'Recruitment', type: DepartmentType.SECTION },
];

async function seed(): Promise<void> {
  await dataSource.initialize();
  const repo = dataSource.getRepository(Department);

  for (const d of SEED_DEPARTMENTS) {
    const existing = await repo.findOne({ where: { code: d.code } });
    if (!existing) {
      await repo.save(repo.create({ ...d, status: DepartmentStatus.ACTIVE }));
      console.log(`Created department: ${d.code}`);
    }
  }

  console.log('Seed completed');
  await dataSource.destroy();
}

seed().catch((e) => { console.error(e); process.exit(1); });

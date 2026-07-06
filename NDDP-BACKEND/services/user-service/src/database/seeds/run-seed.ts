import dataSource from '../data-source';
import { Department } from '../entities/department.entity';
import { User } from '../entities/user.entity';
import { DepartmentType, DepartmentStatus, UserStatus, Gender } from '../../common/enums';
import { DEMO_USERS } from '../../../../../shared-seeds/demo-users';

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
  const deptRepo = dataSource.getRepository(Department);
  const userRepo = dataSource.getRepository(User);

  const deptMap = new Map<string, string>();

  for (const d of SEED_DEPARTMENTS) {
    let dept = await deptRepo.findOne({ where: { code: d.code } });
    if (!dept) {
      dept = await deptRepo.save(deptRepo.create({ ...d, status: DepartmentStatus.ACTIVE }));
      console.log(`Created department: ${d.code}`);
    }
    deptMap.set(d.code, dept.id);
  }

  for (const demo of DEMO_USERS) {
    const existing = await userRepo.findOne({ where: { id: demo.id } });
    const departmentId = deptMap.get(demo.departmentCode) ?? null;

    if (!existing) {
      await userRepo.save(
        userRepo.create({
          id: demo.id,
          employeeNumber: demo.employeeNumber,
          firstName: demo.firstName,
          lastName: demo.lastName,
          email: demo.email.toLowerCase(),
          rank: demo.rank,
          jobTitle: demo.jobTitle,
          departmentId,
          status: UserStatus.ACTIVE,
          gender: demo.firstName === 'Alice' ? Gender.FEMALE : Gender.MALE,
          nationality: 'Rwandan',
          hireDate: '2020-01-15',
          hasCredentials: true,
          credentialsRegisteredAt: new Date(),
        }),
      );
      console.log(`Created user: ${demo.email}`);
    } else {
      await userRepo.update(demo.id, {
        hasCredentials: true,
        credentialsRegisteredAt: new Date(),
        status: UserStatus.ACTIVE,
        departmentId,
      });
      console.log(`Updated user: ${demo.email}`);
    }
  }

  console.log('User service seed complete');
  await dataSource.destroy();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});

import dataSource from '../data-source';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { RolePermission } from '../entities/role-permission.entity';
import { UserRoleAssignment } from '../entities/user-role-assignment.entity';
import { SYSTEM_ROLES, SYSTEM_PERMISSIONS } from '../../common/constants';
import { RoleStatus, PermissionStatus, AssignmentStatus, ScopeType } from '../../common/enums';
import { DEMO_USERS } from '../../../../../shared-seeds/demo-users';

async function seed(): Promise<void> {
  await dataSource.initialize();
  const roleRepo = dataSource.getRepository(Role);
  const permRepo = dataSource.getRepository(Permission);
  const rpRepo = dataSource.getRepository(RolePermission);

  const permissionMap = new Map<string, Permission>();

  for (const sp of SYSTEM_PERMISSIONS) {
    let perm = await permRepo.findOne({ where: { code: sp.code } });
    if (!perm) {
      perm = await permRepo.save(permRepo.create({
        ...sp,
        isSystem: true,
        status: PermissionStatus.ACTIVE,
      }));
      console.log(`Created permission: ${sp.code}`);
    }
    permissionMap.set(sp.code, perm);
  }

  const roleMap = new Map<string, Role>();

  for (const sr of SYSTEM_ROLES) {
    let role = await roleRepo.findOne({ where: { code: sr.code } });
    if (!role) {
      role = await roleRepo.save(roleRepo.create({
        ...sr,
        status: RoleStatus.ACTIVE,
        priority: sr.code === 'SUPER_ADMIN' ? 1000 : sr.code === 'ADMIN' ? 900 : 0,
      }));
      console.log(`Created role: ${sr.code}`);
    }
    roleMap.set(sr.code, role);
  }

  const superAdmin = roleMap.get('SUPER_ADMIN')!;
  const platformAdmin = roleMap.get('PLATFORM_ADMIN')!;
  const deptManager = roleMap.get('DEPARTMENT_MANAGER')!;
  const recruiter = roleMap.get('RECRUITMENT_OFFICER')!;
  const employee = roleMap.get('EMPLOYEE')!;
  const auditor = roleMap.get('AUDITOR')!;

  const grantAll = async (role: Role) => {
    for (const perm of permissionMap.values()) {
      const exists = await rpRepo.findOne({ where: { roleId: role.id, permissionId: perm.id } });
      if (!exists) await rpRepo.save(rpRepo.create({ roleId: role.id, permissionId: perm.id }));
    }
  };

  if (superAdmin) await grantAll(superAdmin);

  const grantPerms = async (role: Role | undefined, perms: string[]) => {
    if (!role) return;
    for (const code of perms) {
      const perm = permissionMap.get(code);
      if (perm) {
        const exists = await rpRepo.findOne({ where: { roleId: role.id, permissionId: perm.id } });
        if (!exists) await rpRepo.save(rpRepo.create({ roleId: role.id, permissionId: perm.id }));
      }
    }
  };

  const platformAdminPerms = [
    'authorization:manage:roles', 'authorization:manage:permissions', 'authorization:assign:roles',
    'system:manage:tenants', 'system:manage:users', 'system:manage:settings', 'system:read:logs'
  ];
  await grantPerms(platformAdmin, platformAdminPerms);

  const deptManagerPerms = [
    'personnel:read:records', 'personnel:create:records', 'personnel:update:records',
    'personnel:approve:workflows', 'leave:read:requests', 'leave:approve:requests',
    'leave:create:requests'
  ];
  await grantPerms(deptManager, deptManagerPerms);

  const recruiterPerms = ['recruitment:read:applications', 'recruitment:manage:applications', 'recruitment:manage:vacancies'];
  await grantPerms(recruiter, recruiterPerms);

  const employeePerms = ['personnel:read:own', 'personnel:update:own', 'leave:create:requests', 'leave:read:requests'];
  await grantPerms(employee, employeePerms);

  const auditorPerms = ['audit:read:logs', 'authorization:read:audit', 'compliance:read:reports', 'reports:read:dashboards'];
  await grantPerms(auditor, auditorPerms);

  const assignmentRepo = dataSource.getRepository(UserRoleAssignment);
  const adminUserId = DEMO_USERS[0].id;

  for (const demo of DEMO_USERS) {
    const role = roleMap.get(demo.roleCode);
    if (!role) continue;

    const existing = await assignmentRepo.findOne({
      where: { userId: demo.id, roleId: role.id, scopeType: ScopeType.GLOBAL },
    });

    if (!existing) {
      await assignmentRepo.save(
        assignmentRepo.create({
          userId: demo.id,
          roleId: role.id,
          scopeType: ScopeType.GLOBAL,
          status: AssignmentStatus.ACTIVE,
          assignedBy: adminUserId,
        }),
      );
      console.log(`Assigned role ${demo.roleCode} to ${demo.email}`);
    }
  }

  console.log('Seed completed successfully');
  await dataSource.destroy();
}

seed().catch((e) => {
  console.error('Seed failed:', e);
  process.exit(1);
});

import dataSource from '../data-source';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { RolePermission } from '../entities/role-permission.entity';
import { SYSTEM_ROLES, SYSTEM_PERMISSIONS } from '../../common/constants';
import { RoleStatus, PermissionStatus } from '../../common/enums';

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
  const admin = roleMap.get('ADMIN')!;
  const hrManager = roleMap.get('HR_MANAGER')!;
  const recruiter = roleMap.get('RECRUITER')!;
  const employee = roleMap.get('EMPLOYEE')!;
  const auditor = roleMap.get('AUDITOR')!;

  const grantAll = async (role: Role) => {
    for (const perm of permissionMap.values()) {
      const exists = await rpRepo.findOne({ where: { roleId: role.id, permissionId: perm.id } });
      if (!exists) await rpRepo.save(rpRepo.create({ roleId: role.id, permissionId: perm.id }));
    }
  };

  await grantAll(superAdmin);

  const adminPerms = [
    'authorization:manage:roles', 'authorization:manage:permissions', 'authorization:assign:roles',
    'personnel:read:profile', 'personnel:write:profile', 'leave:read:requests', 'leave:approve:requests',
    'recruitment:read:applications', 'recruitment:manage:applications',
  ];
  for (const code of adminPerms) {
    const perm = permissionMap.get(code);
    if (perm) {
      const exists = await rpRepo.findOne({ where: { roleId: admin.id, permissionId: perm.id } });
      if (!exists) await rpRepo.save(rpRepo.create({ roleId: admin.id, permissionId: perm.id }));
    }
  }

  const hrPerms = ['personnel:read:profile', 'personnel:write:profile', 'leave:read:requests', 'leave:approve:requests'];
  for (const code of hrPerms) {
    const perm = permissionMap.get(code);
    if (perm) {
      const exists = await rpRepo.findOne({ where: { roleId: hrManager.id, permissionId: perm.id } });
      if (!exists) await rpRepo.save(rpRepo.create({ roleId: hrManager.id, permissionId: perm.id }));
    }
  }

  const recruiterPerms = ['recruitment:read:applications', 'recruitment:manage:applications'];
  for (const code of recruiterPerms) {
    const perm = permissionMap.get(code);
    if (perm) {
      const exists = await rpRepo.findOne({ where: { roleId: recruiter.id, permissionId: perm.id } });
      if (!exists) await rpRepo.save(rpRepo.create({ roleId: recruiter.id, permissionId: perm.id }));
    }
  }

  const employeePerms = ['personnel:read:profile', 'leave:read:requests'];
  for (const code of employeePerms) {
    const perm = permissionMap.get(code);
    if (perm) {
      const exists = await rpRepo.findOne({ where: { roleId: employee.id, permissionId: perm.id } });
      if (!exists) await rpRepo.save(rpRepo.create({ roleId: employee.id, permissionId: perm.id }));
    }
  }

  const auditorPerms = ['audit:read:logs', 'authorization:read:audit'];
  for (const code of auditorPerms) {
    const perm = permissionMap.get(code);
    if (perm) {
      const exists = await rpRepo.findOne({ where: { roleId: auditor.id, permissionId: perm.id } });
      if (!exists) await rpRepo.save(rpRepo.create({ roleId: auditor.id, permissionId: perm.id }));
    }
  }

  console.log('Seed completed successfully');
  await dataSource.destroy();
}

seed().catch((e) => {
  console.error('Seed failed:', e);
  process.exit(1);
});

export const CACHE_KEYS = {
  USER_PERMISSIONS: (userId: string) => `authz:user:${userId}:permissions`,
  USER_ROLES: (userId: string) => `authz:user:${userId}:roles`,
  ROLE: (roleId: string) => `authz:role:${roleId}`,
  ROLE_PERMISSIONS: (roleId: string) => `authz:role:${roleId}:permissions`,
  PERMISSION: (code: string) => `authz:permission:${code}`,
} as const;

export const RABBITMQ_ROUTING_KEYS = {
  ROLE_CREATED: 'authorization.role.created',
  ROLE_UPDATED: 'authorization.role.updated',
  ROLE_DELETED: 'authorization.role.deleted',
  PERMISSION_CREATED: 'authorization.permission.created',
  PERMISSION_UPDATED: 'authorization.permission.updated',
  PERMISSION_DELETED: 'authorization.permission.deleted',
  ROLE_ASSIGNED: 'authorization.role.assigned',
  ROLE_REVOKED: 'authorization.role.revoked',
  PERMISSION_GRANTED: 'authorization.permission.granted',
  PERMISSION_REVOKED: 'authorization.permission.revoked',
  ACCESS_DENIED: 'authorization.access.denied',
  ACCESS_GRANTED: 'authorization.access.granted',
} as const;

export const RABBITMQ_QUEUES = {
  AUTH_EVENTS: 'authorization-service.auth.events',
  AUTH_EVENTS_DLQ: 'authorization-service.auth.events.dlq',
} as const;

export const SYSTEM_PERMISSIONS = [
  { code: 'authorization:manage:roles', name: 'Manage Roles', module: 'authorization', action: 'manage', resource: 'roles' },
  { code: 'authorization:manage:permissions', name: 'Manage Permissions', module: 'authorization', action: 'manage', resource: 'permissions' },
  { code: 'authorization:assign:roles', name: 'Assign Roles', module: 'authorization', action: 'assign', resource: 'roles' },
  { code: 'authorization:read:audit', name: 'Read Authorization Audit', module: 'authorization', action: 'read', resource: 'audit' },
  { code: 'personnel:read:profile', name: 'Read Personnel Profile', module: 'personnel', action: 'read', resource: 'profile' },
  { code: 'personnel:write:profile', name: 'Write Personnel Profile', module: 'personnel', action: 'write', resource: 'profile' },
  { code: 'leave:read:requests', name: 'Read Leave Requests', module: 'leave', action: 'read', resource: 'requests' },
  { code: 'leave:approve:requests', name: 'Approve Leave Requests', module: 'leave', action: 'approve', resource: 'requests' },
  { code: 'recruitment:read:applications', name: 'Read Recruitment Applications', module: 'recruitment', action: 'read', resource: 'applications' },
  { code: 'recruitment:manage:applications', name: 'Manage Recruitment Applications', module: 'recruitment', action: 'manage', resource: 'applications' },
  { code: 'finance:read:reports', name: 'Read Finance Reports', module: 'finance', action: 'read', resource: 'reports' },
  { code: 'audit:read:logs', name: 'Read Audit Logs', module: 'audit', action: 'read', resource: 'logs' },
] as const;

export const SYSTEM_ROLES = [
  { code: 'SUPER_ADMIN', name: 'Super Administrator', description: 'Full platform access', isSystem: true },
  { code: 'ADMIN', name: 'Administrator', description: 'Platform administration', isSystem: true },
  { code: 'HR_MANAGER', name: 'HR Manager', description: 'Human resources management', isSystem: true },
  { code: 'RECRUITER', name: 'Recruiter', description: 'Recruitment operations', isSystem: true },
  { code: 'EMPLOYEE', name: 'Employee', description: 'Standard employee access', isSystem: true },
  { code: 'AUDITOR', name: 'Auditor', description: 'Read-only audit access', isSystem: true },
] as const;

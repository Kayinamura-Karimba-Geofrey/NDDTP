export enum RoleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DEPRECATED = 'DEPRECATED',
}

export enum PermissionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DEPRECATED = 'DEPRECATED',
}

export enum AssignmentStatus {
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED',
  EXPIRED = 'EXPIRED',
}

export enum ScopeType {
  GLOBAL = 'GLOBAL',
  ORGANIZATION = 'ORGANIZATION',
  DEPARTMENT = 'DEPARTMENT',
  UNIT = 'UNIT',
}

export enum AuthorizationDecision {
  ALLOW = 'ALLOW',
  DENY = 'DENY',
}

export enum AuthzEventType {
  ROLE_CREATED = 'authorization.role.created',
  ROLE_UPDATED = 'authorization.role.updated',
  ROLE_DELETED = 'authorization.role.deleted',
  PERMISSION_CREATED = 'authorization.permission.created',
  PERMISSION_UPDATED = 'authorization.permission.updated',
  PERMISSION_DELETED = 'authorization.permission.deleted',
  ROLE_ASSIGNED = 'authorization.role.assigned',
  ROLE_REVOKED = 'authorization.role.revoked',
  PERMISSION_GRANTED = 'authorization.permission.granted',
  PERMISSION_REVOKED = 'authorization.permission.revoked',
  ACCESS_DENIED = 'authorization.access.denied',
  ACCESS_GRANTED = 'authorization.access.granted',
}

export enum ConsumedEventType {
  USER_REGISTERED = 'auth.user.registered',
  USER_DELETED = 'user.user.deleted',
  USER_DEACTIVATED = 'user.user.deactivated',
}

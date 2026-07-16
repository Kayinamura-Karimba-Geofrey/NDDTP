export interface AuthorizationCheckResult {
  allowed: boolean;
  userId: string;
  permission: string;
  matchedRoles: string[];
  reason?: string;
}

export interface EffectivePermissions {
  userId: string;
  roles: string[];
  permissions: string[];
  computedAt: string;
}

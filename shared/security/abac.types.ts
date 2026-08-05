export enum SecurityClearance {
  UNCLASSIFIED = 'UNCLASSIFIED',
  RESTRICTED = 'RESTRICTED',
  CONFIDENTIAL = 'CONFIDENTIAL',
  SECRET = 'SECRET',
  TOP_SECRET = 'TOP_SECRET',
}

export const CLEARANCE_HIERARCHY: Record<SecurityClearance, number> = {
  [SecurityClearance.UNCLASSIFIED]: 1,
  [SecurityClearance.RESTRICTED]: 2,
  [SecurityClearance.CONFIDENTIAL]: 3,
  [SecurityClearance.SECRET]: 4,
  [SecurityClearance.TOP_SECRET]: 5,
};

export interface AbacSubject {
  userId: string;
  roles: string[];
  clearance: SecurityClearance;
  unitId?: string;
  departmentId?: string;
  ipAddress?: string;
}

export interface AbacResource {
  resourceType: string;
  resourceId?: string;
  requiredClearance?: SecurityClearance;
  owningUnitId?: string;
}

export interface AbacEvaluationResult {
  allowed: boolean;
  reason?: string;
  evaluatedAt: string;
}

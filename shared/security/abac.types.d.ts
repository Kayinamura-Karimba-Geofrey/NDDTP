export declare enum SecurityClearance {
    UNCLASSIFIED = "UNCLASSIFIED",
    RESTRICTED = "RESTRICTED",
    CONFIDENTIAL = "CONFIDENTIAL",
    SECRET = "SECRET",
    TOP_SECRET = "TOP_SECRET"
}
export declare const CLEARANCE_HIERARCHY: Record<SecurityClearance, number>;
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

import { Injectable, ForbiddenException } from '@nestjs/common';
import { SecurityClearance, CLEARANCE_HIERARCHY, AbacSubject, AbacResource, AbacEvaluationResult } from '../../../../../../shared/security/abac.types';

@Injectable()
export class AbacEvaluatorService {
  evaluateAccess(subject: AbacSubject, resource: AbacResource): AbacEvaluationResult {
    // 1. Super admin bypass
    if (subject.roles.includes('SUPER_ADMIN') || subject.roles.includes('SECURITY_ADMIN')) {
      return { allowed: true, evaluatedAt: new Date().toISOString(), reason: 'Administrative override' };
    }

    // 2. Security Clearance Check
    const requiredClearance = resource.requiredClearance || SecurityClearance.UNCLASSIFIED;
    const subjectClearance = subject.clearance || SecurityClearance.UNCLASSIFIED;

    const userLevel = CLEARANCE_HIERARCHY[subjectClearance] || 1;
    const requiredLevel = CLEARANCE_HIERARCHY[requiredClearance] || 1;

    if (userLevel < requiredLevel) {
      return {
        allowed: false,
        evaluatedAt: new Date().toISOString(),
        reason: `Insufficient security clearance. User level '${subjectClearance}' is below required level '${requiredClearance}'.`,
      };
    }

    // 3. Compartmentalization (Unit boundary)
    if (resource.owningUnitId && subject.unitId && resource.owningUnitId !== subject.unitId) {
      // Allow if executive leadership
      if (!subject.roles.includes('EXECUTIVE_LEADERSHIP')) {
        return {
          allowed: false,
          evaluatedAt: new Date().toISOString(),
          reason: `Access restricted. Unit mismatch: subject unit ${subject.unitId} does not match resource unit ${resource.owningUnitId}`,
        };
      }
    }

    return { allowed: true, evaluatedAt: new Date().toISOString() };
  }

  enforceAccess(subject: AbacSubject, resource: AbacResource): void {
    const result = this.evaluateAccess(subject, resource);
    if (!result.allowed) {
      throw new ForbiddenException(result.reason || 'Access denied by ABAC Policy');
    }
  }
}

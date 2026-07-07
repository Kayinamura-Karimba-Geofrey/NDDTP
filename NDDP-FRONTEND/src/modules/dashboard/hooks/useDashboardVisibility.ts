import { usePermissions } from '@/hooks/usePermissions';
import type { DashboardDomain } from '@/constants/executive-dashboard';
import type { UserRole } from '@/types';

const DOMAIN_ROLES: Partial<Record<DashboardDomain, UserRole[]>> = {
  personnel: ['SUPER_ADMIN', 'ADMIN', 'HR_MANAGER'],
  assets: ['SUPER_ADMIN', 'ADMIN', 'LOGISTICS_OFFICER'],
  fleet: ['SUPER_ADMIN', 'ADMIN', 'LOGISTICS_OFFICER'],
  inventory: ['SUPER_ADMIN', 'ADMIN', 'LOGISTICS_OFFICER'],
  procurement: ['SUPER_ADMIN', 'ADMIN', 'LOGISTICS_OFFICER', 'FINANCE_OFFICER'],
  finance: ['SUPER_ADMIN', 'ADMIN', 'FINANCE_OFFICER'],
  training: ['SUPER_ADMIN', 'ADMIN', 'HR_MANAGER'],
  medical: ['SUPER_ADMIN', 'ADMIN', 'MEDICAL_OFFICER', 'HR_MANAGER'],
  workflow: ['SUPER_ADMIN', 'ADMIN', 'HR_MANAGER', 'FINANCE_OFFICER', 'LOGISTICS_OFFICER'],
  admin: ['SUPER_ADMIN', 'ADMIN'],
};

export function useDashboardVisibility() {
  const { hasRole, hasPermission, roles } = usePermissions();

  const isAdmin = hasRole(['SUPER_ADMIN', 'ADMIN']);
  const isHr = hasRole(['HR_MANAGER']) || isAdmin;
  const isFinance = hasRole(['FINANCE_OFFICER']) || isAdmin;
  const isLogistics = hasRole(['LOGISTICS_OFFICER']) || isAdmin;
  const isMedical = hasRole(['MEDICAL_OFFICER']) || isAdmin;
  const isEmployee = hasRole(['EMPLOYEE', 'VIEWER']) && !isAdmin && !isHr && !isFinance && !isLogistics;

  const canSeeDomain = (domain: DashboardDomain, permissions?: string[]): boolean => {
    if (isAdmin) return true;
    if (permissions?.length && permissions.some((p) => hasPermission(p))) return true;
    const allowedRoles = DOMAIN_ROLES[domain];
    return allowedRoles ? allowedRoles.some((r) => roles.includes(r)) : true;
  };

  return {
    isAdmin,
    isHr,
    isFinance,
    isLogistics,
    isMedical,
    isEmployee,
    canSeeDomain,
    showSystemHealth: isAdmin,
    showAuditSummary: isAdmin,
    showAiAssistant: true,
    showPendingApprovals: !isEmployee,
    showOrgOverview: !isEmployee,
    showFullKpis: !isEmployee,
  };
}

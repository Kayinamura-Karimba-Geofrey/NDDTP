export type AdminStatus = 'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'DEPRECATED' | 'HEALTHY' | 'DEGRADED';
export type EntryValueType = 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
export type EnvironmentScope = 'ALL' | 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION';

export interface ConfigNamespaceRecord {
  id: string;
  code: string;
  name: string;
  description: string;
  entryCount: number;
  status: AdminStatus;
  updatedAt: string;
}

export interface ConfigEntryRecord {
  id: string;
  namespaceId: string;
  namespaceCode: string;
  key: string;
  value: string;
  valueType: EntryValueType;
  environment: EnvironmentScope;
  description: string;
  status: AdminStatus;
  version: number;
  updatedAt: string;
}

export interface ConfigRevisionRecord {
  id: string;
  entryId: string;
  entryKey: string;
  version: number;
  previousValue: string;
  newValue: string;
  changedBy: string;
  changedAt: string;
  note: string;
}

export const ADMIN_DASHBOARD_KPIS = {
  namespaces: 6,
  activeEntries: 48,
  draftEntries: 5,
  deprecatedEntries: 3,
  revisionsThisWeek: 14,
  servicesHealthy: 34,
  servicesDegraded: 1,
  pendingActivations: 2,
};

export const ENTRIES_BY_STATUS = [
  { name: 'Active', value: 48 },
  { name: 'Draft', value: 5 },
  { name: 'Deprecated', value: 3 },
];

export const ENTRIES_BY_ENV = [
  { name: 'All', value: 28 },
  { name: 'Production', value: 12 },
  { name: 'Staging', value: 8 },
  { name: 'Development', value: 8 },
];

export const WEEKLY_REVISIONS = [
  { day: 'Mon', count: 2 },
  { day: 'Tue', count: 3 },
  { day: 'Wed', count: 1 },
  { day: 'Thu', count: 4 },
  { day: 'Fri', count: 3 },
  { day: 'Sat', count: 0 },
  { day: 'Sun', count: 1 },
];

export const MOCK_NAMESPACES: ConfigNamespaceRecord[] = [
  { id: 'NS-01', code: 'NS-PLATFORM', name: 'Platform', description: 'Core platform toggles and defaults', entryCount: 14, status: 'ACTIVE', updatedAt: '2026-07-08 09:10' },
  { id: 'NS-02', code: 'NS-SECURITY', name: 'Security', description: 'Auth session, MFA, and password policy', entryCount: 11, status: 'ACTIVE', updatedAt: '2026-07-07 16:40' },
  { id: 'NS-03', code: 'NS-NOTIFICATIONS', name: 'Notifications', description: 'Channel defaults and quiet hours', entryCount: 9, status: 'ACTIVE', updatedAt: '2026-07-07 14:20' },
  { id: 'NS-04', code: 'NS-WORKFLOW', name: 'Workflow', description: 'BPM defaults and escalation timers', entryCount: 8, status: 'ACTIVE', updatedAt: '2026-07-06 11:05' },
  { id: 'NS-05', code: 'NS-INTEGRATION', name: 'Integrations', description: 'External connector endpoints', entryCount: 7, status: 'ACTIVE', updatedAt: '2026-07-05 08:55' },
  { id: 'NS-06', code: 'NS-LEGACY', name: 'Legacy', description: 'Deprecated keys pending removal', entryCount: 3, status: 'INACTIVE', updatedAt: '2026-06-01 12:00' },
];

export const MOCK_ENTRIES: ConfigEntryRecord[] = [
  { id: 'CE-01', namespaceId: 'NS-01', namespaceCode: 'NS-PLATFORM', key: 'app.default_landing', value: '/dashboard', valueType: 'STRING', environment: 'ALL', description: 'Default post-login landing page', status: 'ACTIVE', version: 3, updatedAt: '2026-07-08 09:10' },
  { id: 'CE-02', namespaceId: 'NS-01', namespaceCode: 'NS-PLATFORM', key: 'app.maintenance_mode', value: 'false', valueType: 'BOOLEAN', environment: 'PRODUCTION', description: 'Global maintenance banner', status: 'ACTIVE', version: 5, updatedAt: '2026-07-07 18:00' },
  { id: 'CE-03', namespaceId: 'NS-02', namespaceCode: 'NS-SECURITY', key: 'auth.session_timeout_minutes', value: '30', valueType: 'NUMBER', environment: 'ALL', description: 'Idle session timeout', status: 'ACTIVE', version: 4, updatedAt: '2026-07-07 16:40' },
  { id: 'CE-04', namespaceId: 'NS-02', namespaceCode: 'NS-SECURITY', key: 'auth.mfa_required_roles', value: '["SUPER_ADMIN","ADMIN"]', valueType: 'JSON', environment: 'PRODUCTION', description: 'Roles requiring MFA', status: 'DRAFT', version: 1, updatedAt: '2026-07-08 08:30' },
  { id: 'CE-05', namespaceId: 'NS-03', namespaceCode: 'NS-NOTIFICATIONS', key: 'notify.quiet_hours', value: '{"start":"22:00","end":"06:00"}', valueType: 'JSON', environment: 'ALL', description: 'Default quiet hours window', status: 'ACTIVE', version: 2, updatedAt: '2026-07-07 14:20' },
  { id: 'CE-06', namespaceId: 'NS-04', namespaceCode: 'NS-WORKFLOW', key: 'workflow.escalation_hours', value: '24', valueType: 'NUMBER', environment: 'STAGING', description: 'Escalation after pending hours', status: 'DEPRECATED', version: 6, updatedAt: '2026-06-20 10:00' },
];

export const MOCK_REVISIONS: ConfigRevisionRecord[] = [
  { id: 'REV-01', entryId: 'CE-01', entryKey: 'app.default_landing', version: 3, previousValue: '/home', newValue: '/dashboard', changedBy: 'Demo Admin', changedAt: '2026-07-08 09:10', note: 'Align with new home dashboard' },
  { id: 'REV-02', entryId: 'CE-02', entryKey: 'app.maintenance_mode', version: 5, previousValue: 'true', newValue: 'false', changedBy: 'Ops Lead', changedAt: '2026-07-07 18:00', note: 'Maintenance window closed' },
  { id: 'REV-03', entryId: 'CE-03', entryKey: 'auth.session_timeout_minutes', version: 4, previousValue: '45', newValue: '30', changedBy: 'Security Officer', changedAt: '2026-07-07 16:40', note: 'Tighten idle timeout' },
  { id: 'REV-04', entryId: 'CE-05', entryKey: 'notify.quiet_hours', version: 2, previousValue: '{"start":"21:00","end":"06:00"}', newValue: '{"start":"22:00","end":"06:00"}', changedBy: 'Demo Admin', changedAt: '2026-07-07 14:20', note: 'Extend evening window' },
];

export const MOCK_HEALTH = [
  { id: 'svc-api-gateway', name: 'API Gateway', status: 'HEALTHY' as AdminStatus, latencyMs: 12, detail: 'All routes reachable' },
  { id: 'svc-configuration', name: 'Configuration', status: 'HEALTHY' as AdminStatus, latencyMs: 18, detail: 'Namespaces OK' },
  { id: 'svc-authorization', name: 'Authorization', status: 'HEALTHY' as AdminStatus, latencyMs: 22, detail: 'Permission cache warm' },
  { id: 'svc-notification', name: 'Notification', status: 'DEGRADED' as AdminStatus, latencyMs: 140, detail: 'SMS provider slow' },
  { id: 'svc-user', name: 'User', status: 'HEALTHY' as AdminStatus, latencyMs: 25, detail: 'Profile APIs OK' },
];

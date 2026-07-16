export type AuditStatus =
  | 'SUCCESS' | 'FAILURE' | 'PENDING' | 'OPEN' | 'ACKNOWLEDGED' | 'ASSIGNED'
  | 'ESCALATED' | 'RESOLVED' | 'CLOSED' | 'ACTIVE' | 'INACTIVE' | 'CRITICAL'
  | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO' | 'COMPLIANT' | 'NON_COMPLIANT' | 'WARNING';

export interface AuditLogRow {
  id: string;
  time: string;
  user: string;
  role?: string;
  service: string;
  action: string;
  resource: string;
  result: AuditStatus;
  ip?: string;
  correlationId?: string;
}

export interface UserActivityRow {
  id: string;
  time: string;
  user: string;
  activity: string;
  service: string;
  details: string;
  result: AuditStatus;
}

export interface SystemActivityRow {
  id: string;
  time: string;
  job: string;
  type: string;
  service: string;
  duration: string;
  status: AuditStatus;
}

export interface ApiActivityRow {
  id: string;
  endpoint: string;
  method: string;
  caller: string;
  responseTime: string;
  statusCode: number;
  requestCount: number;
  payloadSize: string;
}

export interface ComplianceItem {
  id: string;
  name: string;
  domain: string;
  status: AuditStatus;
  score: string;
  lastReviewed: string;
  owner: string;
}

export interface SecurityEvent {
  id: string;
  time: string;
  type: string;
  severity: AuditStatus;
  user?: string;
  source: string;
  summary: string;
  status: AuditStatus;
}

export interface ConfigChange {
  id: string;
  time: string;
  area: string;
  changedBy: string;
  before: string;
  after: string;
  approvalRef?: string;
}

export interface TraceSpan {
  id: string;
  service: string;
  operation: string;
  duration: string;
  status: AuditStatus;
}

export interface TraceRecord {
  id: string;
  correlationId: string;
  startedAt: string;
  rootOperation: string;
  totalDuration: string;
  spans: TraceSpan[];
  status: AuditStatus;
}

export interface ServiceHealth {
  id: string;
  name: string;
  availability: string;
  responseTime: string;
  cpu: string;
  memory: string;
  status: AuditStatus;
}

export interface InfraResource {
  id: string;
  name: string;
  type: string;
  health: string;
  status: AuditStatus;
  details: string;
}

export interface PerformanceMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  trend: string;
  status: AuditStatus;
}

export interface ErrorRecord {
  id: string;
  time: string;
  service: string;
  exception: string;
  severity: AuditStatus;
  correlationId: string;
  environment: string;
  status: AuditStatus;
}

export interface AlertItem {
  id: string;
  time: string;
  title: string;
  severity: AuditStatus;
  source: string;
  status: AuditStatus;
}

export interface IncidentEvent {
  id: string;
  time: string;
  event: string;
  actor?: string;
}

export interface Incident {
  id: string;
  title: string;
  startedAt: string;
  status: AuditStatus;
  severity: AuditStatus;
  timeline: IncidentEvent[];
}

export const AUDIT_DASHBOARD_KPIS = {
  auditEventsToday: 18420,
  activeUsers: 842,
  failedLogins: 37,
  criticalAlerts: 2,
  openIncidents: 1,
  systemAvailability: '99.7%',
  avgApiResponse: '142ms',
  activeServices: 28,
  errorRate: '0.18%',
  complianceStatus: '94%',
};

export const AUDIT_EVENTS_BY_SERVICE = [
  { name: 'Personnel', value: 3840 },
  { name: 'Workflow', value: 2910 },
  { name: 'Finance', value: 1840 },
  { name: 'Procurement', value: 1520 },
  { name: 'Fleet', value: 980 },
  { name: 'Medical', value: 720 },
  { name: 'Training', value: 640 },
  { name: 'Auth', value: 2970 },
];

export const LOGIN_ACTIVITY = [
  { hour: '06', success: 42, failed: 3 },
  { hour: '07', success: 118, failed: 5 },
  { hour: '08', success: 284, failed: 8 },
  { hour: '09', success: 312, failed: 6 },
  { hour: '10', success: 198, failed: 4 },
  { hour: '11', success: 156, failed: 2 },
];

export const API_PERFORMANCE = [
  { name: 'Auth', ms: 88 },
  { name: 'Personnel', ms: 142 },
  { name: 'Workflow', ms: 168 },
  { name: 'Finance', ms: 210 },
  { name: 'Reports', ms: 320 },
];

export const SECURITY_SEVERITY = [
  { name: 'Critical', value: 2 },
  { name: 'High', value: 8 },
  { name: 'Medium', value: 24 },
  { name: 'Low', value: 61 },
];

export const INFRA_HEALTH = [
  { name: 'CPU', value: 42 },
  { name: 'Memory', value: 58 },
  { name: 'Disk', value: 67 },
  { name: 'Network', value: 31 },
];

export const MOCK_AUDIT_LOGS: AuditLogRow[] = [
  { id: 'AUD-88421', time: '09:15', user: 'HR Manager', role: 'HR_MANAGER', service: 'Personnel', action: 'Updated Employee', resource: 'EMP-00451', result: 'SUCCESS', ip: '10.12.4.22', correlationId: 'corr-a1b2' },
  { id: 'AUD-88422', time: '09:18', user: 'Procurement Officer', role: 'PROCUREMENT', service: 'Procurement', action: 'Approved Purchase Order', resource: 'PO-2026-018', result: 'SUCCESS', ip: '10.12.5.11', correlationId: 'corr-c3d4' },
  { id: 'AUD-88423', time: '09:20', user: 'Finance Manager', role: 'FINANCE_MGR', service: 'Finance', action: 'Approved Payment', resource: 'PAY-00312', result: 'SUCCESS', ip: '10.12.6.08', correlationId: 'corr-e5f6' },
  { id: 'AUD-88424', time: '09:22', user: 'unknown', role: '—', service: 'Auth', action: 'Login Attempt', resource: 'SESSION', result: 'FAILURE', ip: '41.186.xx.xx', correlationId: 'corr-g7h8' },
];

export const MOCK_USER_ACTIVITY: UserActivityRow[] = [
  { id: 'UA-01', time: '09:01', user: 'admin@mod.gov.rw', activity: 'Login', service: 'Authentication', details: 'SSO session started', result: 'SUCCESS' },
  { id: 'UA-02', time: '09:05', user: 'hr.manager@mod.gov.rw', activity: 'Approval', service: 'Workflow', details: 'Leave LV-1024 approved', result: 'SUCCESS' },
  { id: 'UA-03', time: '09:12', user: 'finance@mod.gov.rw', activity: 'Report Export', service: 'Reporting', details: 'Budget Report PDF', result: 'SUCCESS' },
  { id: 'UA-04', time: '09:18', user: 'officer@mod.gov.rw', activity: 'Document Download', service: 'DMS', details: 'Policy-v3.2.pdf', result: 'SUCCESS' },
];

export const MOCK_SYSTEM_ACTIVITY: SystemActivityRow[] = [
  { id: 'SYS-01', time: '06:00', job: 'Daily Report Schedule', type: 'Scheduled Job', service: 'Reporting', duration: '42s', status: 'SUCCESS' },
  { id: 'SYS-02', time: '06:15', job: 'Notification Retry Queue', type: 'Queue Processing', service: 'Notification', duration: '8s', status: 'SUCCESS' },
  { id: 'SYS-03', time: '07:00', job: 'Backup Snapshot', type: 'Backup', service: 'Infrastructure', duration: '4m 12s', status: 'SUCCESS' },
  { id: 'SYS-04', time: '08:30', job: 'Workflow Escalation Sweep', type: 'Workflow Execution', service: 'Workflow', duration: '15s', status: 'SUCCESS' },
];

export const MOCK_API_ACTIVITY: ApiActivityRow[] = [
  { id: 'API-01', endpoint: '/api/svc/personnel/employees', method: 'GET', caller: 'Gateway', responseTime: '142ms', statusCode: 200, requestCount: 4820, payloadSize: '24 KB' },
  { id: 'API-02', endpoint: '/api/svc/workflow/tasks/me', method: 'GET', caller: 'Frontend', responseTime: '168ms', statusCode: 200, requestCount: 3120, payloadSize: '8 KB' },
  { id: 'API-03', endpoint: '/api/svc/auth/login', method: 'POST', caller: 'Frontend', responseTime: '88ms', statusCode: 200, requestCount: 940, payloadSize: '1 KB' },
  { id: 'API-04', endpoint: '/api/svc/reporting/definitions', method: 'GET', caller: 'Gateway', responseTime: '320ms', statusCode: 200, requestCount: 420, payloadSize: '56 KB' },
  { id: 'API-05', endpoint: '/api/svc/finance/payments', method: 'POST', caller: 'Workflow', responseTime: '410ms', statusCode: 500, requestCount: 12, payloadSize: '4 KB' },
];

export const MOCK_COMPLIANCE: ComplianceItem[] = [
  { id: 'CMP-01', name: 'Password Policy Compliance', domain: 'Security', status: 'COMPLIANT', score: '98%', lastReviewed: '2026-07-01', owner: 'IAM' },
  { id: 'CMP-02', name: 'MFA Adoption', domain: 'Security', status: 'WARNING', score: '87%', lastReviewed: '2026-07-05', owner: 'IAM' },
  { id: 'CMP-03', name: 'Audit Log Retention', domain: 'Audit', status: 'COMPLIANT', score: '100%', lastReviewed: '2026-07-08', owner: 'Compliance' },
  { id: 'CMP-04', name: 'Document Retention', domain: 'Records', status: 'COMPLIANT', score: '95%', lastReviewed: '2026-06-30', owner: 'DMS' },
  { id: 'CMP-05', name: 'Access Review Status', domain: 'Authorization', status: 'NON_COMPLIANT', score: '72%', lastReviewed: '2026-06-15', owner: 'IAM' },
  { id: 'CMP-06', name: 'Data Encryption Status', domain: 'Security', status: 'COMPLIANT', score: '100%', lastReviewed: '2026-07-02', owner: 'Infrastructure' },
  { id: 'CMP-07', name: 'Backup Compliance', domain: 'Infrastructure', status: 'COMPLIANT', score: '99%', lastReviewed: '2026-07-08', owner: 'Ops' },
];

export const MOCK_SECURITY_EVENTS: SecurityEvent[] = [
  { id: 'SEC-01', time: '09:22', type: 'Failed Login', severity: 'MEDIUM', user: 'unknown', source: 'Auth', summary: 'Multiple failed password attempts', status: 'OPEN' },
  { id: 'SEC-02', time: '08:40', type: 'Unauthorized Access', severity: 'HIGH', user: 'contractor@ext', source: 'API Gateway', summary: 'Denied access to audit forensic data', status: 'ACKNOWLEDGED' },
  { id: 'SEC-03', time: '07:15', type: 'Privilege Escalation', severity: 'CRITICAL', user: 'ops.dev@mod.gov.rw', source: 'Authorization', summary: 'Unexpected role assignment attempt blocked', status: 'RESOLVED' },
  { id: 'SEC-04', time: '06:50', type: 'Token Misuse', severity: 'HIGH', source: 'Auth', summary: 'Expired refresh token reuse detected', status: 'OPEN' },
];

export const MOCK_CONFIG_CHANGES: ConfigChange[] = [
  { id: 'CFG-01', time: '2026-07-07 16:10', area: 'KPI Thresholds', changedBy: 'sysadmin', before: 'Budget red < 85%', after: 'Budget red < 80%', approvalRef: 'CHG-204' },
  { id: 'CFG-02', time: '2026-07-06 11:20', area: 'SMTP Configuration', changedBy: 'comms.admin', before: 'smtp.old.mod.gov.rw', after: 'smtp.mod.gov.rw', approvalRef: 'CHG-198' },
  { id: 'CFG-03', time: '2026-07-05 09:00', area: 'Role Permissions', changedBy: 'iam.admin', before: 'HR_OFFICER: leave:read', after: 'HR_OFFICER: leave:read, leave:approve', approvalRef: 'CHG-191' },
];

export const MOCK_TRACES: TraceRecord[] = [
  {
    id: 'TR-01',
    correlationId: 'corr-login-9f21',
    startedAt: '09:01:12',
    rootOperation: 'User Login',
    totalDuration: '312ms',
    status: 'SUCCESS',
    spans: [
      { id: 's1', service: 'Authentication', operation: 'Validate credentials', duration: '88ms', status: 'SUCCESS' },
      { id: 's2', service: 'Authorization', operation: 'Load permissions', duration: '64ms', status: 'SUCCESS' },
      { id: 's3', service: 'Personnel', operation: 'Fetch profile', duration: '92ms', status: 'SUCCESS' },
      { id: 's4', service: 'Notification', operation: 'Login alert (optional)', duration: '40ms', status: 'SUCCESS' },
    ],
  },
  {
    id: 'TR-02',
    correlationId: 'corr-leave-a3c1',
    startedAt: '09:05:44',
    rootOperation: 'Leave Approval',
    totalDuration: '428ms',
    status: 'SUCCESS',
    spans: [
      { id: 's1', service: 'Workflow', operation: 'Approve task', duration: '120ms', status: 'SUCCESS' },
      { id: 's2', service: 'Personnel', operation: 'Update leave status', duration: '150ms', status: 'SUCCESS' },
      { id: 's3', service: 'Notification', operation: 'Send approval email', duration: '110ms', status: 'SUCCESS' },
      { id: 's4', service: 'Audit', operation: 'Write audit event', duration: '28ms', status: 'SUCCESS' },
    ],
  },
];

export const MOCK_SERVICE_HEALTH: ServiceHealth[] = [
  { id: 'H-01', name: 'API Gateway', availability: '99.9%', responseTime: '42ms', cpu: '38%', memory: '52%', status: 'ACTIVE' },
  { id: 'H-02', name: 'Auth Service', availability: '99.8%', responseTime: '88ms', cpu: '41%', memory: '48%', status: 'ACTIVE' },
  { id: 'H-03', name: 'Personnel Service', availability: '99.7%', responseTime: '142ms', cpu: '55%', memory: '61%', status: 'ACTIVE' },
  { id: 'H-04', name: 'Workflow Service', availability: '99.6%', responseTime: '168ms', cpu: '62%', memory: '58%', status: 'WARNING' },
  { id: 'H-05', name: 'Reporting Service', availability: '99.5%', responseTime: '320ms', cpu: '48%', memory: '70%', status: 'ACTIVE' },
];

export const MOCK_INFRA: InfraResource[] = [
  { id: 'INF-01', name: 'api-gateway', type: 'Docker Container', health: 'Healthy', status: 'ACTIVE', details: 'Up 14d' },
  { id: 'INF-02', name: 'postgres-primary', type: 'Database', health: 'Healthy', status: 'ACTIVE', details: 'Conn 42/100' },
  { id: 'INF-03', name: 'redis-cache', type: 'Redis', health: 'Healthy', status: 'ACTIVE', details: 'Hit ratio 92%' },
  { id: 'INF-04', name: 'rabbitmq', type: 'Message Broker', health: 'Healthy', status: 'ACTIVE', details: 'Queues 18' },
  { id: 'INF-05', name: 'minio-storage', type: 'Object Storage', health: 'Healthy', status: 'ACTIVE', details: 'Used 42%' },
];

export const MOCK_PERFORMANCE: PerformanceMetric[] = [
  { id: 'PM-01', name: 'Requests per Second', value: '1,240', unit: 'rps', trend: '↑', status: 'ACTIVE' },
  { id: 'PM-02', name: 'Average Response Time', value: '142', unit: 'ms', trend: '↓', status: 'ACTIVE' },
  { id: 'PM-03', name: 'Slow Queries', value: '3', unit: 'count', trend: '→', status: 'WARNING' },
  { id: 'PM-04', name: 'Queue Processing Time', value: '1.8', unit: 's', trend: '↓', status: 'ACTIVE' },
  { id: 'PM-05', name: 'Cache Hit Ratio', value: '92', unit: '%', trend: '↑', status: 'ACTIVE' },
  { id: 'PM-06', name: 'Background Job Duration', value: '42', unit: 's', trend: '→', status: 'ACTIVE' },
];

export const MOCK_ERRORS: ErrorRecord[] = [
  { id: 'ERR-884', time: '09:18', service: 'Finance', exception: 'TimeoutException', severity: 'HIGH', correlationId: 'corr-pay-11', environment: 'prod', status: 'OPEN' },
  { id: 'ERR-883', time: '08:55', service: 'Reporting', exception: 'QueryTimeout', severity: 'MEDIUM', correlationId: 'corr-rpt-09', environment: 'prod', status: 'ACKNOWLEDGED' },
  { id: 'ERR-882', time: '08:12', service: 'Notification', exception: 'SmtpConnectionError', severity: 'MEDIUM', correlationId: 'corr-ntf-03', environment: 'prod', status: 'RESOLVED' },
];

export const MOCK_ALERTS: AlertItem[] = [
  { id: 'ALT-01', time: '09:18', title: 'Elevated payment API errors', severity: 'HIGH', source: 'Finance', status: 'OPEN' },
  { id: 'ALT-02', time: '08:33', title: 'Database latency spike', severity: 'CRITICAL', source: 'Infrastructure', status: 'RESOLVED' },
  { id: 'ALT-03', time: '07:40', title: 'Queue depth threshold exceeded', severity: 'MEDIUM', source: 'Notification', status: 'ACKNOWLEDGED' },
  { id: 'ALT-04', time: '06:20', title: 'Suspicious login activity', severity: 'HIGH', source: 'Auth', status: 'ASSIGNED' },
];

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'INC-2026-014',
    title: 'Database Latency Incident',
    startedAt: '2026-07-08 08:30',
    status: 'CLOSED',
    severity: 'CRITICAL',
    timeline: [
      { id: 'e1', time: '08:30', event: 'Database Latency Detected' },
      { id: 'e2', time: '08:33', event: 'Alert Generated' },
      { id: 'e3', time: '08:36', event: 'Investigation Started', actor: 'ops.oncall' },
      { id: 'e4', time: '08:45', event: 'Root Cause Identified', actor: 'dba.lead' },
      { id: 'e5', time: '09:10', event: 'Resolved', actor: 'ops.oncall' },
      { id: 'e6', time: '09:20', event: 'Incident Closed', actor: 'sre.lead' },
    ],
  },
];

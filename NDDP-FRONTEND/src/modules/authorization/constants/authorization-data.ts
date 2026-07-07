export interface AuthRole {
  id: string;
  code: string;
  name: string;
  description: string | null;
  parentRoleId: string | null;
  parentRoleName?: string | null;
  departmentScope?: string;
  status: 'ACTIVE' | 'DISABLED';
  userCount: number;
  isSystem: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface AuthPermission {
  id: string;
  code: string;
  name: string;
  description: string | null;
  module: string;
  action: string;
  resource: string;
  permissionType: 'READ' | 'WRITE' | 'DELETE' | 'APPROVE' | 'EXPORT' | 'ADMIN';
  status: 'ACTIVE' | 'DISABLED';
  createdAt: string;
  groupId?: string;
}

export interface PermissionGroup {
  id: string;
  name: string;
  description: string;
  permissionCount: number;
  assignedRoleCount: number;
}

export interface RoleAssignment {
  id: string;
  userId: string;
  employeeName: string;
  department: string;
  roleCode: string;
  roleName: string;
  status: string;
  assignedBy: string;
  assignedAt: string;
  expiresAt: string | null;
}

export interface AccessRequest {
  id: string;
  requester: string;
  department: string;
  requestedRole: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approver: string | null;
  decisionDate: string | null;
  createdAt: string;
}

export interface TemporaryAccess {
  id: string;
  user: string;
  permission: string;
  startDate: string;
  endDate: string;
  autoRevoke: boolean;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
}

export interface DelegatedAccess {
  id: string;
  delegator: string;
  delegate: string;
  startDate: string;
  endDate: string;
  reason: string;
  permissions: string[];
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
}

export interface AccessPolicy {
  id: string;
  name: string;
  description: string;
  rule: string;
  status: 'ACTIVE' | 'DRAFT' | 'DISABLED';
  module: string;
  updatedAt: string;
}

export interface PermissionAuditEntry {
  id: string;
  date: string;
  user: string;
  action: string;
  module: string;
  oldValue: string;
  newValue: string;
  performedBy: string;
  ipAddress: string;
}

export interface ApprovalLevel {
  id: string;
  workflow: string;
  levels: { name: string; role: string; timeLimitHours: number }[];
  escalationRule: string;
}

export interface AuthActivity {
  id: string;
  action: string;
  module: string;
  user: string;
  timestamp: string;
}

export const AUTH_DASHBOARD_KPIS = {
  totalRoles: 24,
  totalPermissions: 186,
  activeUsersWithRoles: 412,
  pendingAccessRequests: 7,
  temporaryAccess: 3,
  policyViolations: 2,
  recentlyModifiedRoles: 5,
  recentlyCreatedPermissions: 12,
};

export const ROLE_DISTRIBUTION = [
  { name: 'System Administrators', value: 4 },
  { name: 'HR Officers', value: 28 },
  { name: 'Procurement Officers', value: 18 },
  { name: 'Finance Officers', value: 22 },
  { name: 'Logistics Officers', value: 34 },
  { name: 'Other Roles', value: 48 },
];

export const PERMISSION_USAGE = [
  { name: 'personnel:read:records', count: 156 },
  { name: 'leave:approve:requests', count: 89 },
  { name: 'reporting:read:definitions', count: 72 },
  { name: 'asset:read:assets', count: 65 },
  { name: 'finance:read:budgets', count: 48 },
];

export const ACCESS_REQUEST_TRENDS = [
  { month: 'Jan', pending: 12, approved: 45, rejected: 8 },
  { month: 'Feb', pending: 9, approved: 52, rejected: 6 },
  { month: 'Mar', pending: 14, approved: 48, rejected: 11 },
  { month: 'Apr', pending: 7, approved: 61, rejected: 5 },
  { month: 'May', pending: 11, approved: 55, rejected: 9 },
  { month: 'Jun', pending: 7, approved: 58, rejected: 4 },
];

export const AUTH_RECENT_ACTIVITY: AuthActivity[] = [
  { id: '1', action: 'New role created', module: 'Roles', user: 'Jean Mukamana', timestamp: '2026-07-07T14:30:00Z' },
  { id: '2', action: 'Permission updated', module: 'Permissions', user: 'Jean Mukamana', timestamp: '2026-07-07T13:15:00Z' },
  { id: '3', action: 'User assigned to role', module: 'Assignments', user: 'System', timestamp: '2026-07-07T11:00:00Z' },
  { id: '4', action: 'Access request approved', module: 'Access Requests', user: 'Jean Mukamana', timestamp: '2026-07-06T16:45:00Z' },
  { id: '5', action: 'Role removed', module: 'Roles', user: 'Alice Uwase', timestamp: '2026-07-06T10:20:00Z' },
];

export const MOCK_ROLES: AuthRole[] = [
  { id: 'r1', code: 'SUPER_ADMIN', name: 'System Administrator', description: 'Full platform access', parentRoleId: null, status: 'ACTIVE', userCount: 4, isSystem: true, createdBy: 'System', createdAt: '2025-01-01T00:00:00Z', updatedAt: '2026-06-01T00:00:00Z', departmentScope: 'All' },
  { id: 'r2', code: 'HR_ADMIN', name: 'Human Resources Administrator', description: 'HR module administration', parentRoleId: 'r1', parentRoleName: 'System Administrator', status: 'ACTIVE', userCount: 6, isSystem: false, createdBy: 'Jean Mukamana', createdAt: '2025-03-15T00:00:00Z', updatedAt: '2026-07-01T00:00:00Z', departmentScope: 'HR' },
  { id: 'r3', code: 'HR_OFFICER', name: 'Human Resources Officer', description: 'Personnel and leave management', parentRoleId: 'r2', parentRoleName: 'HR Administrator', status: 'ACTIVE', userCount: 28, isSystem: false, createdBy: 'Jean Mukamana', createdAt: '2025-03-15T00:00:00Z', updatedAt: '2026-05-20T00:00:00Z', departmentScope: 'HR' },
  { id: 'r4', code: 'FINANCE_OFFICER', name: 'Finance Officer', description: 'Budget and expenditure management', parentRoleId: 'r1', parentRoleName: 'System Administrator', status: 'ACTIVE', userCount: 22, isSystem: false, createdBy: 'Jean Mukamana', createdAt: '2025-04-01T00:00:00Z', updatedAt: '2026-06-15T00:00:00Z', departmentScope: 'Finance' },
  { id: 'r5', code: 'LOGISTICS_OFFICER', name: 'Logistics Officer', description: 'Inventory and fleet management', parentRoleId: 'r1', parentRoleName: 'System Administrator', status: 'ACTIVE', userCount: 34, isSystem: false, createdBy: 'Jean Mukamana', createdAt: '2025-04-01T00:00:00Z', updatedAt: '2026-06-10T00:00:00Z', departmentScope: 'Logistics' },
  { id: 'r6', code: 'PROCUREMENT_OFFICER', name: 'Procurement Officer', description: 'Procurement and supplier management', parentRoleId: 'r1', parentRoleName: 'System Administrator', status: 'ACTIVE', userCount: 18, isSystem: false, createdBy: 'Jean Mukamana', createdAt: '2025-05-01T00:00:00Z', updatedAt: '2026-07-05T00:00:00Z', departmentScope: 'Procurement' },
  { id: 'r7', code: 'REPORTING_ANALYST', name: 'Reporting Analyst', description: 'Reports and analytics access', parentRoleId: null, status: 'DISABLED', userCount: 0, isSystem: false, createdBy: 'Alice Uwase', createdAt: '2025-08-01T00:00:00Z', updatedAt: '2026-03-01T00:00:00Z', departmentScope: 'All' },
];

export const ROLE_HIERARCHY = [
  { id: 'r1', name: 'System Administrator', children: [
    { id: 'r2', name: 'Human Resource Director', children: [
      { id: 'r2a', name: 'HR Manager', children: [{ id: 'r3', name: 'HR Officer', children: [] }] },
    ]},
    { id: 'r4d', name: 'Finance Director', children: [
      { id: 'r4a', name: 'Finance Manager', children: [{ id: 'r4', name: 'Finance Officer', children: [] }] },
    ]},
    { id: 'r5d', name: 'Logistics Director', children: [{ id: 'r5', name: 'Logistics Officer', children: [] }] },
    { id: 'r6d', name: 'Procurement Director', children: [{ id: 'r6', name: 'Procurement Officer', children: [] }] },
  ]},
];

export const MOCK_PERMISSIONS: AuthPermission[] = [
  { id: 'p1', code: 'personnel:create:records', name: 'PERSONNEL_CREATE', description: 'Create personnel records', module: 'personnel', action: 'create', resource: 'records', permissionType: 'WRITE', status: 'ACTIVE', createdAt: '2025-01-01T00:00:00Z', groupId: 'g1' },
  { id: 'p2', code: 'personnel:update:records', name: 'PERSONNEL_UPDATE', description: 'Update personnel records', module: 'personnel', action: 'update', resource: 'records', permissionType: 'WRITE', status: 'ACTIVE', createdAt: '2025-01-01T00:00:00Z', groupId: 'g1' },
  { id: 'p3', code: 'personnel:delete:records', name: 'PERSONNEL_DELETE', description: 'Delete personnel records', module: 'personnel', action: 'delete', resource: 'records', permissionType: 'DELETE', status: 'ACTIVE', createdAt: '2025-01-01T00:00:00Z', groupId: 'g1' },
  { id: 'p4', code: 'personnel:read:records', name: 'PERSONNEL_VIEW', description: 'View personnel records', module: 'personnel', action: 'read', resource: 'records', permissionType: 'READ', status: 'ACTIVE', createdAt: '2025-01-01T00:00:00Z', groupId: 'g1' },
  { id: 'p5', code: 'leave:approve:requests', name: 'LEAVE_APPROVE', description: 'Approve leave requests', module: 'leave', action: 'approve', resource: 'requests', permissionType: 'APPROVE', status: 'ACTIVE', createdAt: '2025-01-01T00:00:00Z', groupId: 'g1' },
  { id: 'p6', code: 'leave:reject:requests', name: 'LEAVE_REJECT', description: 'Reject leave requests', module: 'leave', action: 'reject', resource: 'requests', permissionType: 'APPROVE', status: 'ACTIVE', createdAt: '2025-01-01T00:00:00Z', groupId: 'g1' },
  { id: 'p7', code: 'asset:assign:assets', name: 'ASSET_ASSIGN', description: 'Assign assets', module: 'asset', action: 'assign', resource: 'assets', permissionType: 'WRITE', status: 'ACTIVE', createdAt: '2025-01-01T00:00:00Z', groupId: 'g4' },
  { id: 'p8', code: 'reporting:export:definitions', name: 'REPORT_EXPORT', description: 'Export reports', module: 'reporting', action: 'export', resource: 'definitions', permissionType: 'EXPORT', status: 'ACTIVE', createdAt: '2025-01-01T00:00:00Z', groupId: 'g7' },
  { id: 'p9', code: 'users:create:profile', name: 'USER_CREATE', description: 'Create users', module: 'users', action: 'create', resource: 'profile', permissionType: 'WRITE', status: 'ACTIVE', createdAt: '2025-01-01T00:00:00Z', groupId: 'g10' },
  { id: 'p10', code: 'users:delete:profile', name: 'USER_DELETE', description: 'Delete users', module: 'users', action: 'delete', resource: 'profile', permissionType: 'DELETE', status: 'ACTIVE', createdAt: '2025-01-01T00:00:00Z', groupId: 'g10' },
];

export const PERMISSION_GROUPS: PermissionGroup[] = [
  { id: 'g1', name: 'Personnel', description: 'Personnel and leave management', permissionCount: 24, assignedRoleCount: 8 },
  { id: 'g2', name: 'Recruitment', description: 'Recruitment workflows', permissionCount: 12, assignedRoleCount: 4 },
  { id: 'g3', name: 'Inventory', description: 'Inventory management', permissionCount: 18, assignedRoleCount: 6 },
  { id: 'g4', name: 'Assets', description: 'Asset lifecycle', permissionCount: 16, assignedRoleCount: 5 },
  { id: 'g5', name: 'Finance', description: 'Budget and expenditure', permissionCount: 22, assignedRoleCount: 7 },
  { id: 'g6', name: 'Training', description: 'Training and certification', permissionCount: 14, assignedRoleCount: 5 },
  { id: 'g7', name: 'Reports', description: 'Reporting and exports', permissionCount: 10, assignedRoleCount: 9 },
  { id: 'g8', name: 'Analytics', description: 'Business intelligence', permissionCount: 8, assignedRoleCount: 4 },
  { id: 'g9', name: 'Notifications', description: 'Notification management', permissionCount: 6, assignedRoleCount: 3 },
  { id: 'g10', name: 'Administration', description: 'System administration', permissionCount: 32, assignedRoleCount: 2 },
];

export const MOCK_ASSIGNMENTS: RoleAssignment[] = [
  { id: 'a1', userId: 'u1', employeeName: 'Patrick Habimana', department: 'Corporate Services', roleCode: 'HR_OFFICER', roleName: 'Human Resources Officer', status: 'ACTIVE', assignedBy: 'Jean Mukamana', assignedAt: '2025-06-01T00:00:00Z', expiresAt: null },
  { id: 'a2', userId: 'u2', employeeName: 'Marie Uwase', department: 'Finance', roleCode: 'FINANCE_OFFICER', roleName: 'Finance Officer', status: 'ACTIVE', assignedBy: 'Jean Mukamana', assignedAt: '2025-07-15T00:00:00Z', expiresAt: null },
  { id: 'a3', userId: 'u3', employeeName: 'Eric Niyonsenga', department: 'Logistics', roleCode: 'LOGISTICS_OFFICER', roleName: 'Logistics Officer', status: 'ACTIVE', assignedBy: 'Alice Uwase', assignedAt: '2026-01-10T00:00:00Z', expiresAt: '2026-12-31T00:00:00Z' },
];

export const RESOURCE_MATRIX_RESOURCES = ['Personnel Records', 'Inventory Records', 'Medical Records', 'Training Records', 'Reports', 'Documents', 'Assets', 'Vehicles', 'Finance Records'];
export const RESOURCE_MATRIX_ROLES = ['System Admin', 'HR Officer', 'Finance Officer', 'Logistics Officer'];
export const RESOURCE_MATRIX_ACTIONS = ['Read', 'Write', 'Update', 'Delete', 'Approve', 'Export', 'Print', 'Share'] as const;

export const MENU_TREE = [
  { id: 'm1', label: 'Dashboard', children: [] },
  { id: 'm2', label: 'Human Resources', children: [
    { id: 'm2a', label: 'Personnel' }, { id: 'm2b', label: 'Leave' }, { id: 'm2c', label: 'Recruitment' }, { id: 'm2d', label: 'Training' },
  ]},
  { id: 'm3', label: 'Resource Management', children: [
    { id: 'm3a', label: 'Assets' }, { id: 'm3b', label: 'Inventory' }, { id: 'm3c', label: 'Fleet' },
  ]},
  { id: 'm4', label: 'Finance', children: [] },
  { id: 'm5', label: 'Reports', children: [] },
];

export const ACTION_MATRIX_ACTIONS = ['Create', 'Edit', 'Delete', 'Export', 'Approve'] as const;
export const ACTION_MATRIX_PAGES = [
  { page: 'Personnel', roles: { 'System Admin': [true, true, true, true, true], 'HR Officer': [true, true, false, false, false], 'Finance Officer': [false, false, false, false, false] } },
  { page: 'Leave Requests', roles: { 'System Admin': [true, true, true, true, true], 'HR Officer': [true, true, false, true, true], 'Finance Officer': [false, false, false, false, false] } },
  { page: 'Procurement', roles: { 'System Admin': [true, true, true, true, true], 'HR Officer': [false, false, false, false, false], 'Finance Officer': [true, true, false, true, true] } },
];

export const APPROVAL_LEVELS: ApprovalLevel[] = [
  { id: 'al1', workflow: 'Leave Request', levels: [
    { name: 'Employee', role: 'Employee', timeLimitHours: 0 },
    { name: 'Supervisor', role: 'Department Manager', timeLimitHours: 48 },
    { name: 'Department Head', role: 'Department Head', timeLimitHours: 72 },
    { name: 'HR', role: 'HR Officer', timeLimitHours: 48 },
    { name: 'Approved', role: 'System', timeLimitHours: 0 },
  ], escalationRule: 'Escalate to next level after time limit' },
  { id: 'al2', workflow: 'Procurement Request', levels: [
    { name: 'Requester', role: 'Officer', timeLimitHours: 0 },
    { name: 'Department Head', role: 'Department Head', timeLimitHours: 72 },
    { name: 'Finance Review', role: 'Finance Officer', timeLimitHours: 96 },
    { name: 'Approved', role: 'System', timeLimitHours: 0 },
  ], escalationRule: 'Notify procurement director on escalation' },
];

export const MOCK_DELEGATIONS: DelegatedAccess[] = [
  { id: 'd1', delegator: 'Marie Uwase', delegate: 'Eric Niyonsenga', startDate: '2026-07-10T00:00:00Z', endDate: '2026-07-24T00:00:00Z', reason: 'Annual leave', permissions: ['finance:approve:budgets', 'finance:read:expenditures'], status: 'ACTIVE' },
];

export const MOCK_POLICIES: AccessPolicy[] = [
  { id: 'pol1', name: 'Finance Data Restriction', description: 'Finance records accessible only by Finance roles', rule: 'module == "finance" AND role IN ("FINANCE_OFFICER", "FINANCE_ADMIN", "SUPER_ADMIN")', status: 'ACTIVE', module: 'finance', updatedAt: '2026-06-01T00:00:00Z' },
  { id: 'pol2', name: 'Medical Records Protection', description: 'Medical records restricted to authorized medical personnel', rule: 'module == "medical" AND role IN ("MEDICAL_OFFICER", "HR_ADMIN", "SUPER_ADMIN")', status: 'ACTIVE', module: 'medical', updatedAt: '2026-05-15T00:00:00Z' },
  { id: 'pol3', name: 'Asset Disposal Approval', description: 'Asset disposal requires multiple approvals', rule: 'action == "dispose" AND approvals >= 2', status: 'ACTIVE', module: 'asset', updatedAt: '2026-04-20T00:00:00Z' },
  { id: 'pol4', name: 'Report Export Control', description: 'Reports may be exported only by designated roles', rule: 'action == "export" AND role IN ("REPORTING_ANALYST", "SUPER_ADMIN", "DEPARTMENT_MANAGER")', status: 'ACTIVE', module: 'reporting', updatedAt: '2026-07-01T00:00:00Z' },
];

export const MOCK_ACCESS_REQUESTS: AccessRequest[] = [
  { id: 'AR-2026-0042', requester: 'Patrick Habimana', department: 'Corporate Services', requestedRole: 'HR Manager', reason: 'Acting HR Manager during leave', status: 'PENDING', approver: null, decisionDate: null, createdAt: '2026-07-07T08:00:00Z' },
  { id: 'AR-2026-0041', requester: 'Eric Niyonsenga', department: 'Logistics', requestedRole: 'Procurement Officer', reason: 'Cross-training project', status: 'APPROVED', approver: 'Jean Mukamana', decisionDate: '2026-07-06T14:00:00Z', createdAt: '2026-07-05T10:00:00Z' },
  { id: 'AR-2026-0040', requester: 'Alice Uwase', department: 'Digitalization', requestedRole: 'Security Administrator', reason: 'Security audit support', status: 'REJECTED', approver: 'Jean Mukamana', decisionDate: '2026-07-04T16:00:00Z', createdAt: '2026-07-03T09:00:00Z' },
];

export const MOCK_TEMPORARY_ACCESS: TemporaryAccess[] = [
  { id: 'ta1', user: 'Eric Niyonsenga', permission: 'audit:read:logs', startDate: '2026-07-01T00:00:00Z', endDate: '2026-07-31T00:00:00Z', autoRevoke: true, status: 'ACTIVE' },
  { id: 'ta2', user: 'Marie Uwase', permission: 'procurement:approve:requisitions', startDate: '2026-06-15T00:00:00Z', endDate: '2026-06-30T00:00:00Z', autoRevoke: true, status: 'EXPIRED' },
];

export const MOCK_AUDIT_LOG: PermissionAuditEntry[] = [
  { id: 'aud1', date: '2026-07-07T14:30:00Z', user: 'Patrick Habimana', action: 'Role Assigned', module: 'Assignments', oldValue: '—', newValue: 'HR_OFFICER', performedBy: 'Jean Mukamana', ipAddress: '196.250.12.45' },
  { id: 'aud2', date: '2026-07-07T13:15:00Z', user: 'System', action: 'Permission Created', module: 'Permissions', oldValue: '—', newValue: 'inventory:export:items', performedBy: 'Jean Mukamana', ipAddress: '196.250.12.45' },
  { id: 'aud3', date: '2026-07-06T16:45:00Z', user: 'Eric Niyonsenga', action: 'Access Request Approved', module: 'Access Requests', oldValue: 'PENDING', newValue: 'APPROVED', performedBy: 'Jean Mukamana', ipAddress: '196.250.12.89' },
  { id: 'aud4', date: '2026-07-06T10:20:00Z', user: 'Reporting Analyst', action: 'Role Disabled', module: 'Roles', oldValue: 'ACTIVE', newValue: 'DISABLED', performedBy: 'Alice Uwase', ipAddress: '41.242.18.22' },
];

export const AUTH_SETTINGS_DEFAULTS = {
  defaultRole: 'EMPLOYEE',
  sessionTimeoutMinutes: 30,
  permissionInheritance: true,
  delegationMaxDays: 30,
  approvalThreshold: 2,
  auditRetentionDays: 365,
};

export const RECOMMENDED_ROLES = [
  'System Administrator', 'Security Administrator', 'Human Resources Administrator',
  'Human Resources Officer', 'Recruitment Officer', 'Training Coordinator', 'Medical Officer',
  'Welfare Officer', 'Inventory Officer', 'Asset Manager', 'Logistics Officer', 'Fleet Manager',
  'Procurement Officer', 'Finance Officer', 'Facilities Manager', 'Reporting Analyst',
  'Internal Auditor', 'Department Manager', 'Executive Viewer',
];

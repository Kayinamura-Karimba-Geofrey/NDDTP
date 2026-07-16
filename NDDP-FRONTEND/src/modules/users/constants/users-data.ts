import { SHARED_DEPARTMENTS } from '@/constants/shared-departments';

export type UserLifecycleStatus = 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'SUSPENDED' | 'ARCHIVED' | 'RETIRED' | 'TERMINATED';

export interface PlatformUser {
  id: string;
  employeeNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  preferredName?: string;
  email: string;
  phone?: string;
  profilePhotoUrl?: string;
  department: string;
  departmentId?: string;
  position: string;
  employmentStatus: string;
  employmentType: string;
  status: UserLifecycleStatus;
  roles: string[];
  lastLogin?: string;
  createdAt: string;
  division?: string;
  unit?: string;
  supervisor?: string;
  workLocation?: string;
  mfaEnabled?: boolean;
  accountLocked?: boolean;
  activeSessions?: number;
  missingProfile?: boolean;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  manager: string;
  userCount: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Position {
  id: string;
  title: string;
  department: string;
  status: 'ACTIVE' | 'DISABLED';
  userCount: number;
}

export interface UserDocument {
  id: string;
  userId: string;
  userName: string;
  name: string;
  type: string;
  uploadedAt: string;
  expiresAt?: string;
  version: number;
}

export interface UserHistoryEntry {
  id: string;
  user: string;
  action: string;
  module: string;
  oldValue: string;
  newValue: string;
  performedBy: string;
  timestamp: string;
}

export interface UserActivity {
  id: string;
  action: string;
  user: string;
  timestamp: string;
}

export const USER_DASHBOARD_KPIS = {
  totalUsers: 428,
  activeUsers: 386,
  inactiveUsers: 24,
  suspendedUsers: 8,
  pendingActivation: 6,
  recentlyCreated: 12,
  lockedAccounts: 3,
  usersWithoutRoles: 5,
  missingProfile: 14,
};

export const USERS_BY_DEPARTMENT = [
  { name: 'Human Resources', value: 68 },
  { name: 'Finance', value: 52 },
  { name: 'Procurement', value: 38 },
  { name: 'Logistics', value: 74 },
  { name: 'Medical', value: 41 },
  { name: 'Training', value: 35 },
  { name: 'Administration', value: 48 },
];

export const USERS_BY_STATUS = [
  { name: 'Active', value: 386 },
  { name: 'Suspended', value: 8 },
  { name: 'Pending', value: 6 },
  { name: 'Archived', value: 28 },
];

export const MONTHLY_USER_GROWTH = [
  { month: 'Jan', users: 380 }, { month: 'Feb', users: 392 }, { month: 'Mar', users: 401 },
  { month: 'Apr', users: 408 }, { month: 'May', users: 415 }, { month: 'Jun', users: 428 },
];

export const USER_RECENT_ACTIVITY: UserActivity[] = [
  { id: '1', action: 'User created', user: 'Eric Niyonsenga', timestamp: '2026-07-07T10:00:00Z' },
  { id: '2', action: 'Department changed', user: 'Marie Uwase', timestamp: '2026-07-07T09:30:00Z' },
  { id: '3', action: 'Position updated', user: 'Patrick Habimana', timestamp: '2026-07-06T16:00:00Z' },
  { id: '4', action: 'Profile updated', user: 'Alice Uwase', timestamp: '2026-07-06T14:20:00Z' },
  { id: '5', action: 'User deactivated', user: 'Former Employee', timestamp: '2026-07-05T11:00:00Z' },
];

export const MOCK_USERS: PlatformUser[] = [
  { id: 'u1', employeeNumber: 'MOD-00001', firstName: 'Jean', lastName: 'Mukamana', email: 'admin@mod.gov.rw', phone: '+250 788 100 001', department: 'Administration', position: 'System Administrator', employmentStatus: 'Active', employmentType: 'Permanent', status: 'ACTIVE', roles: ['SUPER_ADMIN'], lastLogin: '2026-07-07T06:30:00Z', createdAt: '2025-01-01T00:00:00Z', mfaEnabled: true, accountLocked: false, activeSessions: 2 },
  { id: 'u2', employeeNumber: 'MOD-00452', firstName: 'Patrick', lastName: 'Habimana', email: 'officer@mod.gov.rw', phone: '+250 788 200 002', department: 'Human Resources', position: 'Personnel Officer', employmentStatus: 'Active', employmentType: 'Permanent', status: 'ACTIVE', roles: ['HR_MANAGER'], lastLogin: '2026-07-06T14:20:00Z', createdAt: '2025-03-15T00:00:00Z', division: 'Corporate Services', supervisor: 'Jean Mukamana', mfaEnabled: false, activeSessions: 1 },
  { id: 'u3', employeeNumber: 'MOD-00218', firstName: 'Alice', lastName: 'Uwase', email: 'alice@mod.gov.rw', phone: '+250 788 300 003', department: 'Digitalization', position: 'Digital Transformation Officer', employmentStatus: 'Active', employmentType: 'Permanent', status: 'ACTIVE', roles: ['ADMIN'], lastLogin: '2026-07-05T09:00:00Z', createdAt: '2025-04-01T00:00:00Z', mfaEnabled: true, activeSessions: 1 },
  { id: 'u4', employeeNumber: 'MOD-00891', firstName: 'Marie', lastName: 'Uwase', email: 'marie@mod.gov.rw', department: 'Finance', position: 'Finance Officer', employmentStatus: 'Active', employmentType: 'Permanent', status: 'ACTIVE', roles: ['FINANCE_OFFICER'], lastLogin: '2026-07-07T08:10:00Z', createdAt: '2025-06-01T00:00:00Z' },
  { id: 'u5', employeeNumber: 'MOD-01204', firstName: 'Eric', lastName: 'Niyonsenga', email: 'eric@mod.gov.rw', department: 'Logistics', position: 'Logistics Officer', employmentStatus: 'Probation', employmentType: 'Contract', status: 'PENDING', roles: [], lastLogin: undefined, createdAt: '2026-07-01T00:00:00Z', missingProfile: true },
  { id: 'u6', employeeNumber: 'MOD-00330', firstName: 'Former', lastName: 'Employee', email: 'former@mod.gov.rw', department: 'Training', position: 'Training Coordinator', employmentStatus: 'Terminated', employmentType: 'Permanent', status: 'SUSPENDED', roles: ['EMPLOYEE'], createdAt: '2024-08-01T00:00:00Z', accountLocked: true },
];

export const MOCK_DEPARTMENTS: Department[] = SHARED_DEPARTMENTS.map((d) => ({
  id: d.id,
  name: d.name,
  code: d.code,
  manager: d.manager,
  userCount: d.userCount,
  status: d.status,
}));

export const MOCK_POSITIONS: Position[] = [
  { id: 'pos1', title: 'Human Resources Officer', department: 'Human Resources', status: 'ACTIVE', userCount: 28 },
  { id: 'pos2', title: 'Procurement Officer', department: 'Procurement', status: 'ACTIVE', userCount: 18 },
  { id: 'pos3', title: 'Finance Officer', department: 'Finance', status: 'ACTIVE', userCount: 22 },
  { id: 'pos4', title: 'Inventory Officer', department: 'Logistics', status: 'ACTIVE', userCount: 15 },
  { id: 'pos5', title: 'Medical Officer', department: 'Medical', status: 'ACTIVE', userCount: 12 },
  { id: 'pos6', title: 'Logistics Officer', department: 'Logistics', status: 'ACTIVE', userCount: 34 },
  { id: 'pos7', title: 'Reporting Analyst', department: 'Administration', status: 'DISABLED', userCount: 0 },
];

export const ORG_TREE = [
  { id: 'o1', name: 'Ministry of Defence', children: [
    { id: 'o2', name: 'Directorate of Corporate Services', children: [
      { id: 'o3', name: 'Human Resources', children: [{ id: 'o4', name: 'Recruitment Unit' }] },
      { id: 'o5', name: 'Finance', children: [] },
    ]},
    { id: 'o6', name: 'Directorate of Logistics', children: [
      { id: 'o7', name: 'Inventory Section', children: [] },
      { id: 'o8', name: 'Fleet Unit', children: [] },
    ]},
  ]},
];

export const USER_MOCK_DOCUMENTS: UserDocument[] = [
  { id: 'doc1', userId: 'u2', userName: 'Patrick Habimana', name: 'Employment Letter.pdf', type: 'Employment Letter', uploadedAt: '2025-03-15T00:00:00Z', version: 1 },
  { id: 'doc2', userId: 'u2', userName: 'Patrick Habimana', name: 'National ID.pdf', type: 'ID Document', uploadedAt: '2025-03-15T00:00:00Z', expiresAt: '2030-12-31T00:00:00Z', version: 2 },
  { id: 'doc3', userId: 'u3', userName: 'Alice Uwase', name: 'Professional Certificate.pdf', type: 'Professional Certification', uploadedAt: '2025-06-01T00:00:00Z', expiresAt: '2026-12-31T00:00:00Z', version: 1 },
];

export const MOCK_USER_HISTORY: UserHistoryEntry[] = [
  { id: 'h1', user: 'Patrick Habimana', action: 'Department Transfer', module: 'Organization', oldValue: 'Finance', newValue: 'Human Resources', performedBy: 'Jean Mukamana', timestamp: '2026-06-01T10:00:00Z' },
  { id: 'h2', user: 'Marie Uwase', action: 'Position Change', module: 'Organization', oldValue: 'Finance Assistant', newValue: 'Finance Officer', performedBy: 'Jean Mukamana', timestamp: '2026-05-15T14:00:00Z' },
  { id: 'h3', user: 'Eric Niyonsenga', action: 'Status Change', module: 'User Status', oldValue: 'PENDING', newValue: 'ACTIVE', performedBy: 'Patrick Habimana', timestamp: '2026-07-01T09:00:00Z' },
  { id: 'h4', user: 'Patrick Habimana', action: 'Role Assigned', module: 'Authorization', oldValue: '—', newValue: 'HR_MANAGER', performedBy: 'Jean Mukamana', timestamp: '2025-06-01T00:00:00Z' },
];

export const USER_SETTINGS_DEFAULTS = {
  employeeNumberFormat: 'MOD-#####',
  defaultStatus: 'PENDING',
  requiredFields: ['employeeNumber', 'firstName', 'lastName', 'email', 'department'],
  allowedFileTypes: '.pdf,.jpg,.png,.docx',
  maxUploadSizeMb: 10,
  profilePictureRequired: true,
};

export const USER_PREFERENCE_DEFAULTS = {
  language: 'en',
  theme: 'light',
  timezone: 'Africa/Kigali',
  dateFormat: 'DD/MM/YYYY',
  emailNotifications: true,
  defaultLandingPage: '/dashboard',
};

import type { UserRole } from '@/types';

export type DashboardDomain =
  | 'personnel'
  | 'assets'
  | 'fleet'
  | 'inventory'
  | 'procurement'
  | 'finance'
  | 'training'
  | 'medical'
  | 'workflow'
  | 'admin';

export interface KpiMetric {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface KpiCategory {
  id: DashboardDomain;
  title: string;
  icon: string;
  roles?: UserRole[];
  permissions?: string[];
  metrics: KpiMetric[];
}

export interface PendingApproval {
  id: string;
  title: string;
  module: string;
  requester: string;
  submittedAt: string;
  priority: 'low' | 'normal' | 'high';
  type: string;
}

export interface DashboardTask {
  id: string;
  title: string;
  module: string;
  priority: 'low' | 'normal' | 'high';
  dueDate: string;
  progress: number;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  type: 'meeting' | 'training' | 'leave' | 'maintenance' | 'holiday';
}

export interface DashboardMessage {
  id: string;
  from: string;
  preview: string;
  time: string;
  unread: boolean;
}

export interface DashboardNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  priority: 'low' | 'normal' | 'high';
  read: boolean;
  icon: string;
}

export interface AuditEvent {
  id: string;
  action: string;
  user: string;
  module: string;
  timestamp: string;
  status: 'success' | 'warning' | 'failed';
}

export const KPI_CATEGORIES: KpiCategory[] = [
  {
    id: 'personnel',
    title: 'Personnel',
    icon: 'FiUsers',
    permissions: ['personnel:read:records', 'personnel:read:profile'],
    metrics: [
      { id: 'p1', label: 'Total Personnel', value: '24,850', change: 2.4, trend: 'up', icon: 'FiUsers' },
      { id: 'p2', label: 'Active Personnel', value: '23,120', change: 1.8, trend: 'up', icon: 'FiUserCheck' },
      { id: 'p3', label: 'On Leave', value: 412, change: -3.2, trend: 'down', icon: 'FiCalendar' },
      { id: 'p4', label: 'In Training', value: 186, trend: 'neutral', icon: 'FiBookOpen' },
      { id: 'p5', label: 'Retiring Soon', value: 34, trend: 'neutral', icon: 'FiClock' },
      { id: 'p6', label: 'New Recruits', value: 128, change: 15, trend: 'up', icon: 'FiUserPlus' },
    ],
  },
  {
    id: 'assets',
    title: 'Assets',
    icon: 'FiBox',
    permissions: ['asset:read:assets'],
    metrics: [
      { id: 'a1', label: 'Total Assets', value: '18,420', trend: 'neutral', icon: 'FiBox' },
      { id: 'a2', label: 'Assigned', value: '14,230', trend: 'neutral', icon: 'FiCheckCircle' },
      { id: 'a3', label: 'Under Maintenance', value: 287, trend: 'neutral', icon: 'FiTool' },
      { id: 'a4', label: 'Available', value: '3,903', trend: 'up', icon: 'FiPackage' },
      { id: 'a5', label: 'Near End of Life', value: 156, trend: 'down', icon: 'FiAlertTriangle' },
    ],
  },
  {
    id: 'fleet',
    title: 'Fleet',
    icon: 'FiTruck',
    permissions: ['fleet:read:vehicles'],
    metrics: [
      { id: 'f1', label: 'Total Vehicles', value: 842, trend: 'neutral', icon: 'FiTruck' },
      { id: 'f2', label: 'Operational', value: 798, change: 1.2, trend: 'up', icon: 'FiCheck' },
      { id: 'f3', label: 'In Maintenance', value: 32, trend: 'neutral', icon: 'FiTool' },
      { id: 'f4', label: 'Due for Service', value: 18, trend: 'down', icon: 'FiClock' },
      { id: 'f5', label: 'Fuel Usage (M RWF)', value: '12.4', trend: 'neutral', icon: 'FiDroplet' },
    ],
  },
  {
    id: 'inventory',
    title: 'Inventory',
    icon: 'FiArchive',
    permissions: ['inventory:read:items'],
    metrics: [
      { id: 'i1', label: 'Total Items', value: '156K', change: 1.2, trend: 'up', icon: 'FiArchive' },
      { id: 'i2', label: 'Low Stock', value: 234, change: 8, trend: 'up', icon: 'FiTrendingDown' },
      { id: 'i3', label: 'Out of Stock', value: 12, change: -25, trend: 'down', icon: 'FiXCircle' },
      { id: 'i4', label: 'Pending Requests', value: 67, trend: 'neutral', icon: 'FiClock' },
      { id: 'i5', label: 'Warehouse Utilization', value: '72%', trend: 'neutral', icon: 'FiPieChart' },
    ],
  },
  {
    id: 'procurement',
    title: 'Procurement',
    icon: 'FiShoppingCart',
    permissions: ['procurement:read:requisitions'],
    metrics: [
      { id: 'pr1', label: 'Pending Requests', value: 47, change: 12, trend: 'up', icon: 'FiClock' },
      { id: 'pr2', label: 'Approved', value: 128, trend: 'neutral', icon: 'FiCheckCircle' },
      { id: 'pr3', label: 'Contracts in Progress', value: 23, trend: 'neutral', icon: 'FiFileText' },
      { id: 'pr4', label: 'Suppliers', value: 186, trend: 'neutral', icon: 'FiBriefcase' },
      { id: 'pr5', label: 'Open POs', value: 54, trend: 'neutral', icon: 'FiShoppingBag' },
    ],
  },
  {
    id: 'finance',
    title: 'Finance',
    icon: 'FiDollarSign',
    permissions: ['finance:read:budgets'],
    metrics: [
      { id: 'fn1', label: 'Budget Allocation', value: 'RWF 48B', trend: 'neutral', icon: 'FiDollarSign' },
      { id: 'fn2', label: 'Budget Used', value: '68%', change: 3.1, trend: 'up', icon: 'FiTrendingUp' },
      { id: 'fn3', label: 'Remaining', value: 'RWF 15.4B', trend: 'neutral', icon: 'FiCreditCard' },
      { id: 'fn4', label: 'Monthly Expenditure', value: 'RWF 3.2B', trend: 'neutral', icon: 'FiBarChart2' },
      { id: 'fn5', label: 'Pending Payments', value: 89, trend: 'neutral', icon: 'FiClock' },
    ],
  },
  {
    id: 'training',
    title: 'Training',
    icon: 'FiBookOpen',
    permissions: ['training:read:courses'],
    metrics: [
      { id: 't1', label: 'Courses Running', value: 24, trend: 'neutral', icon: 'FiBookOpen' },
      { id: 't2', label: 'Completed', value: 1_240, change: 8, trend: 'up', icon: 'FiCheckCircle' },
      { id: 't3', label: 'Upcoming', value: 18, trend: 'neutral', icon: 'FiCalendar' },
      { id: 't4', label: 'Certification Expiry', value: 45, trend: 'down', icon: 'FiAlertCircle' },
    ],
  },
  {
    id: 'medical',
    title: 'Medical',
    icon: 'FiActivity',
    permissions: ['medical:read:appointments'],
    metrics: [
      { id: 'm1', label: 'Appointments', value: 86, trend: 'neutral', icon: 'FiActivity' },
      { id: 'm2', label: 'Clearance Pending', value: 23, trend: 'neutral', icon: 'FiClock' },
      { id: 'm3', label: 'Checkups Due', value: 156, trend: 'neutral', icon: 'FiHeart' },
      { id: 'm4', label: 'Staff Available', value: 42, trend: 'neutral', icon: 'FiUserCheck' },
    ],
  },
  {
    id: 'workflow',
    title: 'Workflow',
    icon: 'FiGitBranch',
    permissions: ['workflow:read:instances'],
    metrics: [
      { id: 'w1', label: 'Pending Approvals', value: 47, change: 12, trend: 'up', icon: 'FiClock' },
      { id: 'w2', label: 'Rejected', value: 8, trend: 'down', icon: 'FiXCircle' },
      { id: 'w3', label: 'Completed', value: 1_842, change: 5, trend: 'up', icon: 'FiCheckCircle' },
      { id: 'w4', label: 'Avg Processing', value: '2.4d', trend: 'neutral', icon: 'FiTrendingDown' },
    ],
  },
];

export const PENDING_APPROVALS: PendingApproval[] = [
  { id: '1', title: 'Annual Leave — Cpt. Niyonsenga', module: 'Leave', requester: 'Cpt. Niyonsenga', submittedAt: '2026-07-07T08:00:00Z', priority: 'normal', type: 'leave' },
  { id: '2', title: 'Medical Supplies Procurement', module: 'Procurement', requester: 'Lt. Uwimana', submittedAt: '2026-07-07T07:30:00Z', priority: 'high', type: 'procurement' },
  { id: '3', title: 'Vehicle Assignment Request', module: 'Fleet', requester: 'Maj. Habimana', submittedAt: '2026-07-06T16:00:00Z', priority: 'normal', type: 'asset' },
  { id: '4', title: 'Training Course Enrollment', module: 'Training', requester: '2Lt. Mukamana', submittedAt: '2026-07-06T14:00:00Z', priority: 'low', type: 'training' },
  { id: '5', title: 'Budget Reallocation Q3', module: 'Finance', requester: 'Finance Dept', submittedAt: '2026-07-06T11:00:00Z', priority: 'high', type: 'budget' },
];

export const MY_TASKS: DashboardTask[] = [
  { id: '1', title: 'Review leave requests batch', module: 'Leave', priority: 'high', dueDate: '2026-07-07T17:00:00Z', progress: 60, status: 'in_progress' },
  { id: '2', title: 'Approve procurement requisition #PR-2026-0847', module: 'Procurement', priority: 'high', dueDate: '2026-07-08T12:00:00Z', progress: 0, status: 'pending' },
  { id: '3', title: 'Complete monthly personnel report', module: 'Reports', priority: 'normal', dueDate: '2026-07-10T17:00:00Z', progress: 30, status: 'in_progress' },
  { id: '4', title: 'Verify asset inventory count', module: 'Assets', priority: 'normal', dueDate: '2026-07-12T17:00:00Z', progress: 0, status: 'pending' },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: '1', title: 'HR Leadership Meeting', time: '09:00', type: 'meeting' },
  { id: '2', title: 'Cyber Security Training', time: '11:00', type: 'training' },
  { id: '3', title: 'Fleet Maintenance Review', time: '14:00', type: 'maintenance' },
  { id: '4', title: 'Public Holiday — Liberation Day', time: 'All day', type: 'holiday' },
];

export const DASHBOARD_MESSAGES: DashboardMessage[] = [
  { id: '1', from: 'HR Directorate', preview: 'Updated leave policy effective August 2026', time: '10:30', unread: true },
  { id: '2', from: 'Finance Office', preview: 'Q2 budget report is ready for review', time: '09:15', unread: true },
  { id: '3', from: 'System Admin', preview: 'Scheduled maintenance this weekend', time: 'Yesterday', unread: false },
];

export const DASHBOARD_NOTIFICATIONS: DashboardNotification[] = [
  { id: '1', title: 'New leave request', description: 'Cpt. Niyonsenga submitted annual leave for 5 days', timestamp: '2026-07-07T08:00:00Z', priority: 'normal', read: false, icon: 'FiCalendar' },
  { id: '2', title: 'Asset maintenance reminder', description: 'Vehicle RDF-2847 due for service in 3 days', timestamp: '2026-07-07T07:00:00Z', priority: 'high', read: false, icon: 'FiTool' },
  { id: '3', title: 'Procurement approval required', description: 'Medical supplies requisition awaiting your approval', timestamp: '2026-07-06T16:30:00Z', priority: 'high', read: false, icon: 'FiShoppingCart' },
  { id: '4', title: 'Password expiry warning', description: 'Your password expires in 14 days', timestamp: '2026-07-06T09:00:00Z', priority: 'normal', read: true, icon: 'FiLock' },
  { id: '5', title: 'Scheduled maintenance', description: 'System maintenance planned for Sunday 02:00–04:00', timestamp: '2026-07-05T14:00:00Z', priority: 'low', read: true, icon: 'FiServer' },
];

export const AUDIT_EVENTS: AuditEvent[] = [
  { id: '1', action: 'Successful login', user: 'admin@mod.gov.rw', module: 'Auth', timestamp: '2026-07-07T06:45:00Z', status: 'success' },
  { id: '2', action: 'Failed login attempt', user: 'unknown@external.com', module: 'Auth', timestamp: '2026-07-07T05:12:00Z', status: 'failed' },
  { id: '3', action: 'User role updated', user: 'admin@mod.gov.rw', module: 'Authorization', timestamp: '2026-07-06T18:00:00Z', status: 'success' },
  { id: '4', action: 'Configuration changed', user: 'admin@mod.gov.rw', module: 'Settings', timestamp: '2026-07-06T15:30:00Z', status: 'warning' },
];

export const ORG_CHART_DATA = {
  personnelByDept: [
    { name: 'Operations', value: 8420 },
    { name: 'Administration', value: 5240 },
    { name: 'Logistics', value: 3180 },
    { name: 'Medical', value: 1860 },
    { name: 'Finance', value: 1240 },
    { name: 'IT', value: 910 },
  ],
  assetsByCategory: [
    { name: 'Vehicles', value: 4200 },
    { name: 'Equipment', value: 6800 },
    { name: 'IT Assets', value: 3420 },
    { name: 'Facilities', value: 2100 },
    { name: 'Other', value: 1900 },
  ],
  budgetByDept: [
    { name: 'Operations', allocated: 18, used: 12 },
    { name: 'Administration', allocated: 8, used: 5.2 },
    { name: 'Logistics', allocated: 12, used: 9.1 },
    { name: 'Medical', allocated: 6, used: 4.8 },
    { name: 'Finance', allocated: 4, used: 2.1 },
  ],
};

export const EXECUTIVE_QUICK_ACTIONS = [
  { label: 'Create Personnel', path: '/personnel/new', icon: 'FiUserPlus' },
  { label: 'Add Asset', path: '/assets', icon: 'FiBox' },
  { label: 'Submit Procurement', path: '/procurement/requisitions', icon: 'FiShoppingCart' },
  { label: 'Generate Report', path: '/reports', icon: 'FiFileText' },
  { label: 'Inventory Request', path: '/inventory', icon: 'FiArchive' },
  { label: 'Approve Workflow', path: '/workflow/my-approvals', icon: 'FiCheckCircle' },
  { label: 'Notifications', path: '/notifications', icon: 'FiBell' },
  { label: 'Calendar', path: '/calendar', icon: 'FiCalendar' },
];

export const REPORT_SHORTCUTS = [
  { label: 'Monthly Summary', path: '/reports', icon: 'FiFileText' },
  { label: 'Department Report', path: '/reports', icon: 'FiLayers' },
  { label: 'Financial Report', path: '/finance/reports', icon: 'FiDollarSign' },
  { label: 'Inventory Report', path: '/inventory', icon: 'FiArchive' },
  { label: 'Training Report', path: '/training', icon: 'FiBookOpen' },
  { label: 'Personnel Report', path: '/personnel/reports', icon: 'FiUsers' },
];

export const AI_SUGGESTIONS = [
  'How many personnel are currently on leave?',
  'Show procurement requests awaiting my approval',
  'Generate this month\'s inventory summary',
  'What is our budget utilization rate?',
  'List pending maintenance work orders',
];

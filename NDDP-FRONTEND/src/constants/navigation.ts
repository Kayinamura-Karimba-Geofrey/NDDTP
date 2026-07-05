import type { NavItem } from '@/types';

export const MAIN_NAVIGATION: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'FiGrid', module: 'dashboard' },
  {
    id: 'hr',
    label: 'Human Resources',
    path: '/personnel',
    icon: 'FiUsers',
    module: 'hr',
    children: [
      { id: 'users', label: 'User Management', path: '/users', icon: 'FiUser', module: 'users', permissions: ['users.read'] },
      { id: 'personnel', label: 'Personnel', path: '/personnel', icon: 'FiUsers', module: 'personnel', permissions: ['personnel.read'] },
      { id: 'recruitment', label: 'Recruitment', path: '/recruitment', icon: 'FiUserPlus', module: 'recruitment', permissions: ['recruitment.read'] },
      { id: 'leave', label: 'Leave', path: '/leave', icon: 'FiCalendar', module: 'leave', permissions: ['leave.read'] },
      { id: 'welfare', label: 'Welfare', path: '/welfare', icon: 'FiHeart', module: 'welfare', permissions: ['welfare.read'] },
      { id: 'medical', label: 'Medical', path: '/medical', icon: 'FiActivity', module: 'medical', permissions: ['medical.read'] },
      { id: 'training', label: 'Training', path: '/training', icon: 'FiBookOpen', module: 'training', permissions: ['training.read'] },
      { id: 'performance', label: 'Performance', path: '/performance', icon: 'FiTrendingUp', module: 'performance', permissions: ['performance.read'] },
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    path: '/assets',
    icon: 'FiPackage',
    module: 'operations',
    children: [
      { id: 'assets', label: 'Assets', path: '/assets', icon: 'FiBox', module: 'assets', permissions: ['assets.read'] },
      { id: 'inventory', label: 'Inventory', path: '/inventory', icon: 'FiArchive', module: 'inventory', permissions: ['inventory.read'] },
      { id: 'logistics', label: 'Logistics', path: '/logistics', icon: 'FiTruck', module: 'logistics', permissions: ['logistics.read'] },
      { id: 'procurement', label: 'Procurement', path: '/procurement', icon: 'FiShoppingCart', module: 'procurement', permissions: ['procurement.read'] },
      { id: 'fleet', label: 'Fleet', path: '/fleet', icon: 'FiNavigation', module: 'fleet', permissions: ['fleet.read'] },
      { id: 'maintenance', label: 'Maintenance', path: '/maintenance', icon: 'FiTool', module: 'maintenance', permissions: ['maintenance.read'] },
      { id: 'facilities', label: 'Facilities', path: '/facilities', icon: 'FiHome', module: 'facilities', permissions: ['facilities.read'] },
    ],
  },
  { id: 'finance', label: 'Finance', path: '/finance', icon: 'FiDollarSign', module: 'finance', permissions: ['finance.read'] },
  { id: 'visitors', label: 'Visitors', path: '/visitors', icon: 'FiUserCheck', module: 'visitors', permissions: ['visitors.read'] },
  { id: 'workflow', label: 'Workflow', path: '/workflow', icon: 'FiGitBranch', module: 'workflow', permissions: ['workflow.read'] },
  { id: 'calendar', label: 'Calendar', path: '/calendar', icon: 'FiCalendar', module: 'calendar', permissions: ['calendar.read'] },
  {
    id: 'insights',
    label: 'Insights',
    path: '/reports',
    icon: 'FiBarChart2',
    module: 'insights',
    children: [
      { id: 'reports', label: 'Reports', path: '/reports', icon: 'FiFileText', module: 'reports', permissions: ['reports.read'] },
      { id: 'analytics', label: 'Analytics', path: '/analytics', icon: 'FiPieChart', module: 'analytics', permissions: ['analytics.read'] },
      { id: 'bi', label: 'Business Intelligence', path: '/business-intelligence', icon: 'FiLayers', module: 'bi', permissions: ['bi.read'] },
    ],
  },
  { id: 'notifications', label: 'Notifications', path: '/notifications', icon: 'FiBell', module: 'notifications', permissions: ['notifications.read'], badge: 3 },
  { id: 'messaging', label: 'Messaging', path: '/messaging', icon: 'FiMessageSquare', module: 'messaging', permissions: ['messaging.read'] },
  { id: 'search', label: 'Search', path: '/search', icon: 'FiSearch', module: 'search', permissions: ['search.read'] },
  { id: 'ai-assistant', label: 'AI Assistant', path: '/ai-assistant', icon: 'FiCpu', module: 'ai-assistant', permissions: ['ai.read'] },
  {
    id: 'admin',
    label: 'Administration',
    path: '/administration',
    icon: 'FiSettings',
    module: 'admin',
    roles: ['SUPER_ADMIN', 'ADMIN'],
    children: [
      { id: 'settings', label: 'Settings', path: '/settings', icon: 'FiSliders', module: 'settings' },
      { id: 'administration', label: 'System Admin', path: '/administration', icon: 'FiShield', module: 'administration', roles: ['SUPER_ADMIN'] },
      { id: 'audit', label: 'Audit Logs', path: '/audit-logs', icon: 'FiClipboard', module: 'audit', permissions: ['audit.read'] },
    ],
  },
];

export const QUICK_ACTIONS = [
  { label: 'New Leave Request', path: '/leave/new', icon: 'FiCalendar' },
  { label: 'Submit Requisition', path: '/procurement/requisitions/new', icon: 'FiShoppingCart' },
  { label: 'Book Facility', path: '/facilities/bookings/new', icon: 'FiHome' },
  { label: 'Register Visitor', path: '/visitors/new', icon: 'FiUserCheck' },
  { label: 'View Reports', path: '/reports', icon: 'FiFileText' },
];

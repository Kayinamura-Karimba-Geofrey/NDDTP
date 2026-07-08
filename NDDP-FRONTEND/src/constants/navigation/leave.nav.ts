import type { NavItem } from '@/types';

export const leaveNav: NavItem = {
    id: 'leave',
    label: 'Leave Management',
    path: '/leave/dashboard',
    icon: 'FiCalendar',
    module: 'leave',
    permissions: ['leave:read:requests', 'leave:approve:requests'],
    children: [
      { id: 'leave-dashboard', label: 'Dashboard', path: '/leave/dashboard', icon: 'FiGrid', module: 'leave' },
      { id: 'leave-my', label: 'My Leave', path: '/leave/my-leave', icon: 'FiUser', module: 'leave' },
      { id: 'leave-requests', label: 'Requests', path: '/leave/requests', icon: 'FiFileText', module: 'leave' },
      { id: 'leave-calendar', label: 'Calendar', path: '/leave/calendar', icon: 'FiCalendar', module: 'leave' },
      { id: 'leave-team', label: 'Team Calendar', path: '/leave/team-calendar', icon: 'FiUsers', module: 'leave' },
      { id: 'leave-balances', label: 'Balances', path: '/leave/balances', icon: 'FiPieChart', module: 'leave' },
      { id: 'leave-types', label: 'Leave Types', path: '/leave/types', icon: 'FiLayers', module: 'leave' },
      { id: 'leave-holidays', label: 'Holidays', path: '/leave/holidays', icon: 'FiSun', module: 'leave' },
      { id: 'leave-approvals', label: 'Approvals', path: '/leave/approvals', icon: 'FiCheckCircle', module: 'leave', permissions: ['leave:approve:requests'] },
      { id: 'leave-delegation', label: 'Delegation', path: '/leave/delegation', icon: 'FiShare2', module: 'leave' },
      { id: 'leave-policies', label: 'Policies', path: '/leave/policies', icon: 'FiBook', module: 'leave' },
      { id: 'leave-history', label: 'History', path: '/leave/history', icon: 'FiClock', module: 'leave' },
      { id: 'leave-reports', label: 'Reports', path: '/leave/reports', icon: 'FiBarChart2', module: 'leave' },
      { id: 'leave-settings', label: 'Settings', path: '/leave/settings', icon: 'FiSliders', module: 'leave' },
    ],
  };

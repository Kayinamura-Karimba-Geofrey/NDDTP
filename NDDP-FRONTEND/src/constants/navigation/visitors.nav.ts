import type { NavItem } from '@/types';

export const visitorsNav: NavItem = {
    id: 'visitors',
    label: 'Visitors',
    path: '/visitors/dashboard',
    icon: 'FiUserCheck',
    module: 'visitor',
    permissions: ['visitor:read:visitors'],
    children: [
      { id: 'visitors-dashboard', label: 'Dashboard', path: '/visitors/dashboard', icon: 'FiGrid', module: 'visitor' },
      { id: 'visitors-directory', label: 'Directory', path: '/visitors/directory', icon: 'FiUsers', module: 'visitor' },
      { id: 'visitors-requests', label: 'Visit Requests', path: '/visitors/requests', icon: 'FiClipboard', module: 'visitor' },
      { id: 'visitors-pending', label: 'Pending Approvals', path: '/visitors/requests/pending', icon: 'FiClock', module: 'visitor' },
      { id: 'visitors-check-in', label: 'Check-In Desk', path: '/visitors/check-in', icon: 'FiCheckCircle', module: 'visitor' },
      { id: 'visitors-on-site', label: 'On Site', path: '/visitors/on-site', icon: 'FiActivity', module: 'visitor' },
      { id: 'visitors-sites', label: 'Sites', path: '/visitors/sites', icon: 'FiHome', module: 'visitor' },
      { id: 'visitors-blacklist', label: 'Blacklist', path: '/visitors/blacklist', icon: 'FiAlertTriangle', module: 'visitor' },
      { id: 'visitors-reports', label: 'Reports', path: '/visitors/reports', icon: 'FiFileText', module: 'visitor' },
      { id: 'visitors-settings', label: 'Settings', path: '/visitors/settings', icon: 'FiSliders', module: 'visitor' },
    ],
  };

import type { NavItem } from '@/types';

export const assetsNav: NavItem = {
    id: 'assets',
    label: 'Asset Management',
    path: '/assets/dashboard',
    icon: 'FiBox',
    module: 'assets',
    permissions: ['asset:read:assets'],
    children: [
      { id: 'assets-dashboard', label: 'Dashboard', path: '/assets/dashboard', icon: 'FiGrid', module: 'assets' },
      { id: 'assets-registry', label: 'Registry', path: '/assets/registry', icon: 'FiList', module: 'assets' },
      { id: 'assets-categories', label: 'Categories', path: '/assets/categories', icon: 'FiLayers', module: 'assets' },
      { id: 'assets-assignment', label: 'Assignment', path: '/assets/assignment', icon: 'FiUserCheck', module: 'assets' },
      { id: 'assets-maintenance', label: 'Maintenance', path: '/assets/maintenance', icon: 'FiTool', module: 'assets' },
      { id: 'assets-inspections', label: 'Inspections', path: '/assets/inspections', icon: 'FiClipboard', module: 'assets' },
      { id: 'assets-reservations', label: 'Reservations', path: '/assets/reservations', icon: 'FiCalendar', module: 'assets' },
      { id: 'assets-audit', label: 'Audit', path: '/assets/audit', icon: 'FiShield', module: 'assets' },
      { id: 'assets-reports', label: 'Reports', path: '/assets/reports', icon: 'FiBarChart2', module: 'assets' },
      { id: 'assets-settings', label: 'Settings', path: '/assets/settings', icon: 'FiSliders', module: 'assets' },
    ],
  };

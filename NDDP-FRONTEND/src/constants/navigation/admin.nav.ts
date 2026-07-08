import type { NavItem } from '@/types';

export const adminNav: NavItem = {
    id: 'admin',
    label: 'Administration',
    path: '/administration/dashboard',
    icon: 'FiServer',
    module: 'admin',
    roles: ['SUPER_ADMIN', 'ADMIN'],
    children: [
      { id: 'admin-dashboard', label: 'Dashboard', path: '/administration/dashboard', icon: 'FiGrid', module: 'administration', roles: ['SUPER_ADMIN'] },
      { id: 'admin-namespaces', label: 'Namespaces', path: '/administration/namespaces', icon: 'FiLayers', module: 'administration', roles: ['SUPER_ADMIN'] },
      { id: 'admin-entries', label: 'Entries', path: '/administration/entries', icon: 'FiList', module: 'administration', roles: ['SUPER_ADMIN'] },
      { id: 'admin-revisions', label: 'Revisions', path: '/administration/revisions', icon: 'FiGitBranch', module: 'administration', roles: ['SUPER_ADMIN'] },
      { id: 'admin-health', label: 'Health', path: '/administration/health', icon: 'FiActivity', module: 'administration', roles: ['SUPER_ADMIN'] },
      { id: 'admin-reports', label: 'Reports', path: '/administration/reports', icon: 'FiFileText', module: 'administration', roles: ['SUPER_ADMIN'] },
      { id: 'admin-settings', label: 'Settings', path: '/administration/settings', icon: 'FiSliders', module: 'administration', roles: ['SUPER_ADMIN'] },
    ],
  };

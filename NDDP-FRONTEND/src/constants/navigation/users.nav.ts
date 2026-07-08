import type { NavItem } from '@/types';

export const usersNav: NavItem = {
    id: 'users',
    label: 'User Management',
    path: '/users/dashboard',
    icon: 'FiUser',
    module: 'users',
    roles: ['SUPER_ADMIN', 'ADMIN'],
    permissions: ['personnel:read:profile'],
    children: [
      { id: 'users-dashboard', label: 'Dashboard', path: '/users/dashboard', icon: 'FiGrid', module: 'users', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'users-list', label: 'All Users', path: '/users/list', icon: 'FiUsers', module: 'users', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'users-departments', label: 'Departments', path: '/users/departments', icon: 'FiBriefcase', module: 'users', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'users-positions', label: 'Positions', path: '/users/positions', icon: 'FiAward', module: 'users', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'users-organization', label: 'Organization', path: '/users/organization', icon: 'FiGitBranch', module: 'users', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'users-status', label: 'User Status', path: '/users/status', icon: 'FiActivity', module: 'users', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'users-documents', label: 'Documents', path: '/users/documents', icon: 'FiFile', module: 'users', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'users-import', label: 'Import', path: '/users/import', icon: 'FiUpload', module: 'users', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'users-export', label: 'Export', path: '/users/export', icon: 'FiDownload', module: 'users', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'users-history', label: 'History', path: '/users/history', icon: 'FiClock', module: 'users', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { id: 'users-settings', label: 'Settings', path: '/users/settings', icon: 'FiSliders', module: 'users', roles: ['SUPER_ADMIN', 'ADMIN'] },
    ],
  };

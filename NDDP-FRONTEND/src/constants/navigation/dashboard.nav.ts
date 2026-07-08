import type { NavItem } from '@/types';

export const dashboardNav: NavItem = {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'FiGrid',
    module: 'dashboard',
    children: [
      { id: 'dashboard-home', label: 'Home Dashboard', path: '/dashboard', icon: 'FiHome', module: 'dashboard' },
      { id: 'dashboard-executive', label: 'Executive Dashboard', path: '/dashboard', icon: 'FiBarChart2', module: 'dashboard' },
      { id: 'dashboard-my', label: 'My Dashboard', path: '/dashboard', icon: 'FiUser', module: 'dashboard' },
    ],
  };

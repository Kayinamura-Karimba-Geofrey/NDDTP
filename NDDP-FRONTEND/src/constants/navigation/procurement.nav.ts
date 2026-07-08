import type { NavItem } from '@/types';

export const procurementNav: NavItem = {
    id: 'procurement',
    label: 'Procurement',
    path: '/procurement/dashboard',
    icon: 'FiShoppingCart',
    module: 'procurement',
    permissions: ['procurement:read:requisitions'],
    children: [
      { id: 'procurement-dashboard', label: 'Dashboard', path: '/procurement/dashboard', icon: 'FiGrid', module: 'procurement' },
      { id: 'procurement-requisitions', label: 'Requisitions', path: '/procurement/requisitions', icon: 'FiFileText', module: 'procurement' },
      { id: 'procurement-orders', label: 'Purchase Orders', path: '/procurement/orders', icon: 'FiShoppingBag', module: 'procurement' },
      { id: 'procurement-suppliers', label: 'Suppliers', path: '/procurement/suppliers', icon: 'FiUsers', module: 'procurement' },
      { id: 'procurement-tenders', label: 'Tenders', path: '/procurement/tenders', icon: 'FiAward', module: 'procurement' },
      { id: 'procurement-approvals', label: 'Approvals', path: '/procurement/approvals', icon: 'FiCheckCircle', module: 'procurement' },
      { id: 'procurement-calendar', label: 'Calendar', path: '/procurement/calendar', icon: 'FiCalendar', module: 'procurement' },
      { id: 'procurement-reports', label: 'Reports', path: '/procurement/reports', icon: 'FiBarChart2', module: 'procurement' },
      { id: 'procurement-settings', label: 'Settings', path: '/procurement/settings', icon: 'FiSliders', module: 'procurement' },
    ],
  };

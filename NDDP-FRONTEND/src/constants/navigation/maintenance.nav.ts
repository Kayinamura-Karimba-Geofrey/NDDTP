import type { NavItem } from '@/types';

export const maintenanceNav: NavItem = {
    id: 'maintenance',
    label: 'Maintenance',
    path: '/maintenance/dashboard',
    icon: 'FiTool',
    module: 'maintenance',
    permissions: ['maintenance:read:work-orders'],
    children: [
      { id: 'maintenance-dashboard', label: 'Dashboard', path: '/maintenance/dashboard', icon: 'FiGrid', module: 'maintenance' },
      { id: 'maintenance-work-orders', label: 'Work Orders', path: '/maintenance/work-orders', icon: 'FiClipboard', module: 'maintenance' },
      { id: 'maintenance-requests', label: 'Requests', path: '/maintenance/requests', icon: 'FiInbox', module: 'maintenance' },
      { id: 'maintenance-pending', label: 'Pending', path: '/maintenance/requests/pending', icon: 'FiClock', module: 'maintenance' },
      { id: 'maintenance-preventive', label: 'Preventive', path: '/maintenance/preventive', icon: 'FiRefreshCw', module: 'maintenance' },
      { id: 'maintenance-technicians', label: 'Technicians', path: '/maintenance/technicians', icon: 'FiUsers', module: 'maintenance' },
      { id: 'maintenance-parts', label: 'Parts', path: '/maintenance/parts', icon: 'FiBox', module: 'maintenance' },
      { id: 'maintenance-sla', label: 'SLA', path: '/maintenance/sla', icon: 'FiActivity', module: 'maintenance' },
      { id: 'maintenance-reports', label: 'Reports', path: '/maintenance/reports', icon: 'FiFileText', module: 'maintenance' },
      { id: 'maintenance-settings', label: 'Settings', path: '/maintenance/settings', icon: 'FiSliders', module: 'maintenance' },
    ],
  };

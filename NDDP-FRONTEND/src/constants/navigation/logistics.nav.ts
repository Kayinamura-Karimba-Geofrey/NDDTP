import type { NavItem } from '@/types';

export const logisticsNav: NavItem = {
    id: 'logistics',
    label: 'Logistics',
    path: '/logistics/dashboard',
    icon: 'FiTruck',
    module: 'logistics',
    permissions: ['logistics:read:shipments'],
    children: [
      { id: 'logistics-dashboard', label: 'Dashboard', path: '/logistics/dashboard', icon: 'FiGrid', module: 'logistics' },
      { id: 'logistics-shipments', label: 'Shipments', path: '/logistics/shipments', icon: 'FiPackage', module: 'logistics' },
      { id: 'logistics-mine', label: 'My Shipments', path: '/logistics/shipments/mine', icon: 'FiInbox', module: 'logistics' },
      { id: 'logistics-locations', label: 'Locations', path: '/logistics/locations', icon: 'FiMapPin', module: 'logistics' },
      { id: 'logistics-routes', label: 'Routes', path: '/logistics/routes', icon: 'FiNavigation', module: 'logistics' },
      { id: 'logistics-tracking', label: 'Tracking', path: '/logistics/tracking', icon: 'FiRadio', module: 'logistics' },
      { id: 'logistics-reports', label: 'Reports', path: '/logistics/reports', icon: 'FiFileText', module: 'logistics' },
      { id: 'logistics-settings', label: 'Settings', path: '/logistics/settings', icon: 'FiSliders', module: 'logistics' },
    ],
  };

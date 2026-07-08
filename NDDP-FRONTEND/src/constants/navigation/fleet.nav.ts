import type { NavItem } from '@/types';

export const fleetNav: NavItem = {
    id: 'fleet',
    label: 'Logistics & Fleet',
    path: '/fleet/dashboard',
    icon: 'FiTruck',
    module: 'fleet',
    permissions: ['fleet:read:vehicles'],
    children: [
      { id: 'fleet-dashboard', label: 'Dashboard', path: '/fleet/dashboard', icon: 'FiGrid', module: 'fleet' },
      { id: 'fleet-registry', label: 'Fleet Registry', path: '/fleet/registry', icon: 'FiList', module: 'fleet' },
      { id: 'fleet-drivers', label: 'Drivers', path: '/fleet/drivers', icon: 'FiUsers', module: 'fleet' },
      { id: 'fleet-assignments', label: 'Assignments', path: '/fleet/assignments', icon: 'FiUserCheck', module: 'fleet' },
      { id: 'fleet-trips', label: 'Trip Requests', path: '/fleet/trip-requests', icon: 'FiMap', module: 'fleet' },
      { id: 'fleet-dispatch', label: 'Dispatch', path: '/fleet/dispatch', icon: 'FiRadio', module: 'fleet' },
      { id: 'fleet-fuel', label: 'Fuel', path: '/fleet/fuel', icon: 'FiDroplet', module: 'fleet' },
      { id: 'fleet-maintenance', label: 'Maintenance', path: '/fleet/maintenance', icon: 'FiTool', module: 'fleet' },
      { id: 'fleet-approvals', label: 'Approvals', path: '/fleet/approvals', icon: 'FiCheckCircle', module: 'fleet' },
      { id: 'fleet-reports', label: 'Reports', path: '/fleet/reports', icon: 'FiBarChart2', module: 'fleet' },
      { id: 'fleet-settings', label: 'Settings', path: '/fleet/settings', icon: 'FiSliders', module: 'fleet' },
    ],
  };

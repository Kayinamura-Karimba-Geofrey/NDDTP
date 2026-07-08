import type { NavItem } from '@/types';

export const facilitiesNav: NavItem = {
    id: 'facilities',
    label: 'Facilities',
    path: '/facilities/dashboard',
    icon: 'FiHome',
    module: 'facilities',
    permissions: ['facilities:read:facilities'],
    children: [
      { id: 'facilities-dashboard', label: 'Dashboard', path: '/facilities/dashboard', icon: 'FiGrid', module: 'facilities' },
      { id: 'facilities-directory', label: 'Directory', path: '/facilities/directory', icon: 'FiHome', module: 'facilities' },
      { id: 'facilities-types', label: 'Types', path: '/facilities/types', icon: 'FiLayers', module: 'facilities' },
      { id: 'facilities-spaces', label: 'Spaces', path: '/facilities/spaces', icon: 'FiGrid', module: 'facilities' },
      { id: 'facilities-available', label: 'Available', path: '/facilities/spaces/available', icon: 'FiCheckCircle', module: 'facilities' },
      { id: 'facilities-bookings', label: 'Bookings', path: '/facilities/bookings', icon: 'FiCalendar', module: 'facilities' },
      { id: 'facilities-occupancy', label: 'Occupancy', path: '/facilities/occupancy', icon: 'FiUsers', module: 'facilities' },
      { id: 'facilities-utilities', label: 'Utilities', path: '/facilities/utilities', icon: 'FiZap', module: 'facilities' },
      { id: 'facilities-inspections', label: 'Inspections', path: '/facilities/inspections', icon: 'FiClipboard', module: 'facilities' },
      { id: 'facilities-access', label: 'Access', path: '/facilities/access', icon: 'FiLock', module: 'facilities' },
      { id: 'facilities-reports', label: 'Reports', path: '/facilities/reports', icon: 'FiFileText', module: 'facilities' },
      { id: 'facilities-settings', label: 'Settings', path: '/facilities/settings', icon: 'FiSliders', module: 'facilities' },
    ],
  };

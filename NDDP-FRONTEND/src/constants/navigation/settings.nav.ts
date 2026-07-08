import type { NavItem } from '@/types';

export const settingsNav: NavItem = {
    id: 'settings',
    label: 'Settings',
    path: '/settings/overview',
    icon: 'FiSettings',
    module: 'settings',
    children: [
      { id: 'settings-overview', label: 'Overview', path: '/settings/overview', icon: 'FiGrid', module: 'settings' },
      { id: 'settings-appearance', label: 'Appearance', path: '/settings/appearance', icon: 'FiSun', module: 'settings' },
      { id: 'settings-language', label: 'Language', path: '/settings/language', icon: 'FiGlobe', module: 'settings' },
      { id: 'settings-notifications', label: 'Notifications', path: '/settings/notifications', icon: 'FiBell', module: 'settings' },
      { id: 'settings-security', label: 'Security', path: '/settings/security', icon: 'FiShield', module: 'settings' },
    ],
  };

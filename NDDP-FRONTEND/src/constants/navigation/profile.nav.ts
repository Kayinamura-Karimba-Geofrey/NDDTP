import type { NavItem } from '@/types';

export const profileNav: NavItem = {
    id: 'profile',
    label: 'My Profile',
    path: '/profile',
    icon: 'FiUser',
    module: 'user',
    children: [
      { id: 'profile-overview', label: 'Overview', path: '/profile', icon: 'FiUser', module: 'user' },
      { id: 'profile-edit', label: 'Edit', path: '/profile/edit', icon: 'FiEdit3', module: 'user' },
      { id: 'profile-addresses', label: 'Addresses', path: '/profile/addresses', icon: 'FiMapPin', module: 'user' },
      { id: 'profile-emergency', label: 'Emergency', path: '/profile/emergency-contacts', icon: 'FiPhone', module: 'user' },
      { id: 'profile-preferences', label: 'Preferences', path: '/profile/preferences', icon: 'FiSliders', module: 'user' },
      { id: 'profile-activity', label: 'Activity', path: '/profile/activity', icon: 'FiActivity', module: 'user' },
    ],
  };

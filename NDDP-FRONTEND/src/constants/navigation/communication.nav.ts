import type { NavItem } from '@/types';

export const communicationNav: NavItem = {
    id: 'communication',
    label: 'Notification & Communication',
    path: '/notifications/dashboard',
    icon: 'FiMessageCircle',
    module: 'notification',
    permissions: ['notification:read:notifications'],
    children: [
      { id: 'notification-dashboard', label: 'Dashboard', path: '/notifications/dashboard', icon: 'FiGrid', module: 'notification' },
      { id: 'notification-center', label: 'Notification Center', path: '/notifications/center', icon: 'FiBell', module: 'notification', badge: 3 },
      { id: 'notification-my', label: 'My Notifications', path: '/notifications/my', icon: 'FiInbox', module: 'notification' },
      { id: 'notification-announcements', label: 'Announcements', path: '/notifications/announcements', icon: 'FiVolume2', module: 'notification' },
      { id: 'notification-broadcast', label: 'Broadcast', path: '/notifications/broadcast', icon: 'FiSend', module: 'notification' },
      { id: 'notification-templates', label: 'Templates', path: '/notifications/templates', icon: 'FiLayers', module: 'notification' },
      { id: 'notification-delivery', label: 'Delivery', path: '/notifications/delivery', icon: 'FiTruck', module: 'notification' },
      { id: 'notification-reports', label: 'Reports', path: '/notifications/reports', icon: 'FiFileText', module: 'notification' },
      { id: 'notification-settings', label: 'Settings', path: '/notifications/settings', icon: 'FiSliders', module: 'notification' },
    ],
  };

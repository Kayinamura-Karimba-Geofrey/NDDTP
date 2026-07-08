import type { NavItem } from '@/types';

export const messagingNav: NavItem = {
    id: 'messaging',
    label: 'Messaging',
    path: '/messaging/dashboard',
    icon: 'FiMessageSquare',
    module: 'messaging',
    permissions: ['messaging:read:channels'],
    children: [
      { id: 'messaging-dashboard', label: 'Dashboard', path: '/messaging/dashboard', icon: 'FiGrid', module: 'messaging' },
      { id: 'messaging-inbox', label: 'Inbox', path: '/messaging/inbox', icon: 'FiInbox', module: 'messaging' },
      { id: 'messaging-channels', label: 'Channels', path: '/messaging/channels', icon: 'FiMessageCircle', module: 'messaging' },
      { id: 'messaging-direct', label: 'Direct', path: '/messaging/direct', icon: 'FiUser', module: 'messaging' },
      { id: 'messaging-groups', label: 'Groups', path: '/messaging/groups', icon: 'FiUsers', module: 'messaging' },
      { id: 'messaging-compose', label: 'Compose', path: '/messaging/compose', icon: 'FiEdit3', module: 'messaging' },
      { id: 'messaging-receipts', label: 'Receipts', path: '/messaging/receipts', icon: 'FiCheckCircle', module: 'messaging' },
      { id: 'messaging-search', label: 'Search', path: '/messaging/search', icon: 'FiSearch', module: 'messaging' },
      { id: 'messaging-settings', label: 'Settings', path: '/messaging/settings', icon: 'FiSliders', module: 'messaging' },
    ],
  };

import type { NavItem } from '@/types';

export const authenticationNav: NavItem = {
    id: 'authentication',
    label: 'Authentication',
    path: '/auth/security',
    icon: 'FiLock',
    module: 'authentication',
    children: [
      { id: 'auth-security', label: 'Security Settings', path: '/auth/security', icon: 'FiShield', module: 'authentication' },
      { id: 'auth-sessions', label: 'Sessions', path: '/auth/sessions', icon: 'FiMonitor', module: 'authentication' },
      { id: 'auth-login-history', label: 'Login History', path: '/auth/login-history', icon: 'FiClock', module: 'authentication' },
      { id: 'auth-devices', label: 'Device Management', path: '/auth/devices', icon: 'FiSmartphone', module: 'authentication' },
      { id: 'auth-change-password', label: 'Change Password', path: '/auth/change-password', icon: 'FiKey', module: 'authentication' },
    ],
  };

export interface AppSettingsShortcut {
  id: string;
  title: string;
  description: string;
  path: string;
  category: 'profile' | 'security' | 'notifications' | 'modules';
}

export interface AppSettingsOverviewKpi {
  label: string;
  value: string;
  detail: string;
}

export const APP_SETTINGS_KPIS: AppSettingsOverviewKpi[] = [
  { label: 'Profile', value: 'Complete', detail: 'Name, email, and contact on file' },
  { label: 'Theme', value: 'Light', detail: 'Follows local preference' },
  { label: 'Language', value: 'English', detail: 'Africa/Kigali · DD MMM YYYY' },
  { label: 'Notifications', value: 'On', detail: 'Email + in-app enabled' },
  { label: 'MFA', value: 'Recommended', detail: 'Enable in Security settings' },
  { label: 'Sessions', value: 'Active', detail: 'Manage trusted devices anytime' },
];

export const APP_SETTINGS_SHORTCUTS: AppSettingsShortcut[] = [
  { id: 'sc-profile', title: 'Edit profile', description: 'Name, contact, and organization details', path: '/settings/profile', category: 'profile' },
  { id: 'sc-appearance', title: 'Appearance', description: 'Theme, density, and sidebar behavior', path: '/settings/appearance', category: 'profile' },
  { id: 'sc-language', title: 'Language & region', description: 'Locale, timezone, and date formats', path: '/settings/language', category: 'profile' },
  { id: 'sc-notifications', title: 'Notification channels', description: 'Email, SMS, push, quiet hours', path: '/settings/notifications', category: 'notifications' },
  { id: 'sc-security', title: 'Account security', description: 'Password, MFA, sessions, devices', path: '/settings/security', category: 'security' },
  { id: 'sc-notif-full', title: 'Full notification prefs', description: 'Open the Notifications module preferences', path: '/notifications/preferences', category: 'notifications' },
  { id: 'sc-auth-security', title: 'Auth security console', description: 'Deep MFA and recovery controls', path: '/auth/security', category: 'security' },
  { id: 'sc-sessions', title: 'Active sessions', description: 'Review and revoke signed-in sessions', path: '/auth/sessions', category: 'security' },
  { id: 'sc-password', title: 'Change password', description: 'Update your sign-in password', path: '/auth/change-password', category: 'security' },
  { id: 'sc-devices', title: 'Trusted devices', description: 'Manage registered devices', path: '/auth/devices', category: 'security' },
  { id: 'sc-user-prefs', title: 'Legacy user preferences', description: 'User Management preferences page', path: '/users/preferences', category: 'modules' },
];

export const LANDING_PAGE_OPTIONS = [
  { value: '/dashboard', label: 'Home Dashboard' },
  { value: '/notifications/inbox', label: 'Notification Inbox' },
  { value: '/leave/mine', label: 'My Leave' },
  { value: '/dms/dashboard', label: 'Documents' },
  { value: '/messaging/inbox', label: 'Messaging' },
];

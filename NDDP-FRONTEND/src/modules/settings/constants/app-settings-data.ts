export interface AppSettingsShortcut {
  id: string;
  title: string;
  description: string;
  path: string;
  category: 'profile' | 'security' | 'notifications' | 'preferences';
}

export interface AppSettingsOverviewKpi {
  label: string;
  value: string;
  detail: string;
}

export const APP_SETTINGS_KPIS: AppSettingsOverviewKpi[] = [
  { label: 'Profile', value: 'My Profile', detail: 'Identity, addresses, and emergency contacts' },
  { label: 'Theme', value: 'Light', detail: 'Follows local preference' },
  { label: 'Language', value: 'English', detail: 'Africa/Kigali · DD MMM YYYY' },
  { label: 'Notifications', value: 'On', detail: 'Email + in-app enabled' },
  { label: 'MFA', value: 'Recommended', detail: 'Enable in Security settings' },
  { label: 'Sessions', value: 'Active', detail: 'Manage trusted devices anytime' },
];

/** Shortcuts for the Settings hub — profile identity is owned by /profile. */
export const APP_SETTINGS_SHORTCUTS: AppSettingsShortcut[] = [
  { id: 'sc-profile', title: 'My Profile', description: 'Identity, addresses, and emergency contacts', path: '/profile', category: 'profile' },
  { id: 'sc-appearance', title: 'Appearance', description: 'Theme, density, and sidebar behavior', path: '/settings/appearance', category: 'preferences' },
  { id: 'sc-language', title: 'Language & region', description: 'Locale, timezone, and date formats', path: '/settings/language', category: 'preferences' },
  { id: 'sc-notifications', title: 'Notification channels', description: 'Email, SMS, push, quiet hours', path: '/settings/notifications', category: 'notifications' },
  { id: 'sc-security', title: 'Account security', description: 'Password, MFA, sessions, devices', path: '/settings/security', category: 'security' },
  { id: 'sc-notif-full', title: 'Full notification prefs', description: 'Open the Notifications module preferences', path: '/notifications/preferences', category: 'notifications' },
  { id: 'sc-auth-security', title: 'Auth security console', description: 'Deep MFA and recovery controls', path: '/auth/security', category: 'security' },
  { id: 'sc-sessions', title: 'Active sessions', description: 'Review and revoke signed-in sessions', path: '/auth/sessions', category: 'security' },
];

export const LANDING_PAGE_OPTIONS = [
  { value: '/dashboard', label: 'Home Dashboard' },
  { value: '/notifications/inbox', label: 'Notification Inbox' },
  { value: '/leave/mine', label: 'My Leave' },
  { value: '/dms/dashboard', label: 'Documents' },
  { value: '/messaging/inbox', label: 'Messaging' },
];

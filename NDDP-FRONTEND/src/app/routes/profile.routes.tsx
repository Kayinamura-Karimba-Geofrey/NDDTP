import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const ProfileOverviewPage = lazy(() => import('@/modules/profile/pages/ProfileOverviewPage').then((m) => ({ default: m.ProfileOverviewPage })));
const ProfileEditPage = lazy(() => import('@/modules/profile/pages/ProfileEditPage').then((m) => ({ default: m.ProfileEditPage })));
const ProfileAddressesPage = lazy(() => import('@/modules/profile/pages/ProfileAddressesPage').then((m) => ({ default: m.ProfileAddressesPage })));
const ProfileEmergencyContactsPage = lazy(() => import('@/modules/profile/pages/ProfileEmergencyContactsPage').then((m) => ({ default: m.ProfileEmergencyContactsPage })));
const ProfilePreferencesPage = lazy(() => import('@/modules/profile/pages/ProfilePreferencesPage').then((m) => ({ default: m.ProfilePreferencesPage })));
const ProfileActivityPage = lazy(() => import('@/modules/profile/pages/ProfileActivityPage').then((m) => ({ default: m.ProfileActivityPage })));

export const profileRoutes: RouteObject[] = [
  { path: 'profile', element: wrap(<ProfileOverviewPage />) },
  { path: 'profile/edit', element: wrap(<ProfileEditPage />) },
  { path: 'profile/addresses', element: wrap(<ProfileAddressesPage />) },
  { path: 'profile/emergency-contacts', element: wrap(<ProfileEmergencyContactsPage />) },
  { path: 'profile/preferences', element: wrap(<ProfilePreferencesPage />) },
  { path: 'profile/activity', element: wrap(<ProfileActivityPage />) },
];

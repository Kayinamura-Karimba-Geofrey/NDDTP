import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const AppSettingsOverviewPage = lazy(() => import('@/modules/settings/pages/AppSettingsOverviewPage').then((m) => ({ default: m.AppSettingsOverviewPage })));
const AppSettingsAppearancePage = lazy(() => import('@/modules/settings/pages/AppSettingsAppearancePage').then((m) => ({ default: m.AppSettingsAppearancePage })));
const AppSettingsLanguagePage = lazy(() => import('@/modules/settings/pages/AppSettingsLanguagePage').then((m) => ({ default: m.AppSettingsLanguagePage })));
const AppSettingsNotificationsPage = lazy(() => import('@/modules/settings/pages/AppSettingsNotificationsPage').then((m) => ({ default: m.AppSettingsNotificationsPage })));
const AppSettingsSecurityPage = lazy(() => import('@/modules/settings/pages/AppSettingsSecurityPage').then((m) => ({ default: m.AppSettingsSecurityPage })));

export const settingsRoutes: RouteObject[] = [
  { path: 'settings', element: <Navigate to="/settings/overview" replace /> },
  { path: 'settings/overview', element: wrap(<AppSettingsOverviewPage />) },
  /** Identity editing lives in My Profile — keep this path as a redirect. */
  { path: 'settings/profile', element: <Navigate to="/profile" replace /> },
  { path: 'settings/appearance', element: wrap(<AppSettingsAppearancePage />) },
  { path: 'settings/language', element: wrap(<AppSettingsLanguagePage />) },
  { path: 'settings/notifications', element: wrap(<AppSettingsNotificationsPage />) },
  { path: 'settings/security', element: wrap(<AppSettingsSecurityPage />) },
];
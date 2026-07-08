import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const ChangePasswordPage = lazy(() => import('@/modules/authentication/pages/ChangePasswordPage').then((m) => ({ default: m.ChangePasswordPage })));
const SessionManagementPage = lazy(() => import('@/modules/authentication/pages/SessionManagementPage').then((m) => ({ default: m.SessionManagementPage })));
const LoginHistoryPage = lazy(() => import('@/modules/authentication/pages/LoginHistoryPage').then((m) => ({ default: m.LoginHistoryPage })));
const SecuritySettingsPage = lazy(() => import('@/modules/authentication/pages/SecuritySettingsPage').then((m) => ({ default: m.SecuritySettingsPage })));
const DeviceManagementPage = lazy(() => import('@/modules/authentication/pages/DeviceManagementPage').then((m) => ({ default: m.DeviceManagementPage })));

export const authenticationRoutes: RouteObject[] = [
  { path: 'auth/change-password', element: wrap(<ChangePasswordPage />) },
  { path: 'auth/sessions', element: wrap(<SessionManagementPage />) },
  { path: 'auth/login-history', element: wrap(<LoginHistoryPage />) },
  { path: 'auth/security', element: wrap(<SecuritySettingsPage />) },
  { path: 'auth/devices', element: wrap(<DeviceManagementPage />) },
];

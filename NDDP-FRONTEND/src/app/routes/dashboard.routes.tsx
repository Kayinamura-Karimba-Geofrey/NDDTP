import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const DashboardPage = lazy(() => import('@/modules/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));

export const dashboardRoutes: RouteObject[] = [
  { path: 'dashboard', element: wrap(<DashboardPage />) },
];

import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const DashboardPage = lazy(() => import('@/modules/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const TacticalMapView = lazy(() => import('@/components/gis/TacticalMapView').then((m) => ({ default: m.TacticalMapView })));

export const dashboardRoutes: RouteObject[] = [
  { path: 'dashboard', element: wrap(<DashboardPage />) },
  { path: 'tactical-map', element: wrap(<TacticalMapView />) },
];


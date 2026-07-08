import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const LogisticsDashboardPage = lazy(() => import('@/modules/logistics/pages/LogisticsDashboardPage').then((m) => ({ default: m.LogisticsDashboardPage })));
const LogisticsShipmentsPage = lazy(() => import('@/modules/logistics/pages/LogisticsShipmentsPage').then((m) => ({ default: m.LogisticsShipmentsPage })));
const LogisticsMyShipmentsPage = lazy(() => import('@/modules/logistics/pages/LogisticsMyShipmentsPage').then((m) => ({ default: m.LogisticsMyShipmentsPage })));
const LogisticsCreateShipmentPage = lazy(() => import('@/modules/logistics/pages/LogisticsCreateShipmentPage').then((m) => ({ default: m.LogisticsCreateShipmentPage })));
const LogisticsShipmentDetailPage = lazy(() => import('@/modules/logistics/pages/LogisticsShipmentDetailPage').then((m) => ({ default: m.LogisticsShipmentDetailPage })));
const LogisticsLocationsPage = lazy(() => import('@/modules/logistics/pages/LogisticsLocationsPage').then((m) => ({ default: m.LogisticsLocationsPage })));
const LogisticsRoutesPage = lazy(() => import('@/modules/logistics/pages/LogisticsRoutesPage').then((m) => ({ default: m.LogisticsRoutesPage })));
const LogisticsTrackingPage = lazy(() => import('@/modules/logistics/pages/LogisticsTrackingPage').then((m) => ({ default: m.LogisticsTrackingPage })));
const LogisticsTrackingDetailPage = lazy(() => import('@/modules/logistics/pages/LogisticsTrackingDetailPage').then((m) => ({ default: m.LogisticsTrackingDetailPage })));
const LogisticsReportsPage = lazy(() => import('@/modules/logistics/pages/LogisticsReportsPage').then((m) => ({ default: m.LogisticsReportsPage })));
const LogisticsSettingsPage = lazy(() => import('@/modules/logistics/pages/LogisticsSettingsPage').then((m) => ({ default: m.LogisticsSettingsPage })));

export const logisticsRoutes: RouteObject[] = [
  { path: 'logistics', element: <Navigate to="/logistics/dashboard" replace /> },
  { path: 'logistics/dashboard', element: wrap(<LogisticsDashboardPage />) },
  { path: 'logistics/shipments', element: wrap(<LogisticsShipmentsPage />) },
  { path: 'logistics/shipments/mine', element: wrap(<LogisticsMyShipmentsPage />) },
  { path: 'logistics/shipments/new', element: wrap(<LogisticsCreateShipmentPage />) },
  { path: 'logistics/shipments/:id', element: wrap(<LogisticsShipmentDetailPage />) },
  { path: 'logistics/locations', element: wrap(<LogisticsLocationsPage />) },
  { path: 'logistics/routes', element: wrap(<LogisticsRoutesPage />) },
  { path: 'logistics/tracking', element: wrap(<LogisticsTrackingPage />) },
  { path: 'logistics/tracking/:shipmentId', element: wrap(<LogisticsTrackingDetailPage />) },
  { path: 'logistics/reports', element: wrap(<LogisticsReportsPage />) },
  { path: 'logistics/settings', element: wrap(<LogisticsSettingsPage />) },
];

import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const MaintenanceDashboardPage = lazy(() => import('@/modules/maintenance/pages/MaintenanceDashboardPage').then((m) => ({ default: m.MaintenanceDashboardPage })));
const MaintenanceWorkOrdersPage = lazy(() => import('@/modules/maintenance/pages/MaintenanceWorkOrdersPage').then((m) => ({ default: m.MaintenanceWorkOrdersPage })));
const MaintenanceWorkOrderDetailPage = lazy(() => import('@/modules/maintenance/pages/MaintenanceWorkOrderDetailPage').then((m) => ({ default: m.MaintenanceWorkOrderDetailPage })));
const MaintenanceRequestsPage = lazy(() => import('@/modules/maintenance/pages/MaintenanceRequestsPage').then((m) => ({ default: m.MaintenanceRequestsPage })));
const MaintenancePendingPage = lazy(() => import('@/modules/maintenance/pages/MaintenancePendingPage').then((m) => ({ default: m.MaintenancePendingPage })));
const MaintenanceMyRequestsPage = lazy(() => import('@/modules/maintenance/pages/MaintenanceMyRequestsPage').then((m) => ({ default: m.MaintenanceMyRequestsPage })));
const MaintenanceCreateRequestPage = lazy(() => import('@/modules/maintenance/pages/MaintenanceCreateRequestPage').then((m) => ({ default: m.MaintenanceCreateRequestPage })));
const MaintenanceRequestDetailPage = lazy(() => import('@/modules/maintenance/pages/MaintenanceRequestDetailPage').then((m) => ({ default: m.MaintenanceRequestDetailPage })));
const MaintenancePreventivePage = lazy(() => import('@/modules/maintenance/pages/MaintenancePreventivePage').then((m) => ({ default: m.MaintenancePreventivePage })));
const MaintenanceAssetsPage = lazy(() => import('@/modules/maintenance/pages/MaintenanceAssetsPage').then((m) => ({ default: m.MaintenanceAssetsPage })));
const MaintenanceTechniciansPage = lazy(() => import('@/modules/maintenance/pages/MaintenanceTechniciansPage').then((m) => ({ default: m.MaintenanceTechniciansPage })));
const MaintenancePartsPage = lazy(() => import('@/modules/maintenance/pages/MaintenancePartsPage').then((m) => ({ default: m.MaintenancePartsPage })));
const MaintenanceCategoriesPage = lazy(() => import('@/modules/maintenance/pages/MaintenanceCategoriesPage').then((m) => ({ default: m.MaintenanceCategoriesPage })));
const MaintenanceSlaPage = lazy(() => import('@/modules/maintenance/pages/MaintenanceSlaPage').then((m) => ({ default: m.MaintenanceSlaPage })));
const MaintenanceReportsPage = lazy(() => import('@/modules/maintenance/pages/MaintenanceReportsPage').then((m) => ({ default: m.MaintenanceReportsPage })));
const MaintenanceSettingsPage = lazy(() => import('@/modules/maintenance/pages/MaintenanceSettingsPage').then((m) => ({ default: m.MaintenanceSettingsPage })));

export const maintenanceRoutes: RouteObject[] = [
  { path: 'maintenance', element: <Navigate to="/maintenance/dashboard" replace /> },
  { path: 'maintenance/dashboard', element: wrap(<MaintenanceDashboardPage />) },
  { path: 'maintenance/work-orders', element: wrap(<MaintenanceWorkOrdersPage />) },
  { path: 'maintenance/work-orders/:id', element: wrap(<MaintenanceWorkOrderDetailPage />) },
  { path: 'maintenance/requests', element: wrap(<MaintenanceRequestsPage />) },
  { path: 'maintenance/requests/pending', element: wrap(<MaintenancePendingPage />) },
  { path: 'maintenance/requests/mine', element: wrap(<MaintenanceMyRequestsPage />) },
  { path: 'maintenance/requests/new', element: wrap(<MaintenanceCreateRequestPage />) },
  { path: 'maintenance/requests/:id', element: wrap(<MaintenanceRequestDetailPage />) },
  { path: 'maintenance/preventive', element: wrap(<MaintenancePreventivePage />) },
  { path: 'maintenance/assets', element: wrap(<MaintenanceAssetsPage />) },
  { path: 'maintenance/technicians', element: wrap(<MaintenanceTechniciansPage />) },
  { path: 'maintenance/parts', element: wrap(<MaintenancePartsPage />) },
  { path: 'maintenance/categories', element: wrap(<MaintenanceCategoriesPage />) },
  { path: 'maintenance/sla', element: wrap(<MaintenanceSlaPage />) },
  { path: 'maintenance/reports', element: wrap(<MaintenanceReportsPage />) },
  { path: 'maintenance/settings', element: wrap(<MaintenanceSettingsPage />) },
];

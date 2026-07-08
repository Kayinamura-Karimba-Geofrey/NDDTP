import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const AssetDashboardPage = lazy(() => import('@/modules/assets/pages/AssetDashboardPage').then((m) => ({ default: m.AssetDashboardPage })));
const AssetRegistryPage = lazy(() => import('@/modules/assets/pages/AssetRegistryPage').then((m) => ({ default: m.AssetRegistryPage })));
const AssetCategoriesPage = lazy(() => import('@/modules/assets/pages/AssetCategoriesPage').then((m) => ({ default: m.AssetCategoriesPage })));
const AssetTypesPage = lazy(() => import('@/modules/assets/pages/AssetTypesPage').then((m) => ({ default: m.AssetTypesPage })));
const AssetProfileDetailPage = lazy(() => import('@/modules/assets/pages/AssetProfileDetailPage').then((m) => ({ default: m.AssetProfileDetailPage })));
const AssetAssignmentPage = lazy(() => import('@/modules/assets/pages/AssetAssignmentPage').then((m) => ({ default: m.AssetAssignmentPage })));
const AssetTransfersPage = lazy(() => import('@/modules/assets/pages/AssetTransfersPage').then((m) => ({ default: m.AssetTransfersPage })));
const AssetReturnsPage = lazy(() => import('@/modules/assets/pages/AssetReturnsPage').then((m) => ({ default: m.AssetReturnsPage })));
const MaintenanceManagementPage = lazy(() => import('@/modules/assets/pages/MaintenanceManagementPage').then((m) => ({ default: m.MaintenanceManagementPage })));
const InspectionManagementPage = lazy(() => import('@/modules/assets/pages/InspectionManagementPage').then((m) => ({ default: m.InspectionManagementPage })));
const WarrantyManagementPage = lazy(() => import('@/modules/assets/pages/WarrantyManagementPage').then((m) => ({ default: m.WarrantyManagementPage })));
const AssetLifecyclePage = lazy(() => import('@/modules/assets/pages/AssetLifecyclePage').then((m) => ({ default: m.AssetLifecyclePage })));
const AssetDocumentsPage = lazy(() => import('@/modules/assets/pages/AssetDocumentsPage').then((m) => ({ default: m.AssetDocumentsPage })));
const AssetAuditPage = lazy(() => import('@/modules/assets/pages/AssetAuditPage').then((m) => ({ default: m.AssetAuditPage })));
const AssetDisposalPage = lazy(() => import('@/modules/assets/pages/AssetDisposalPage').then((m) => ({ default: m.AssetDisposalPage })));
const AssetReservationsPage = lazy(() => import('@/modules/assets/pages/AssetReservationsPage').then((m) => ({ default: m.AssetReservationsPage })));
const BarcodeManagementPage = lazy(() => import('@/modules/assets/pages/BarcodeManagementPage').then((m) => ({ default: m.BarcodeManagementPage })));
const AssetReportsPage = lazy(() => import('@/modules/assets/pages/AssetReportsPage').then((m) => ({ default: m.AssetReportsPage })));
const AssetSettingsPage = lazy(() => import('@/modules/assets/pages/AssetSettingsPage').then((m) => ({ default: m.AssetSettingsPage })));

export const assetsRoutes: RouteObject[] = [
  { path: 'assets', element: <Navigate to="/assets/dashboard" replace /> },
  { path: 'assets/dashboard', element: wrap(<AssetDashboardPage />) },
  { path: 'assets/registry', element: wrap(<AssetRegistryPage />) },
  { path: 'assets/categories', element: wrap(<AssetCategoriesPage />) },
  { path: 'assets/types', element: wrap(<AssetTypesPage />) },
  { path: 'assets/profiles/:id', element: wrap(<AssetProfileDetailPage />) },
  { path: 'assets/assignment', element: wrap(<AssetAssignmentPage />) },
  { path: 'assets/transfers', element: wrap(<AssetTransfersPage />) },
  { path: 'assets/returns', element: wrap(<AssetReturnsPage />) },
  { path: 'assets/maintenance', element: wrap(<MaintenanceManagementPage />) },
  { path: 'assets/inspections', element: wrap(<InspectionManagementPage />) },
  { path: 'assets/warranty', element: wrap(<WarrantyManagementPage />) },
  { path: 'assets/lifecycle', element: wrap(<AssetLifecyclePage />) },
  { path: 'assets/documents', element: wrap(<AssetDocumentsPage />) },
  { path: 'assets/audit', element: wrap(<AssetAuditPage />) },
  { path: 'assets/disposal', element: wrap(<AssetDisposalPage />) },
  { path: 'assets/reservations', element: wrap(<AssetReservationsPage />) },
  { path: 'assets/barcodes', element: wrap(<BarcodeManagementPage />) },
  { path: 'assets/reports', element: wrap(<AssetReportsPage />) },
  { path: 'assets/settings', element: wrap(<AssetSettingsPage />) },
];

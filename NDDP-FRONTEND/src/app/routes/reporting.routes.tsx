import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const ExecutiveDashboardPage = lazy(() => import('@/modules/reporting/pages/ExecutiveDashboardPage').then((m) => ({ default: m.ExecutiveDashboardPage })));
const OperationalDashboardsPage = lazy(() => import('@/modules/reporting/pages/OperationalDashboardsPage').then((m) => ({ default: m.OperationalDashboardsPage })));
const ReportingKpiManagementPage = lazy(() => import('@/modules/reporting/pages/ReportingKpiManagementPage').then((m) => ({ default: m.ReportingKpiManagementPage })));
const ReportLibraryPage = lazy(() => import('@/modules/reporting/pages/ReportLibraryPage').then((m) => ({ default: m.ReportLibraryPage })));
const ReportBuilderPage = lazy(() => import('@/modules/reporting/pages/ReportBuilderPage').then((m) => ({ default: m.ReportBuilderPage })));
const ScheduledReportsPage = lazy(() => import('@/modules/reporting/pages/ScheduledReportsPage').then((m) => ({ default: m.ScheduledReportsPage })));
const ReportSubscriptionsPage = lazy(() => import('@/modules/reporting/pages/ReportSubscriptionsPage').then((m) => ({ default: m.ReportSubscriptionsPage })));
const DataExplorerPage = lazy(() => import('@/modules/reporting/pages/DataExplorerPage').then((m) => ({ default: m.DataExplorerPage })));
const AdvancedAnalyticsPage = lazy(() => import('@/modules/reporting/pages/AdvancedAnalyticsPage').then((m) => ({ default: m.AdvancedAnalyticsPage })));
const ForecastingPage = lazy(() => import('@/modules/reporting/pages/ForecastingPage').then((m) => ({ default: m.ForecastingPage })));
const GeographicAnalyticsPage = lazy(() => import('@/modules/reporting/pages/GeographicAnalyticsPage').then((m) => ({ default: m.GeographicAnalyticsPage })));
const ComparativeAnalysisPage = lazy(() => import('@/modules/reporting/pages/ComparativeAnalysisPage').then((m) => ({ default: m.ComparativeAnalysisPage })));
const DataExportsPage = lazy(() => import('@/modules/reporting/pages/DataExportsPage').then((m) => ({ default: m.DataExportsPage })));
const AuditReportsPage = lazy(() => import('@/modules/reporting/pages/AuditReportsPage').then((m) => ({ default: m.AuditReportsPage })));
const DashboardDesignerPage = lazy(() => import('@/modules/reporting/pages/DashboardDesignerPage').then((m) => ({ default: m.DashboardDesignerPage })));
const BiIntegrationsPage = lazy(() => import('@/modules/reporting/pages/BiIntegrationsPage').then((m) => ({ default: m.BiIntegrationsPage })));
const ReportHistoryPage = lazy(() => import('@/modules/reporting/pages/ReportHistoryPage').then((m) => ({ default: m.ReportHistoryPage })));
const ReportingSettingsPage = lazy(() => import('@/modules/reporting/pages/ReportingSettingsPage').then((m) => ({ default: m.ReportingSettingsPage })));

export const reportingRoutes: RouteObject[] = [
  { path: 'reports', element: <Navigate to="/reports/dashboard" replace /> },
  { path: 'reports/dashboard', element: wrap(<ExecutiveDashboardPage />) },
  { path: 'reports/operational', element: wrap(<OperationalDashboardsPage />) },
  { path: 'reports/kpis', element: wrap(<ReportingKpiManagementPage />) },
  { path: 'reports/library', element: wrap(<ReportLibraryPage />) },
  { path: 'reports/builder', element: wrap(<ReportBuilderPage />) },
  { path: 'reports/scheduled', element: wrap(<ScheduledReportsPage />) },
  { path: 'reports/subscriptions', element: wrap(<ReportSubscriptionsPage />) },
  { path: 'reports/explorer', element: wrap(<DataExplorerPage />) },
  { path: 'reports/analytics', element: wrap(<AdvancedAnalyticsPage />) },
  { path: 'reports/forecasting', element: wrap(<ForecastingPage />) },
  { path: 'reports/geographic', element: wrap(<GeographicAnalyticsPage />) },
  { path: 'reports/comparative', element: wrap(<ComparativeAnalysisPage />) },
  { path: 'reports/exports', element: wrap(<DataExportsPage />) },
  { path: 'reports/audit', element: wrap(<AuditReportsPage />) },
  { path: 'reports/designer', element: wrap(<DashboardDesignerPage />) },
  { path: 'reports/integrations', element: wrap(<BiIntegrationsPage />) },
  { path: 'reports/history', element: wrap(<ReportHistoryPage />) },
  { path: 'reports/settings', element: wrap(<ReportingSettingsPage />) },
  { path: 'analytics', element: <Navigate to="/reports/analytics" replace /> },
  { path: 'analytics/*', element: <Navigate to="/reports/analytics" replace /> },
  { path: 'business-intelligence', element: <Navigate to="/reports/integrations" replace /> },
  { path: 'business-intelligence/*', element: <Navigate to="/reports/integrations" replace /> },
];

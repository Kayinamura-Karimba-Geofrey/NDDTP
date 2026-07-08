import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const AuditDashboardPage = lazy(() => import('@/modules/audit/pages/AuditDashboardPage').then((m) => ({ default: m.AuditDashboardPage })));
const AuditLogsPage = lazy(() => import('@/modules/audit/pages/AuditLogsPage').then((m) => ({ default: m.AuditLogsPage })));
const UserActivityPage = lazy(() => import('@/modules/audit/pages/UserActivityPage').then((m) => ({ default: m.UserActivityPage })));
const SystemActivityPage = lazy(() => import('@/modules/audit/pages/SystemActivityPage').then((m) => ({ default: m.SystemActivityPage })));
const ApiActivityPage = lazy(() => import('@/modules/audit/pages/ApiActivityPage').then((m) => ({ default: m.ApiActivityPage })));
const ComplianceCenterPage = lazy(() => import('@/modules/audit/pages/ComplianceCenterPage').then((m) => ({ default: m.ComplianceCenterPage })));
const SecurityEventsPage = lazy(() => import('@/modules/audit/pages/SecurityEventsPage').then((m) => ({ default: m.SecurityEventsPage })));
const ConfigChangesPage = lazy(() => import('@/modules/audit/pages/ConfigChangesPage').then((m) => ({ default: m.ConfigChangesPage })));
const DistributedTracingPage = lazy(() => import('@/modules/audit/pages/DistributedTracingPage').then((m) => ({ default: m.DistributedTracingPage })));
const SystemMonitoringPage = lazy(() => import('@/modules/audit/pages/SystemMonitoringPage').then((m) => ({ default: m.SystemMonitoringPage })));
const InfrastructureMonitoringPage = lazy(() => import('@/modules/audit/pages/InfrastructureMonitoringPage').then((m) => ({ default: m.InfrastructureMonitoringPage })));
const PerformanceMetricsPage = lazy(() => import('@/modules/audit/pages/PerformanceMetricsPage').then((m) => ({ default: m.PerformanceMetricsPage })));
const ErrorTrackingPage = lazy(() => import('@/modules/audit/pages/ErrorTrackingPage').then((m) => ({ default: m.ErrorTrackingPage })));
const AlertCenterPage = lazy(() => import('@/modules/audit/pages/AlertCenterPage').then((m) => ({ default: m.AlertCenterPage })));
const IncidentTimelinePage = lazy(() => import('@/modules/audit/pages/IncidentTimelinePage').then((m) => ({ default: m.IncidentTimelinePage })));
const LogExplorerPage = lazy(() => import('@/modules/audit/pages/LogExplorerPage').then((m) => ({ default: m.LogExplorerPage })));
const AuditModuleReportsPage = lazy(() => import('@/modules/audit/pages/AuditModuleReportsPage').then((m) => ({ default: m.AuditModuleReportsPage })));
const AuditIntegrationsPage = lazy(() => import('@/modules/audit/pages/AuditIntegrationsPage').then((m) => ({ default: m.AuditIntegrationsPage })));
const AuditSettingsPage = lazy(() => import('@/modules/audit/pages/AuditSettingsPage').then((m) => ({ default: m.AuditSettingsPage })));

export const auditRoutes: RouteObject[] = [
  { path: 'audit', element: <Navigate to="/audit/dashboard" replace /> },
  { path: 'audit-logs', element: <Navigate to="/audit/logs" replace /> },
  { path: 'audit-logs/*', element: <Navigate to="/audit/logs" replace /> },
  { path: 'audit/dashboard', element: wrap(<AuditDashboardPage />) },
  { path: 'audit/logs', element: wrap(<AuditLogsPage />) },
  { path: 'audit/user-activity', element: wrap(<UserActivityPage />) },
  { path: 'audit/system-activity', element: wrap(<SystemActivityPage />) },
  { path: 'audit/api-activity', element: wrap(<ApiActivityPage />) },
  { path: 'audit/compliance', element: wrap(<ComplianceCenterPage />) },
  { path: 'audit/security-events', element: wrap(<SecurityEventsPage />) },
  { path: 'audit/config-changes', element: wrap(<ConfigChangesPage />) },
  { path: 'audit/tracing', element: wrap(<DistributedTracingPage />) },
  { path: 'audit/system-monitoring', element: wrap(<SystemMonitoringPage />) },
  { path: 'audit/infrastructure', element: wrap(<InfrastructureMonitoringPage />) },
  { path: 'audit/performance', element: wrap(<PerformanceMetricsPage />) },
  { path: 'audit/errors', element: wrap(<ErrorTrackingPage />) },
  { path: 'audit/alerts', element: wrap(<AlertCenterPage />) },
  { path: 'audit/incidents', element: wrap(<IncidentTimelinePage />) },
  { path: 'audit/log-explorer', element: wrap(<LogExplorerPage />) },
  { path: 'audit/reports', element: wrap(<AuditModuleReportsPage />) },
  { path: 'audit/integrations', element: wrap(<AuditIntegrationsPage />) },
  { path: 'audit/settings', element: wrap(<AuditSettingsPage />) },
];

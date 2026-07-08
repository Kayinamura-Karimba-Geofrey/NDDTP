import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const AdminDashboardPage = lazy(() => import('@/modules/administration/pages/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })));
const ConfigNamespacesPage = lazy(() => import('@/modules/administration/pages/ConfigNamespacesPage').then((m) => ({ default: m.ConfigNamespacesPage })));
const ConfigCreateNamespacePage = lazy(() => import('@/modules/administration/pages/ConfigCreateNamespacePage').then((m) => ({ default: m.ConfigCreateNamespacePage })));
const ConfigNamespaceDetailPage = lazy(() => import('@/modules/administration/pages/ConfigNamespaceDetailPage').then((m) => ({ default: m.ConfigNamespaceDetailPage })));
const ConfigEntriesPage = lazy(() => import('@/modules/administration/pages/ConfigEntriesPage').then((m) => ({ default: m.ConfigEntriesPage })));
const ConfigCreateEntryPage = lazy(() => import('@/modules/administration/pages/ConfigCreateEntryPage').then((m) => ({ default: m.ConfigCreateEntryPage })));
const ConfigEntryDetailPage = lazy(() => import('@/modules/administration/pages/ConfigEntryDetailPage').then((m) => ({ default: m.ConfigEntryDetailPage })));
const ConfigRevisionsPage = lazy(() => import('@/modules/administration/pages/ConfigRevisionsPage').then((m) => ({ default: m.ConfigRevisionsPage })));
const ConfigEntryRevisionsPage = lazy(() => import('@/modules/administration/pages/ConfigEntryRevisionsPage').then((m) => ({ default: m.ConfigEntryRevisionsPage })));
const AdminHealthPage = lazy(() => import('@/modules/administration/pages/AdminHealthPage').then((m) => ({ default: m.AdminHealthPage })));
const AdminReportsPage = lazy(() => import('@/modules/administration/pages/AdminReportsPage').then((m) => ({ default: m.AdminReportsPage })));
const AdminSettingsPage = lazy(() => import('@/modules/administration/pages/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage })));

export const administrationRoutes: RouteObject[] = [
  { path: 'administration', element: <Navigate to="/administration/dashboard" replace /> },
  { path: 'administration/dashboard', element: wrap(<AdminDashboardPage />) },
  { path: 'administration/namespaces', element: wrap(<ConfigNamespacesPage />) },
  { path: 'administration/namespaces/new', element: wrap(<ConfigCreateNamespacePage />) },
  { path: 'administration/namespaces/:id', element: wrap(<ConfigNamespaceDetailPage />) },
  { path: 'administration/entries', element: wrap(<ConfigEntriesPage />) },
  { path: 'administration/entries/new', element: wrap(<ConfigCreateEntryPage />) },
  { path: 'administration/entries/:id', element: wrap(<ConfigEntryDetailPage />) },
  { path: 'administration/revisions', element: wrap(<ConfigRevisionsPage />) },
  { path: 'administration/revisions/entry/:entryId', element: wrap(<ConfigEntryRevisionsPage />) },
  { path: 'administration/health', element: wrap(<AdminHealthPage />) },
  { path: 'administration/reports', element: wrap(<AdminReportsPage />) },
  { path: 'administration/settings', element: wrap(<AdminSettingsPage />) },
];

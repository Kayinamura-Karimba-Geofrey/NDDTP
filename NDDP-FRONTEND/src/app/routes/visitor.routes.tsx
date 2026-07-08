import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const VisitorDashboardPage = lazy(() => import('@/modules/visitor/pages/VisitorDashboardPage').then((m) => ({ default: m.VisitorDashboardPage })));
const VisitorDirectoryPage = lazy(() => import('@/modules/visitor/pages/VisitorDirectoryPage').then((m) => ({ default: m.VisitorDirectoryPage })));
const VisitorRegisterPage = lazy(() => import('@/modules/visitor/pages/VisitorRegisterPage').then((m) => ({ default: m.VisitorRegisterPage })));
const VisitorDetailPage = lazy(() => import('@/modules/visitor/pages/VisitorDetailPage').then((m) => ({ default: m.VisitorDetailPage })));
const VisitorRequestsPage = lazy(() => import('@/modules/visitor/pages/VisitorRequestsPage').then((m) => ({ default: m.VisitorRequestsPage })));
const VisitorPendingPage = lazy(() => import('@/modules/visitor/pages/VisitorPendingPage').then((m) => ({ default: m.VisitorPendingPage })));
const VisitorMyVisitsPage = lazy(() => import('@/modules/visitor/pages/VisitorMyVisitsPage').then((m) => ({ default: m.VisitorMyVisitsPage })));
const VisitorCreateRequestPage = lazy(() => import('@/modules/visitor/pages/VisitorCreateRequestPage').then((m) => ({ default: m.VisitorCreateRequestPage })));
const VisitorRequestDetailPage = lazy(() => import('@/modules/visitor/pages/VisitorRequestDetailPage').then((m) => ({ default: m.VisitorRequestDetailPage })));
const VisitorCheckInPage = lazy(() => import('@/modules/visitor/pages/VisitorCheckInPage').then((m) => ({ default: m.VisitorCheckInPage })));
const VisitorOnSitePage = lazy(() => import('@/modules/visitor/pages/VisitorOnSitePage').then((m) => ({ default: m.VisitorOnSitePage })));
const VisitorSitesPage = lazy(() => import('@/modules/visitor/pages/VisitorSitesPage').then((m) => ({ default: m.VisitorSitesPage })));
const VisitorBadgesPage = lazy(() => import('@/modules/visitor/pages/VisitorBadgesPage').then((m) => ({ default: m.VisitorBadgesPage })));
const VisitorBlacklistPage = lazy(() => import('@/modules/visitor/pages/VisitorBlacklistPage').then((m) => ({ default: m.VisitorBlacklistPage })));
const VisitorHistoryPage = lazy(() => import('@/modules/visitor/pages/VisitorHistoryPage').then((m) => ({ default: m.VisitorHistoryPage })));
const VisitorReportsPage = lazy(() => import('@/modules/visitor/pages/VisitorReportsPage').then((m) => ({ default: m.VisitorReportsPage })));
const VisitorSettingsPage = lazy(() => import('@/modules/visitor/pages/VisitorSettingsPage').then((m) => ({ default: m.VisitorSettingsPage })));

export const visitorRoutes: RouteObject[] = [
  { path: 'visitors', element: <Navigate to="/visitors/dashboard" replace /> },
  { path: 'visitors/dashboard', element: wrap(<VisitorDashboardPage />) },
  { path: 'visitors/directory', element: wrap(<VisitorDirectoryPage />) },
  { path: 'visitors/register', element: wrap(<VisitorRegisterPage />) },
  { path: 'visitors/directory/:id', element: wrap(<VisitorDetailPage />) },
  { path: 'visitors/requests', element: wrap(<VisitorRequestsPage />) },
  { path: 'visitors/requests/pending', element: wrap(<VisitorPendingPage />) },
  { path: 'visitors/requests/mine', element: wrap(<VisitorMyVisitsPage />) },
  { path: 'visitors/requests/new', element: wrap(<VisitorCreateRequestPage />) },
  { path: 'visitors/requests/:id', element: wrap(<VisitorRequestDetailPage />) },
  { path: 'visitors/check-in', element: wrap(<VisitorCheckInPage />) },
  { path: 'visitors/on-site', element: wrap(<VisitorOnSitePage />) },
  { path: 'visitors/sites', element: wrap(<VisitorSitesPage />) },
  { path: 'visitors/badges', element: wrap(<VisitorBadgesPage />) },
  { path: 'visitors/blacklist', element: wrap(<VisitorBlacklistPage />) },
  { path: 'visitors/history', element: wrap(<VisitorHistoryPage />) },
  { path: 'visitors/reports', element: wrap(<VisitorReportsPage />) },
  { path: 'visitors/settings', element: wrap(<VisitorSettingsPage />) },
];

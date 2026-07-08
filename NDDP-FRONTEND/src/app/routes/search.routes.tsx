import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const SearchDashboardPage = lazy(() => import('@/modules/search/pages/SearchDashboardPage').then((m) => ({ default: m.SearchDashboardPage })));
const SearchQueryPage = lazy(() => import('@/modules/search/pages/SearchQueryPage').then((m) => ({ default: m.SearchQueryPage })));
const SearchQueriesPage = lazy(() => import('@/modules/search/pages/SearchQueriesPage').then((m) => ({ default: m.SearchQueriesPage })));
const SearchMyQueriesPage = lazy(() => import('@/modules/search/pages/SearchMyQueriesPage').then((m) => ({ default: m.SearchMyQueriesPage })));
const SearchQueryDetailPage = lazy(() => import('@/modules/search/pages/SearchQueryDetailPage').then((m) => ({ default: m.SearchQueryDetailPage })));
const SearchIndexesPage = lazy(() => import('@/modules/search/pages/SearchIndexesPage').then((m) => ({ default: m.SearchIndexesPage })));
const SearchCreateIndexPage = lazy(() => import('@/modules/search/pages/SearchCreateIndexPage').then((m) => ({ default: m.SearchCreateIndexPage })));
const SearchIndexDetailPage = lazy(() => import('@/modules/search/pages/SearchIndexDetailPage').then((m) => ({ default: m.SearchIndexDetailPage })));
const SearchDocumentsPage = lazy(() => import('@/modules/search/pages/SearchDocumentsPage').then((m) => ({ default: m.SearchDocumentsPage })));
const SearchCreateDocumentPage = lazy(() => import('@/modules/search/pages/SearchCreateDocumentPage').then((m) => ({ default: m.SearchCreateDocumentPage })));
const SearchDocumentDetailPage = lazy(() => import('@/modules/search/pages/SearchDocumentDetailPage').then((m) => ({ default: m.SearchDocumentDetailPage })));
const SearchReportsPage = lazy(() => import('@/modules/search/pages/SearchReportsPage').then((m) => ({ default: m.SearchReportsPage })));
const SearchSettingsPage = lazy(() => import('@/modules/search/pages/SearchSettingsPage').then((m) => ({ default: m.SearchSettingsPage })));

export const searchRoutes: RouteObject[] = [
  { path: 'search', element: <Navigate to="/search/dashboard" replace /> },
  { path: 'search/dashboard', element: wrap(<SearchDashboardPage />) },
  { path: 'search/query', element: wrap(<SearchQueryPage />) },
  { path: 'search/queries', element: wrap(<SearchQueriesPage />) },
  { path: 'search/queries/mine', element: wrap(<SearchMyQueriesPage />) },
  { path: 'search/queries/:id', element: wrap(<SearchQueryDetailPage />) },
  { path: 'search/indexes', element: wrap(<SearchIndexesPage />) },
  { path: 'search/indexes/new', element: wrap(<SearchCreateIndexPage />) },
  { path: 'search/indexes/:id', element: wrap(<SearchIndexDetailPage />) },
  { path: 'search/documents', element: wrap(<SearchDocumentsPage />) },
  { path: 'search/documents/new', element: wrap(<SearchCreateDocumentPage />) },
  { path: 'search/documents/:id', element: wrap(<SearchDocumentDetailPage />) },
  { path: 'search/reports', element: wrap(<SearchReportsPage />) },
  { path: 'search/settings', element: wrap(<SearchSettingsPage />) },
];

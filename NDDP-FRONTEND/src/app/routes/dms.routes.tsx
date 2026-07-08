import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const DmsDashboardPage = lazy(() => import('@/modules/dms/pages/DmsDashboardPage').then((m) => ({ default: m.DmsDashboardPage })));
const DocumentLibraryPage = lazy(() => import('@/modules/dms/pages/DocumentLibraryPage').then((m) => ({ default: m.DocumentLibraryPage })));
const MyDocumentsPage = lazy(() => import('@/modules/dms/pages/MyDocumentsPage').then((m) => ({ default: m.MyDocumentsPage })));
const SharedDocumentsPage = lazy(() => import('@/modules/dms/pages/SharedDocumentsPage').then((m) => ({ default: m.SharedDocumentsPage })));
const RecentDocumentsPage = lazy(() => import('@/modules/dms/pages/RecentDocumentsPage').then((m) => ({ default: m.RecentDocumentsPage })));
const FoldersCategoriesPage = lazy(() => import('@/modules/dms/pages/FoldersCategoriesPage').then((m) => ({ default: m.FoldersCategoriesPage })));
const DocumentUploadPage = lazy(() => import('@/modules/dms/pages/DocumentUploadPage').then((m) => ({ default: m.DocumentUploadPage })));
const DocumentViewerPage = lazy(() => import('@/modules/dms/pages/DocumentViewerPage').then((m) => ({ default: m.DocumentViewerPage })));
const VersionHistoryPage = lazy(() => import('@/modules/dms/pages/VersionHistoryPage').then((m) => ({ default: m.VersionHistoryPage })));
const MetadataManagementPage = lazy(() => import('@/modules/dms/pages/MetadataManagementPage').then((m) => ({ default: m.MetadataManagementPage })));
const DigitalSignaturesPage = lazy(() => import('@/modules/dms/pages/DigitalSignaturesPage').then((m) => ({ default: m.DigitalSignaturesPage })));
const ApprovalWorkflowsPage = lazy(() => import('@/modules/dms/pages/ApprovalWorkflowsPage').then((m) => ({ default: m.ApprovalWorkflowsPage })));
const RecordsRetentionPage = lazy(() => import('@/modules/dms/pages/RecordsRetentionPage').then((m) => ({ default: m.RecordsRetentionPage })));
const ArchiveDisposalPage = lazy(() => import('@/modules/dms/pages/ArchiveDisposalPage').then((m) => ({ default: m.ArchiveDisposalPage })));
const FullTextSearchPage = lazy(() => import('@/modules/dms/pages/FullTextSearchPage').then((m) => ({ default: m.FullTextSearchPage })));
const AccessPermissionsPage = lazy(() => import('@/modules/dms/pages/AccessPermissionsPage').then((m) => ({ default: m.AccessPermissionsPage })));
const DocumentAuditPage = lazy(() => import('@/modules/dms/pages/DocumentAuditPage').then((m) => ({ default: m.DocumentAuditPage })));
const DmsReportsPage = lazy(() => import('@/modules/dms/pages/DmsReportsPage').then((m) => ({ default: m.DmsReportsPage })));
const DmsSettingsPage = lazy(() => import('@/modules/dms/pages/DmsSettingsPage').then((m) => ({ default: m.DmsSettingsPage })));

export const dmsRoutes: RouteObject[] = [
  { path: 'dms', element: <Navigate to="/dms/dashboard" replace /> },
  { path: 'dms/dashboard', element: wrap(<DmsDashboardPage />) },
  { path: 'dms/library', element: wrap(<DocumentLibraryPage />) },
  { path: 'dms/my-documents', element: wrap(<MyDocumentsPage />) },
  { path: 'dms/shared', element: wrap(<SharedDocumentsPage />) },
  { path: 'dms/recent', element: wrap(<RecentDocumentsPage />) },
  { path: 'dms/folders', element: wrap(<FoldersCategoriesPage />) },
  { path: 'dms/upload', element: wrap(<DocumentUploadPage />) },
  { path: 'dms/documents/:id', element: wrap(<DocumentViewerPage />) },
  { path: 'dms/versions', element: wrap(<VersionHistoryPage />) },
  { path: 'dms/metadata', element: wrap(<MetadataManagementPage />) },
  { path: 'dms/signatures', element: wrap(<DigitalSignaturesPage />) },
  { path: 'dms/approvals', element: wrap(<ApprovalWorkflowsPage />) },
  { path: 'dms/retention', element: wrap(<RecordsRetentionPage />) },
  { path: 'dms/archive', element: wrap(<ArchiveDisposalPage />) },
  { path: 'dms/search', element: wrap(<FullTextSearchPage />) },
  { path: 'dms/permissions', element: wrap(<AccessPermissionsPage />) },
  { path: 'dms/audit', element: wrap(<DocumentAuditPage />) },
  { path: 'dms/reports', element: wrap(<DmsReportsPage />) },
  { path: 'dms/settings', element: wrap(<DmsSettingsPage />) },
];

import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const MessagingDashboardPage = lazy(() => import('@/modules/messaging/pages/MessagingDashboardPage').then((m) => ({ default: m.MessagingDashboardPage })));
const MessagingInboxPage = lazy(() => import('@/modules/messaging/pages/MessagingInboxPage').then((m) => ({ default: m.MessagingInboxPage })));
const MessagingChannelsPage = lazy(() => import('@/modules/messaging/pages/MessagingChannelsPage').then((m) => ({ default: m.MessagingChannelsPage })));
const MessagingCreateChannelPage = lazy(() => import('@/modules/messaging/pages/MessagingCreateChannelPage').then((m) => ({ default: m.MessagingCreateChannelPage })));
const MessagingThreadPage = lazy(() => import('@/modules/messaging/pages/MessagingThreadPage').then((m) => ({ default: m.MessagingThreadPage })));
const MessagingDirectPage = lazy(() => import('@/modules/messaging/pages/MessagingChannelTypePages').then((m) => ({ default: m.MessagingDirectPage })));
const MessagingGroupsPage = lazy(() => import('@/modules/messaging/pages/MessagingChannelTypePages').then((m) => ({ default: m.MessagingGroupsPage })));
const MessagingDepartmentsPage = lazy(() => import('@/modules/messaging/pages/MessagingChannelTypePages').then((m) => ({ default: m.MessagingDepartmentsPage })));
const MessagingBroadcastsPage = lazy(() => import('@/modules/messaging/pages/MessagingChannelTypePages').then((m) => ({ default: m.MessagingBroadcastsPage })));
const MessagingComposePage = lazy(() => import('@/modules/messaging/pages/MessagingComposePage').then((m) => ({ default: m.MessagingComposePage })));
const MessagingMembersPage = lazy(() => import('@/modules/messaging/pages/MessagingMembersPage').then((m) => ({ default: m.MessagingMembersPage })));
const MessagingArchivedPage = lazy(() => import('@/modules/messaging/pages/MessagingArchivedPage').then((m) => ({ default: m.MessagingArchivedPage })));
const MessagingReceiptsPage = lazy(() => import('@/modules/messaging/pages/MessagingReceiptsPage').then((m) => ({ default: m.MessagingReceiptsPage })));
const MessagingPresencePage = lazy(() => import('@/modules/messaging/pages/MessagingPresencePage').then((m) => ({ default: m.MessagingPresencePage })));
const MessagingFilesPage = lazy(() => import('@/modules/messaging/pages/MessagingFilesPage').then((m) => ({ default: m.MessagingFilesPage })));
const MessagingSearchPage = lazy(() => import('@/modules/messaging/pages/MessagingSearchPage').then((m) => ({ default: m.MessagingSearchPage })));
const MessagingSettingsPage = lazy(() => import('@/modules/messaging/pages/MessagingSettingsPage').then((m) => ({ default: m.MessagingSettingsPage })));

export const messagingRoutes: RouteObject[] = [
  { path: 'messaging', element: <Navigate to="/messaging/dashboard" replace /> },
  { path: 'messaging/dashboard', element: wrap(<MessagingDashboardPage />) },
  { path: 'messaging/inbox', element: wrap(<MessagingInboxPage />) },
  { path: 'messaging/channels', element: wrap(<MessagingChannelsPage />) },
  { path: 'messaging/channels/new', element: wrap(<MessagingCreateChannelPage />) },
  { path: 'messaging/channels/:id', element: wrap(<MessagingThreadPage />) },
  { path: 'messaging/direct', element: wrap(<MessagingDirectPage />) },
  { path: 'messaging/groups', element: wrap(<MessagingGroupsPage />) },
  { path: 'messaging/departments', element: wrap(<MessagingDepartmentsPage />) },
  { path: 'messaging/broadcasts', element: wrap(<MessagingBroadcastsPage />) },
  { path: 'messaging/compose', element: wrap(<MessagingComposePage />) },
  { path: 'messaging/members', element: wrap(<MessagingMembersPage />) },
  { path: 'messaging/archived', element: wrap(<MessagingArchivedPage />) },
  { path: 'messaging/receipts', element: wrap(<MessagingReceiptsPage />) },
  { path: 'messaging/presence', element: wrap(<MessagingPresencePage />) },
  { path: 'messaging/files', element: wrap(<MessagingFilesPage />) },
  { path: 'messaging/search', element: wrap(<MessagingSearchPage />) },
  { path: 'messaging/settings', element: wrap(<MessagingSettingsPage />) },
];

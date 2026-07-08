import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { wrapRoute as wrap } from './wrap-route';

const NotificationDashboardPage = lazy(() => import('@/modules/notification/pages/NotificationDashboardPage').then((m) => ({ default: m.NotificationDashboardPage })));
const NotificationCenterPage = lazy(() => import('@/modules/notification/pages/NotificationCenterPage').then((m) => ({ default: m.NotificationCenterPage })));
const MyNotificationsPage = lazy(() => import('@/modules/notification/pages/MyNotificationsPage').then((m) => ({ default: m.MyNotificationsPage })));
const NotificationAnnouncementsPage = lazy(() => import('@/modules/notification/pages/NotificationAnnouncementsPage').then((m) => ({ default: m.NotificationAnnouncementsPage })));
const BroadcastMessagesPage = lazy(() => import('@/modules/notification/pages/BroadcastMessagesPage').then((m) => ({ default: m.BroadcastMessagesPage })));
const EmailTemplatesPage = lazy(() => import('@/modules/notification/pages/EmailTemplatesPage').then((m) => ({ default: m.EmailTemplatesPage })));
const SmsTemplatesPage = lazy(() => import('@/modules/notification/pages/SmsTemplatesPage').then((m) => ({ default: m.SmsTemplatesPage })));
const PushTemplatesPage = lazy(() => import('@/modules/notification/pages/PushTemplatesPage').then((m) => ({ default: m.PushTemplatesPage })));
const NotificationTemplatesPage = lazy(() => import('@/modules/notification/pages/NotificationTemplatesPage').then((m) => ({ default: m.NotificationTemplatesPage })));
const ScheduledNotificationsPage = lazy(() => import('@/modules/notification/pages/ScheduledNotificationsPage').then((m) => ({ default: m.ScheduledNotificationsPage })));
const ReminderEnginePage = lazy(() => import('@/modules/notification/pages/ReminderEnginePage').then((m) => ({ default: m.ReminderEnginePage })));
const NotificationPreferencesPage = lazy(() => import('@/modules/notification/pages/NotificationPreferencesPage').then((m) => ({ default: m.NotificationPreferencesPage })));
const DeliveryTrackingPage = lazy(() => import('@/modules/notification/pages/DeliveryTrackingPage').then((m) => ({ default: m.DeliveryTrackingPage })));
const FailedDeliveriesPage = lazy(() => import('@/modules/notification/pages/FailedDeliveriesPage').then((m) => ({ default: m.FailedDeliveriesPage })));
const RetryQueuePage = lazy(() => import('@/modules/notification/pages/RetryQueuePage').then((m) => ({ default: m.RetryQueuePage })));
const CommunicationHistoryPage = lazy(() => import('@/modules/notification/pages/CommunicationHistoryPage').then((m) => ({ default: m.CommunicationHistoryPage })));
const NotificationReportsPage = lazy(() => import('@/modules/notification/pages/NotificationReportsPage').then((m) => ({ default: m.NotificationReportsPage })));
const NotificationIntegrationsPage = lazy(() => import('@/modules/notification/pages/NotificationIntegrationsPage').then((m) => ({ default: m.NotificationIntegrationsPage })));
const NotificationSettingsPage = lazy(() => import('@/modules/notification/pages/NotificationSettingsPage').then((m) => ({ default: m.NotificationSettingsPage })));

export const notificationRoutes: RouteObject[] = [
  { path: 'notifications', element: <Navigate to="/notifications/dashboard" replace /> },
  { path: 'notifications/inbox', element: <Navigate to="/notifications/center" replace /> },
  { path: 'notifications/dashboard', element: wrap(<NotificationDashboardPage />) },
  { path: 'notifications/center', element: wrap(<NotificationCenterPage />) },
  { path: 'notifications/my', element: wrap(<MyNotificationsPage />) },
  { path: 'notifications/announcements', element: wrap(<NotificationAnnouncementsPage />) },
  { path: 'notifications/broadcast', element: wrap(<BroadcastMessagesPage />) },
  { path: 'notifications/email-templates', element: wrap(<EmailTemplatesPage />) },
  { path: 'notifications/sms-templates', element: wrap(<SmsTemplatesPage />) },
  { path: 'notifications/push-templates', element: wrap(<PushTemplatesPage />) },
  { path: 'notifications/templates', element: wrap(<NotificationTemplatesPage />) },
  { path: 'notifications/scheduled', element: wrap(<ScheduledNotificationsPage />) },
  { path: 'notifications/reminders', element: wrap(<ReminderEnginePage />) },
  { path: 'notifications/preferences', element: wrap(<NotificationPreferencesPage />) },
  { path: 'notifications/delivery', element: wrap(<DeliveryTrackingPage />) },
  { path: 'notifications/failed', element: wrap(<FailedDeliveriesPage />) },
  { path: 'notifications/retry', element: wrap(<RetryQueuePage />) },
  { path: 'notifications/history', element: wrap(<CommunicationHistoryPage />) },
  { path: 'notifications/reports', element: wrap(<NotificationReportsPage />) },
  { path: 'notifications/integrations', element: wrap(<NotificationIntegrationsPage />) },
  { path: 'notifications/settings', element: wrap(<NotificationSettingsPage />) },
];

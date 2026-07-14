import { baseApi, serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_INBOX,
  MOCK_MASTER_TEMPLATES,
  MOCK_PREFERENCES,
  MOCK_ANNOUNCEMENTS,
  MOCK_BROADCASTS,
  MOCK_SCHEDULED,
  MOCK_REMINDERS,
  MOCK_DELIVERY,
  MOCK_FAILED,
  MOCK_RETRY_QUEUE,
  type InboxNotification,
  type NotificationTemplate,
  type Announcement,
  type BroadcastMessage,
  type ScheduledNotification,
  type ReminderRule,
  type DeliveryRecord,
  type FailedDelivery,
  type RetryQueueItem,
} from '../constants/notification-data';

function mapInbox(raw: Record<string, unknown>): InboxNotification {
  return {
    id: raw.id as string,
    time: (raw.createdAt as string) ?? '',
    title: (raw.title as string) ?? (raw.subject as string) ?? '—',
    service: (raw.sourceService as string) ?? (raw.module as string) ?? '—',
    status: raw.isRead ? 'READ' : 'UNREAD',
    channel: (raw.channel as InboxNotification['channel']) ?? 'IN_APP',
    priority: (raw.priority as string) ?? 'Normal',
    actionRequired: raw.actionRequired as boolean | undefined,
  };
}

function mapTemplate(raw: Record<string, unknown>): NotificationTemplate {
  return {
    id: raw.id as string,
    name: (raw.name as string) ?? '—',
    code: (raw.code as string) ?? '—',
    channel: (raw.channel as NotificationTemplate['channel']) ?? 'EMAIL',
    subject: raw.subject as string | undefined,
    language: (raw.language as string) ?? 'English',
    priority: (raw.priority as string) ?? 'Normal',
    status: ((raw.isActive ?? true) ? 'ACTIVE' : 'INACTIVE') as NotificationTemplate['status'],
    lastModified: (raw.updatedAt as string) ?? (raw.createdAt as string) ?? '',
  };
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── QUERIES ──────────────────────────────────────────────────────────
    getNotificationInbox: builder.query<InboxNotification[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('notification', '/notifications/inbox?limit=50'));
        if (result.error) return { data: MOCK_INBOX };
        const raw = unwrapApiResponse<PaginatedResponse<Record<string, unknown>> | Record<string, unknown>[]>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapInbox) };
      },
      providesTags: ['NotificationInbox'],
    }),

    getNotificationTemplates: builder.query<NotificationTemplate[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('notification', '/templates'));
        if (result.error) return { data: MOCK_MASTER_TEMPLATES };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapTemplate) };
      },
      providesTags: ['NotificationTemplates'],
    }),

    getNotificationPreferences: builder.query<typeof MOCK_PREFERENCES, void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('notification', '/preferences'));
        if (result.error) return { data: MOCK_PREFERENCES };
        const raw = unwrapApiResponse<Record<string, unknown>>(result.data);
        return {
          data: {
            email: raw.emailEnabled as boolean ?? true,
            sms: raw.smsEnabled as boolean ?? true,
            push: raw.pushEnabled as boolean ?? true,
            inApp: raw.inAppEnabled as boolean ?? true,
            quietHoursStart: (raw.quietHoursStart as string) ?? '22:00',
            quietHoursEnd: (raw.quietHoursEnd as string) ?? '06:00',
            language: (raw.preferredLanguage as string) ?? 'English',
            emergencyOverride: raw.emergencyOverride as boolean ?? true,
          },
        };
      },
      providesTags: ['NotificationPreferences'],
    }),

    getAnnouncements: builder.query<Announcement[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('notification', '/announcements'));
        if (result.error) return { data: MOCK_ANNOUNCEMENTS };
        const raw = unwrapApiResponse<Announcement[]>(result.data);
        return { data: raw };
      },
      providesTags: ['NotificationAnnouncements'],
    }),

    getBroadcasts: builder.query<BroadcastMessage[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('notification', '/broadcasts'));
        if (result.error) return { data: MOCK_BROADCASTS };
        const raw = unwrapApiResponse<BroadcastMessage[]>(result.data);
        return { data: raw };
      },
      providesTags: ['NotificationBroadcasts'],
    }),

    getScheduledNotifications: builder.query<ScheduledNotification[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('notification', '/scheduled'));
        if (result.error) return { data: MOCK_SCHEDULED };
        const raw = unwrapApiResponse<ScheduledNotification[]>(result.data);
        return { data: raw };
      },
      providesTags: ['NotificationScheduled'],
    }),

    getReminderRules: builder.query<ReminderRule[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('notification', '/reminders'));
        if (result.error) return { data: MOCK_REMINDERS };
        const raw = unwrapApiResponse<ReminderRule[]>(result.data);
        return { data: raw };
      },
      providesTags: ['NotificationReminders'],
    }),

    getDeliveryRecords: builder.query<DeliveryRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('notification', '/delivery-logs'));
        if (result.error) return { data: MOCK_DELIVERY };
        const raw = unwrapApiResponse<DeliveryRecord[]>(result.data);
        return { data: raw };
      },
      providesTags: ['NotificationDeliveries'],
    }),

    getFailedDeliveries: builder.query<FailedDelivery[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('notification', '/failed-logs'));
        if (result.error) return { data: MOCK_FAILED };
        const raw = unwrapApiResponse<FailedDelivery[]>(result.data);
        return { data: raw };
      },
      providesTags: ['NotificationFailed'],
    }),

    getRetryQueueItems: builder.query<RetryQueueItem[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('notification', '/retry-queue'));
        if (result.error) return { data: MOCK_RETRY_QUEUE };
        const raw = unwrapApiResponse<RetryQueueItem[]>(result.data);
        return { data: raw };
      },
      providesTags: ['NotificationRetryQueue'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    publishAnnouncement: builder.mutation<void, any>({
      query: (body) => serviceQuery('notification', '/announcements', { method: 'POST', body }),
      invalidatesTags: ['NotificationAnnouncements'],
    }),

    sendBroadcast: builder.mutation<void, any>({
      query: (body) => serviceQuery('notification', '/broadcasts', { method: 'POST', body }),
      invalidatesTags: ['NotificationBroadcasts', 'NotificationDeliveries'],
    }),

    createNotificationTemplate: builder.mutation<void, any>({
      query: (body) => serviceQuery('notification', '/templates', { method: 'POST', body }),
      invalidatesTags: ['NotificationTemplates'],
    }),

    scheduleNotification: builder.mutation<void, any>({
      query: (body) => serviceQuery('notification', '/scheduled', { method: 'POST', body }),
      invalidatesTags: ['NotificationScheduled'],
    }),

    createReminderRule: builder.mutation<void, any>({
      query: (body) => serviceQuery('notification', '/reminders', { method: 'POST', body }),
      invalidatesTags: ['NotificationReminders'],
    }),

    updateNotificationPreferences: builder.mutation<void, any>({
      query: (body) => serviceQuery('notification', '/preferences', { method: 'POST', body }),
      invalidatesTags: ['NotificationPreferences'],
    }),

    retryNotification: builder.mutation<void, { id: string }>({
      query: ({ id }) => serviceQuery('notification', `/retry-queue/${id}/retry`, { method: 'POST' }),
      invalidatesTags: ['NotificationRetryQueue', 'NotificationFailed', 'NotificationDeliveries'],
    }),
  }),
});

export const {
  useGetNotificationInboxQuery,
  useGetNotificationTemplatesQuery,
  useGetNotificationPreferencesQuery,
  useGetAnnouncementsQuery,
  useGetBroadcastsQuery,
  useGetScheduledNotificationsQuery,
  useGetReminderRulesQuery,
  useGetDeliveryRecordsQuery,
  useGetFailedDeliveriesQuery,
  useGetRetryQueueItemsQuery,
  usePublishAnnouncementMutation,
  useSendBroadcastMutation,
  useCreateNotificationTemplateMutation,
  useScheduleNotificationMutation,
  useCreateReminderRuleMutation,
  useUpdateNotificationPreferencesMutation,
  useRetryNotificationMutation,
} = notificationApi;

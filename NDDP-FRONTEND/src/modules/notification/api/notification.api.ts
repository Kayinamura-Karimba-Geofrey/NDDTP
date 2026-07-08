import { baseApi, serviceQuery } from '@/services/api/base-api';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_INBOX,
  MOCK_MASTER_TEMPLATES,
  MOCK_PREFERENCES,
  type InboxNotification,
  type NotificationTemplate,
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
    getNotificationInbox: builder.query<InboxNotification[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_INBOX };
        }
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
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_MASTER_TEMPLATES };
        }
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
        if (ENABLE_MOCK_API) {
          await new Promise((r) => setTimeout(r, 200));
          return { data: MOCK_PREFERENCES };
        }
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
  }),
});

export const {
  useGetNotificationInboxQuery,
  useGetNotificationTemplatesQuery,
  useGetNotificationPreferencesQuery,
} = notificationApi;

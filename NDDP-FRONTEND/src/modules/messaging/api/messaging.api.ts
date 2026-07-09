import { baseApi, serviceQuery } from '@/services/api/base-api';
import { mockDelay } from '@/utils/api-mock';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_CHANNELS,
  MOCK_INBOX,
  type MessagingChannel,
  type MessagingMessage,
  type ChannelType,
  type MessagingStatus,
} from '../constants/messaging-data';

function mapChannel(raw: Record<string, unknown>): MessagingChannel {
  return {
    id: raw.id as string,
    name: (raw.name as string) ?? '—',
    type: ((raw.type as string) ?? 'GROUP').toUpperCase() as ChannelType,
    members: Number(raw.memberCount ?? (raw.members as unknown[] | undefined)?.length ?? 0),
    lastMessage: (raw.lastMessagePreview as string) ?? (raw.lastMessage as string),
    lastMessageAt: (raw.lastMessageAt as string) ?? (raw.updatedAt as string),
    unread: Number(raw.unreadCount ?? 0),
    status: (raw.isArchived ? 'ARCHIVED' : 'ACTIVE') as MessagingStatus,
    owner: (raw.ownerName as string) ?? (raw.createdBy as string),
  };
}

function mapMessage(raw: Record<string, unknown>): MessagingMessage {
  return {
    id: raw.id as string,
    channelId: (raw.channelId as string) ?? '—',
    channelName: (raw.channelName as string) ?? '—',
    sender: (raw.senderName as string) ?? (raw.senderId as string) ?? '—',
    body: (raw.body as string) ?? (raw.content as string) ?? '—',
    sentAt: (raw.sentAt as string) ?? (raw.createdAt as string) ?? '',
    status: ((raw.status as string) ?? 'SENT').toUpperCase() as MessagingStatus,
    attachments: Number(raw.attachmentCount ?? 0),
  };
}

export const messagingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyChannels: builder.query<MessagingChannel[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_CHANNELS };
        }
        const result = await baseQuery(serviceQuery('messaging', '/channels/mine'));
        if (result.error) return { data: MOCK_CHANNELS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapChannel) };
      },
      providesTags: ['MessagingChannels'],
    }),

    getChannelMessages: builder.query<MessagingMessage[], string | void>({
      queryFn: async (channelId, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API || !channelId) {
          await mockDelay(200);
          return { data: channelId ? MOCK_INBOX.filter((m) => m.channelId === channelId) : MOCK_INBOX };
        }
        const result = await baseQuery(serviceQuery('messaging', `/messages/channel/${channelId}?limit=50`));
        if (result.error) return { data: MOCK_INBOX };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapMessage) };
      },
      providesTags: ['MessagingMessages'],
    }),
  }),
});

export const {
  useGetMyChannelsQuery,
  useGetChannelMessagesQuery,
} = messagingApi;

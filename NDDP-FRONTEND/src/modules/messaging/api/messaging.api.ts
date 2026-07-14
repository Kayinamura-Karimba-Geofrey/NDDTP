import { baseApi, serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_CHANNELS,
  MOCK_INBOX,
  MOCK_MEMBERS,
  MOCK_RECEIPTS,
  MOCK_PRESENCE,
  MOCK_FILES,
  type MessagingChannel,
  type MessagingMessage,
  type ChannelMember,
  type MessageReceipt,
  type PresenceUser,
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
    // ── QUERIES ──────────────────────────────────────────────────────────
    getMyChannels: builder.query<MessagingChannel[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
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
        if (!channelId) return { data: MOCK_INBOX };
        const result = await baseQuery(serviceQuery('messaging', `/messages/channel/${channelId}?limit=50`));
        if (result.error) return { data: MOCK_INBOX.filter((m) => m.channelId === channelId) };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapMessage) };
      },
      providesTags: ['MessagingMessages'],
    }),

    getChannelMembers: builder.query<ChannelMember[], string | void>({
      queryFn: async (channelId, _a, _b, baseQuery) => {
        const url = channelId ? `/channels/${channelId}/members` : '/members';
        const result = await baseQuery(serviceQuery('messaging', url));
        if (result.error) return { data: MOCK_MEMBERS };
        const raw = unwrapApiResponse<ChannelMember[]>(result.data);
        return { data: raw };
      },
      providesTags: ['MessagingMembers'],
    }),

    getMessageReceipts: builder.query<MessageReceipt[], string | void>({
      queryFn: async (messageId, _a, _b, baseQuery) => {
        const url = messageId ? `/messages/${messageId}/receipts` : '/receipts';
        const result = await baseQuery(serviceQuery('messaging', url));
        if (result.error) return { data: MOCK_RECEIPTS };
        const raw = unwrapApiResponse<MessageReceipt[]>(result.data);
        return { data: raw };
      },
      providesTags: ['MessagingReceipts'],
    }),

    getPresenceUsers: builder.query<PresenceUser[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('messaging', '/presence'));
        if (result.error) return { data: MOCK_PRESENCE };
        const raw = unwrapApiResponse<PresenceUser[]>(result.data);
        return { data: raw };
      },
      providesTags: ['MessagingPresence'],
    }),

    getMessagingFiles: builder.query<typeof MOCK_FILES, void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('messaging', '/files'));
        if (result.error) return { data: MOCK_FILES };
        const raw = unwrapApiResponse<typeof MOCK_FILES>(result.data);
        return { data: raw };
      },
      providesTags: ['MessagingFiles'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createChannel: builder.mutation<void, any>({
      query: (body) => serviceQuery('messaging', '/channels', { method: 'POST', body }),
      invalidatesTags: ['MessagingChannels'],
    }),

    postMessage: builder.mutation<void, any>({
      query: (body) => serviceQuery('messaging', '/messages', { method: 'POST', body }),
      invalidatesTags: ['MessagingMessages', 'MessagingChannels'],
    }),

    updatePresence: builder.mutation<void, { status: MessagingStatus }>({
      query: (body) => serviceQuery('messaging', '/presence/update', { method: 'POST', body }),
      invalidatesTags: ['MessagingPresence'],
    }),

    addMemberToChannel: builder.mutation<void, { channelId: string; userId: string }>({
      query: ({ channelId, userId }) => serviceQuery('messaging', `/channels/${channelId}/members`, { method: 'POST', body: { userId } }),
      invalidatesTags: ['MessagingMembers', 'MessagingChannels'],
    }),

    deleteMessage: builder.mutation<void, { id: string }>({
      query: ({ id }) => serviceQuery('messaging', `/messages/${id}`, { method: 'DELETE' }),
      invalidatesTags: ['MessagingMessages'],
    }),
  }),
});

export const {
  useGetMyChannelsQuery,
  useGetChannelMessagesQuery,
  useGetChannelMembersQuery,
  useGetMessageReceiptsQuery,
  useGetPresenceUsersQuery,
  useGetMessagingFilesQuery,
  useCreateChannelMutation,
  usePostMessageMutation,
  useUpdatePresenceMutation,
  useAddMemberToChannelMutation,
  useDeleteMessageMutation,
} = messagingApi;

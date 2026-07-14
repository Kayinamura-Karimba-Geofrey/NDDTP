import { baseApi, serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_AGENTS,
  MOCK_CONVERSATIONS,
  MOCK_MY_CONVERSATIONS,
  MOCK_MESSAGES,
  type AiAgentRecord,
  type AiConversationRecord,
  type AiMessageRecord,
  type AgentType,
  type AiStatus,
  type ConversationStatus,
  type MessageRole,
  type MessageStatus,
} from '../constants/ai-assistant-data';

function mapAgent(raw: Record<string, unknown>): AiAgentRecord {
  return {
    id: raw.id as string,
    code: (raw.code as string) ?? '—',
    name: (raw.name as string) ?? '—',
    agentType: ((raw.agentType as string) ?? 'GENERAL').toUpperCase() as AgentType,
    modelName: (raw.modelName as string) ?? '—',
    description: (raw.description as string) ?? '—',
    systemPrompt: (raw.systemPrompt as string) ?? '—',
    conversationCount: Number(raw.conversationCount ?? 0),
    status: ((raw.status as string) ?? 'ACTIVE').toUpperCase() as AiStatus,
  };
}

function mapConversation(raw: Record<string, unknown>): AiConversationRecord {
  const agent = raw.agent as { name?: string; id?: string } | undefined;
  return {
    id: raw.id as string,
    title: (raw.title as string) ?? 'Untitled conversation',
    agentId: (raw.agentId as string) ?? agent?.id ?? '',
    agentName: agent?.name ?? (raw.agentName as string) ?? '—',
    status: ((raw.status as string) ?? 'ACTIVE').toUpperCase() as ConversationStatus,
    messageCount: Number(raw.messageCount ?? 0),
    lastMessageAt: raw.lastMessageAt
      ? String(raw.lastMessageAt).replace('T', ' ').slice(0, 16)
      : raw.updatedAt
        ? String(raw.updatedAt).replace('T', ' ').slice(0, 16)
        : '—',
    createdAt: raw.createdAt ? String(raw.createdAt).replace('T', ' ').slice(0, 16) : '—',
  };
}

function mapMessage(raw: Record<string, unknown>): AiMessageRecord {
  return {
    id: raw.id as string,
    conversationId: (raw.conversationId as string) ?? '',
    role: ((raw.role as string) ?? 'USER').toUpperCase() as MessageRole,
    content: (raw.content as string) ?? '',
    status: ((raw.status as string) ?? 'COMPLETED').toUpperCase() as MessageStatus,
    tokenCount: Number(raw.tokenCount ?? 0),
    createdAt: raw.createdAt ? String(raw.createdAt).replace('T', ' ').slice(0, 16) : '—',
  };
}

export const aiAssistantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── QUERIES ──────────────────────────────────────────────────────────
    getAiAgents: builder.query<AiAgentRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('ai-assistant', '/agents'));
        if (result.error) return { data: MOCK_AGENTS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapAgent) };
      },
      providesTags: ['AiAgents'],
    }),

    getMyAiConversations: builder.query<AiConversationRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('ai-assistant', '/conversations/me'));
        if (result.error) return { data: MOCK_MY_CONVERSATIONS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapConversation) };
      },
      providesTags: ['AiConversations'],
    }),

    getAiConversations: builder.query<AiConversationRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('ai-assistant', '/conversations/me'));
        if (result.error) return { data: MOCK_CONVERSATIONS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapConversation) };
      },
      providesTags: ['AiConversations'],
    }),

    getAiMessages: builder.query<AiMessageRecord[], string>({
      queryFn: async (conversationId, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('ai-assistant', `/messages/conversation/${conversationId}`));
        if (result.error) return { data: MOCK_MESSAGES.filter((m) => m.conversationId === conversationId) };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapMessage) };
      },
      providesTags: ['AiMessages'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createAiAgent: builder.mutation<void, any>({
      query: (body) => serviceQuery('ai-assistant', '/agents', { method: 'POST', body }),
      invalidatesTags: ['AiAgents'],
    }),

    createAiConversation: builder.mutation<AiConversationRecord, any>({
      query: (body) => serviceQuery('ai-assistant', '/conversations', { method: 'POST', body }),
      invalidatesTags: ['AiConversations'],
    }),

    postAiMessage: builder.mutation<void, any>({
      query: (body) => serviceQuery('ai-assistant', '/messages', { method: 'POST', body }),
      invalidatesTags: ['AiMessages', 'AiConversations'],
    }),

    closeAiConversation: builder.mutation<void, { id: string }>({
      query: ({ id }) => serviceQuery('ai-assistant', `/conversations/${id}/close`, { method: 'POST' }),
      invalidatesTags: ['AiConversations'],
    }),
  }),
});

export const {
  useGetAiAgentsQuery,
  useGetMyAiConversationsQuery,
  useGetAiConversationsQuery,
  useGetAiMessagesQuery,
  useCreateAiAgentMutation,
  useCreateAiConversationMutation,
  usePostAiMessageMutation,
  useCloseAiConversationMutation,
} = aiAssistantApi;

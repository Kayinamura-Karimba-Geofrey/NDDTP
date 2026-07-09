import { baseApi, serviceQuery } from '@/services/api/base-api';
import { mockDelay } from '@/utils/api-mock';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_INDEXES,
  SEARCH_MOCK_DOCUMENTS,
  MOCK_QUERIES,
  type SearchIndexRecord,
  type SearchDocumentRecord,
  type SearchQueryRecord,
  type SearchHit,
  type IndexType,
  type SearchStatus,
  type QueryStatus,
} from '../constants/search-data';

function mapIndex(raw: Record<string, unknown>): SearchIndexRecord {
  return {
    id: raw.id as string,
    code: (raw.code as string) ?? '—',
    name: (raw.name as string) ?? '—',
    indexType: ((raw.indexType as string) ?? 'CUSTOM').toUpperCase() as IndexType,
    description: (raw.description as string) ?? '—',
    documentCount: Number(raw.documentCount ?? 0),
    status: ((raw.status as string) ?? 'ACTIVE').toUpperCase() as SearchStatus,
    lastIndexedAt: raw.lastIndexedAt ? String(raw.lastIndexedAt).replace('T', ' ').slice(0, 16) : '—',
  };
}

function mapDocument(raw: Record<string, unknown>): SearchDocumentRecord {
  const index = raw.index as { name?: string; id?: string } | undefined;
  return {
    id: raw.id as string,
    indexId: (raw.indexId as string) ?? index?.id ?? '',
    indexName: index?.name ?? (raw.indexName as string) ?? '—',
    externalId: (raw.externalId as string) ?? '—',
    title: (raw.title as string) ?? '—',
    content: (raw.content as string) ?? '—',
    status: ((raw.status as string) ?? 'PENDING').toUpperCase() as SearchStatus,
    indexedAt: raw.indexedAt ? String(raw.indexedAt).replace('T', ' ').slice(0, 16) : (raw.updatedAt ? String(raw.updatedAt).replace('T', ' ').slice(0, 16) : '—'),
  };
}

function mapQuery(raw: Record<string, unknown>): SearchQueryRecord {
  const results = (raw.results as SearchHit[] | undefined) ?? [];
  const index = raw.index as { name?: string } | undefined;
  return {
    id: raw.id as string,
    query: (raw.query as string) ?? '—',
    indexName: index?.name ?? (raw.indexName as string) ?? (raw.indexId ? String(raw.indexId) : 'All indexes'),
    status: ((raw.status as string) ?? 'PENDING').toUpperCase() as QueryStatus,
    hitCount: Number(raw.hitCount ?? results.length ?? 0),
    results: Array.isArray(results) ? results : [],
    submittedBy: (raw.submittedByName as string) ?? (raw.userId as string) ?? (raw.createdBy as string) ?? '—',
    submittedAt: raw.submittedAt
      ? String(raw.submittedAt).replace('T', ' ').slice(0, 16)
      : raw.createdAt
        ? String(raw.createdAt).replace('T', ' ').slice(0, 16)
        : '—',
  };
}

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchIndexes: builder.query<SearchIndexRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_INDEXES };
        }
        const result = await baseQuery(serviceQuery('search', '/indexes'));
        if (result.error) return { data: MOCK_INDEXES };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapIndex) };
      },
      providesTags: ['SearchIndexes'],
    }),

    getSearchDocuments: builder.query<SearchDocumentRecord[], string | void>({
      queryFn: async (indexId, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          const data = indexId ? SEARCH_MOCK_DOCUMENTS.filter((d) => d.indexId === indexId) : SEARCH_MOCK_DOCUMENTS;
          return { data };
        }
        if (!indexId) return { data: SEARCH_MOCK_DOCUMENTS };
        const result = await baseQuery(serviceQuery('search', `/documents/index/${indexId}`));
        if (result.error) return { data: SEARCH_MOCK_DOCUMENTS.filter((d) => d.indexId === indexId) };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapDocument) };
      },
      providesTags: ['SearchDocuments'],
    }),

    getSearchQueries: builder.query<SearchQueryRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_QUERIES };
        }
        const result = await baseQuery(serviceQuery('search', '/queries?limit=50'));
        if (result.error) return { data: MOCK_QUERIES };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapQuery) };
      },
      providesTags: ['SearchQueries'],
    }),

    getMySearchQueries: builder.query<SearchQueryRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_QUERIES.filter((q) => ['Q-701', 'Q-702'].includes(q.id)) };
        }
        const result = await baseQuery(serviceQuery('search', '/queries/mine'));
        if (result.error) return { data: MOCK_QUERIES.filter((q) => ['Q-701', 'Q-702'].includes(q.id)) };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapQuery) };
      },
      providesTags: ['SearchQueries'],
    }),
  }),
});

export const {
  useGetSearchIndexesQuery,
  useGetSearchDocumentsQuery,
  useGetSearchQueriesQuery,
  useGetMySearchQueriesQuery,
} = searchApi;

import { baseApi, serviceQuery } from '@/services/api/base-api';
import { mockDelay } from '@/utils/api-mock';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_NAMESPACES,
  MOCK_ENTRIES,
  MOCK_REVISIONS,
  type ConfigNamespaceRecord,
  type ConfigEntryRecord,
  type ConfigRevisionRecord,
  type AdminStatus,
  type EntryValueType,
  type EnvironmentScope,
} from '../constants/administration-data';

function mapNamespace(raw: Record<string, unknown>): ConfigNamespaceRecord {
  return {
    id: raw.id as string,
    code: (raw.code as string) ?? '—',
    name: (raw.name as string) ?? '—',
    description: (raw.description as string) ?? '—',
    entryCount: Number(raw.entryCount ?? 0),
    status: ((raw.status as string) ?? 'ACTIVE').toUpperCase() as AdminStatus,
    updatedAt: raw.updatedAt ? String(raw.updatedAt).replace('T', ' ').slice(0, 16) : '—',
  };
}

function mapEntry(raw: Record<string, unknown>): ConfigEntryRecord {
  const ns = raw.namespace as { id?: string; code?: string } | undefined;
  return {
    id: raw.id as string,
    namespaceId: (raw.namespaceId as string) ?? ns?.id ?? '',
    namespaceCode: ns?.code ?? (raw.namespaceCode as string) ?? '—',
    key: (raw.key as string) ?? '—',
    value: typeof raw.value === 'string' ? raw.value : JSON.stringify(raw.value ?? ''),
    valueType: ((raw.valueType as string) ?? 'STRING').toUpperCase() as EntryValueType,
    environment: ((raw.environment as string) ?? 'ALL').toUpperCase() as EnvironmentScope,
    description: (raw.description as string) ?? '—',
    status: ((raw.status as string) ?? 'DRAFT').toUpperCase() as AdminStatus,
    version: Number(raw.version ?? 1),
    updatedAt: raw.updatedAt ? String(raw.updatedAt).replace('T', ' ').slice(0, 16) : '—',
  };
}

function mapRevision(raw: Record<string, unknown>): ConfigRevisionRecord {
  return {
    id: raw.id as string,
    entryId: (raw.entryId as string) ?? '',
    entryKey: (raw.entryKey as string) ?? (raw.key as string) ?? '—',
    version: Number(raw.version ?? 0),
    previousValue: typeof raw.previousValue === 'string' ? raw.previousValue : JSON.stringify(raw.previousValue ?? ''),
    newValue: typeof raw.newValue === 'string' ? raw.newValue : JSON.stringify(raw.newValue ?? raw.value ?? ''),
    changedBy: (raw.changedByName as string) ?? (raw.changedBy as string) ?? '—',
    changedAt: raw.changedAt ? String(raw.changedAt).replace('T', ' ').slice(0, 16) : (raw.createdAt ? String(raw.createdAt).replace('T', ' ').slice(0, 16) : '—'),
    note: (raw.note as string) ?? (raw.comment as string) ?? '—',
  };
}

export const configurationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfigNamespaces: builder.query<ConfigNamespaceRecord[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_NAMESPACES };
        }
        const result = await baseQuery(serviceQuery('configuration', '/namespaces'));
        if (result.error) return { data: MOCK_NAMESPACES };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapNamespace) };
      },
      providesTags: ['ConfigNamespaces'],
    }),

    getConfigEntries: builder.query<ConfigEntryRecord[], string | void>({
      queryFn: async (namespaceId, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          const data = namespaceId ? MOCK_ENTRIES.filter((e) => e.namespaceId === namespaceId) : MOCK_ENTRIES;
          return { data };
        }
        if (!namespaceId) return { data: MOCK_ENTRIES };
        const result = await baseQuery(serviceQuery('configuration', `/entries/namespace/${namespaceId}`));
        if (result.error) return { data: MOCK_ENTRIES.filter((e) => e.namespaceId === namespaceId) };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapEntry) };
      },
      providesTags: ['ConfigEntries'],
    }),

    getConfigRevisions: builder.query<ConfigRevisionRecord[], string | void>({
      queryFn: async (entryId, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          const data = entryId ? MOCK_REVISIONS.filter((r) => r.entryId === entryId) : MOCK_REVISIONS;
          return { data };
        }
        if (!entryId) return { data: MOCK_REVISIONS };
        const result = await baseQuery(serviceQuery('configuration', `/revisions/entry/${entryId}`));
        if (result.error) return { data: MOCK_REVISIONS.filter((r) => r.entryId === entryId) };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapRevision) };
      },
      providesTags: ['ConfigRevisions'],
    }),
  }),
});

export const {
  useGetConfigNamespacesQuery,
  useGetConfigEntriesQuery,
  useGetConfigRevisionsQuery,
} = configurationApi;

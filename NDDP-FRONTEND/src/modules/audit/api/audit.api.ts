import { baseApi, serviceQuery } from '@/services/api/base-api';
import { mockDelay } from '@/utils/api-mock';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_AUDIT_LOGS,
  MOCK_SECURITY_EVENTS,
  MOCK_ALERTS,
  type AuditLogRow,
  type SecurityEvent,
  type AlertItem,
} from '../constants/audit-data';

function mapAuditLog(raw: Record<string, unknown>): AuditLogRow {
  return {
    id: raw.id as string,
    time: (raw.timestamp as string) ?? (raw.createdAt as string) ?? '',
    user: (raw.username as string) ?? (raw.userId as string) ?? '—',
    role: raw.role as string | undefined,
    service: (raw.serviceName as string) ?? (raw.service as string) ?? '—',
    action: (raw.action as string) ?? '—',
    resource: (raw.resourceId as string) ?? (raw.resource as string) ?? '—',
    result: ((raw.result as string) ?? (raw.success ? 'SUCCESS' : 'FAILURE')) as AuditLogRow['result'],
    ip: raw.ipAddress as string | undefined,
    correlationId: raw.correlationId as string | undefined,
  };
}

function mapSecurityEvent(raw: Record<string, unknown>): SecurityEvent {
  return {
    id: raw.id as string,
    time: (raw.timestamp as string) ?? (raw.createdAt as string) ?? '',
    type: (raw.eventType as string) ?? (raw.type as string) ?? '—',
    severity: ((raw.severity as string) ?? 'MEDIUM').toUpperCase() as SecurityEvent['severity'],
    user: raw.username as string | undefined,
    source: (raw.source as string) ?? (raw.service as string) ?? '—',
    summary: (raw.summary as string) ?? (raw.description as string) ?? '—',
    status: ((raw.status as string) ?? 'OPEN').toUpperCase() as SecurityEvent['status'],
  };
}

function mapAlert(raw: Record<string, unknown>): AlertItem {
  return {
    id: raw.id as string,
    time: (raw.triggeredAt as string) ?? (raw.createdAt as string) ?? '',
    title: (raw.title as string) ?? (raw.name as string) ?? '—',
    severity: ((raw.severity as string) ?? 'MEDIUM').toUpperCase() as AlertItem['severity'],
    source: (raw.source as string) ?? (raw.targetName as string) ?? '—',
    status: ((raw.status as string) ?? 'OPEN').toUpperCase() as AlertItem['status'],
  };
}

export const auditApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuditLogs: builder.query<AuditLogRow[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_AUDIT_LOGS };
        }
        const result = await baseQuery(serviceQuery('audit', '/audit-logs?limit=50'));
        if (result.error) return { data: MOCK_AUDIT_LOGS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapAuditLog) };
      },
      providesTags: ['AuditLogs'],
    }),

    getSecurityEvents: builder.query<SecurityEvent[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_SECURITY_EVENTS };
        }
        const result = await baseQuery(serviceQuery('audit', '/security-events?limit=50'));
        if (result.error) return { data: MOCK_SECURITY_EVENTS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapSecurityEvent) };
      },
      providesTags: ['SecurityEvents'],
    }),

    getMonitoringAlerts: builder.query<AlertItem[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_ALERTS };
        }
        const result = await baseQuery(serviceQuery('monitoring', '/alerts?limit=50'));
        if (result.error) return { data: MOCK_ALERTS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapAlert) };
      },
      providesTags: ['MonitoringAlerts'],
    }),
  }),
});

export const {
  useGetAuditLogsQuery,
  useGetSecurityEventsQuery,
  useGetMonitoringAlertsQuery,
} = auditApi;

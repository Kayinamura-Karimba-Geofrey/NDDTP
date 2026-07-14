import { baseApi, serviceQuery } from '@/services/api/base-api';
import { unwrapApiResponse } from '@/utils/api-response';
import type { PaginatedResponse } from '@/types';
import {
  MOCK_REPORTS,
  MOCK_KPIS,
  MOCK_SCHEDULED,
  MOCK_SUBSCRIPTIONS,
  MOCK_FORECASTS,
  MOCK_EXPORTS,
  MOCK_DESIGNER_WIDGETS,
  type ReportDefinition,
  type KpiItem,
  type ScheduledReport,
  type ReportSubscription,
  type ForecastItem,
  type ExportJob,
  type DashboardWidget,
} from '../constants/reporting-data';

function mapReport(raw: Record<string, unknown>): ReportDefinition {
  return {
    id: raw.id as string,
    name: (raw.name as string) ?? (raw.title as string) ?? '—',
    category: (raw.category as string) ?? (raw.module as string) ?? 'General',
    description: (raw.description as string) ?? '—',
    owner: (raw.ownerName as string) ?? (raw.createdBy as string) ?? '—',
    format: (raw.defaultFormat as string) ?? (raw.format as string) ?? 'PDF',
    lastRun: (raw.lastRunAt as string) ?? (raw.updatedAt as string),
    status: ((raw.isActive ?? true) ? 'ACTIVE' : 'INACTIVE') as ReportDefinition['status'],
  };
}

function mapKpi(raw: Record<string, unknown>): KpiItem {
  return {
    id: raw.id as string,
    name: (raw.name as string) ?? '—',
    owner: (raw.owner as string) ?? '—',
    domain: (raw.domain as string) ?? (raw.module as string) ?? '—',
    formula: (raw.formula as string) ?? '—',
    target: String(raw.target ?? '—'),
    actual: String(raw.actual ?? raw.value ?? '—'),
    frequency: (raw.frequency as string) ?? 'Monthly',
    thresholds: (raw.thresholds as string) ?? '—',
    trend: (raw.trend as string) ?? '→',
    status: ((raw.isActive ?? true) ? 'ACTIVE' : 'INACTIVE') as KpiItem['status'],
  };
}

function mapSchedule(raw: Record<string, unknown>): ScheduledReport {
  return {
    id: raw.id as string,
    report: (raw.reportName as string) ?? (raw.name as string) ?? '—',
    frequency: (raw.cronExpression as string) ?? (raw.frequency as string) ?? '—',
    nextRun: (raw.nextRunAt as string) ?? '',
    channels: (raw.channels as string) ?? 'Email',
    recipients: Number(raw.recipientCount ?? 0),
    status: (raw.status as ScheduledReport['status']) ?? 'SCHEDULED',
  };
}

export const reportingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── QUERIES ──────────────────────────────────────────────────────────
    getReportLibrary: builder.query<ReportDefinition[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('reporting', '/definitions'));
        if (result.error) return { data: MOCK_REPORTS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapReport) };
      },
      providesTags: ['ReportDefinitions'],
    }),

    getReportingKpis: builder.query<KpiItem[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('analytics', '/metrics'));
        if (result.error) return { data: MOCK_KPIS };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapKpi) };
      },
      providesTags: ['ReportKpis'],
    }),

    getScheduledReports: builder.query<ScheduledReport[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('reporting', '/schedules'));
        if (result.error) return { data: MOCK_SCHEDULED };
        const raw = unwrapApiResponse<Record<string, unknown>[] | PaginatedResponse<Record<string, unknown>>>(result.data);
        const items = Array.isArray(raw) ? raw : raw.data ?? [];
        return { data: items.map(mapSchedule) };
      },
      providesTags: ['ReportSchedules'],
    }),

    getReportSubscriptions: builder.query<ReportSubscription[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('reporting', '/subscriptions'));
        if (result.error) return { data: MOCK_SUBSCRIPTIONS };
        const raw = unwrapApiResponse<ReportSubscription[]>(result.data);
        return { data: raw };
      },
      providesTags: ['ReportSubscriptions'],
    }),

    getForecasts: builder.query<ForecastItem[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('analytics', '/forecasts'));
        if (result.error) return { data: MOCK_FORECASTS };
        const raw = unwrapApiResponse<ForecastItem[]>(result.data);
        return { data: raw };
      },
      providesTags: ['ReportForecasts'],
    }),

    getExportJobs: builder.query<ExportJob[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('reporting', '/exports'));
        if (result.error) return { data: MOCK_EXPORTS };
        const raw = unwrapApiResponse<ExportJob[]>(result.data);
        return { data: raw };
      },
      providesTags: ['ReportExports'],
    }),

    getDashboardWidgets: builder.query<DashboardWidget[], void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        const result = await baseQuery(serviceQuery('reporting', '/widgets'));
        if (result.error) return { data: MOCK_DESIGNER_WIDGETS };
        const raw = unwrapApiResponse<DashboardWidget[]>(result.data);
        return { data: raw };
      },
      providesTags: ['ReportWidgets'],
    }),

    // ── MUTATIONS ─────────────────────────────────────────────────────────
    createReportDefinition: builder.mutation<void, any>({
      query: (body) => serviceQuery('reporting', '/definitions', { method: 'POST', body }),
      invalidatesTags: ['ReportDefinitions'],
    }),

    createKpi: builder.mutation<void, any>({
      query: (body) => serviceQuery('analytics', '/metrics', { method: 'POST', body }),
      invalidatesTags: ['ReportKpis'],
    }),

    scheduleReport: builder.mutation<void, any>({
      query: (body) => serviceQuery('reporting', '/schedules', { method: 'POST', body }),
      invalidatesTags: ['ReportSchedules'],
    }),

    subscribeToReport: builder.mutation<void, any>({
      query: (body) => serviceQuery('reporting', '/subscriptions', { method: 'POST', body }),
      invalidatesTags: ['ReportSubscriptions'],
    }),

    createForecast: builder.mutation<void, any>({
      query: (body) => serviceQuery('analytics', '/forecasts', { method: 'POST', body }),
      invalidatesTags: ['ReportForecasts'],
    }),

    requestExport: builder.mutation<void, any>({
      query: (body) => serviceQuery('reporting', '/exports', { method: 'POST', body }),
      invalidatesTags: ['ReportExports'],
    }),

    createDashboardWidget: builder.mutation<void, any>({
      query: (body) => serviceQuery('reporting', '/widgets', { method: 'POST', body }),
      invalidatesTags: ['ReportWidgets'],
    }),
  }),
});

export const {
  useGetReportLibraryQuery,
  useGetReportingKpisQuery,
  useGetScheduledReportsQuery,
  useGetReportSubscriptionsQuery,
  useGetForecastsQuery,
  useGetExportJobsQuery,
  useGetDashboardWidgetsQuery,
  useCreateReportDefinitionMutation,
  useCreateKpiMutation,
  useScheduleReportMutation,
  useSubscribeToReportMutation,
  useCreateForecastMutation,
  useRequestExportMutation,
  useCreateDashboardWidgetMutation,
} = reportingApi;

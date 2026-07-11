import { baseApi, serviceQuery } from '@/services/api/base-api';
import type { ActivityItem } from '@/types';
import { unwrapPaginated } from '@/utils/api-response';

const mockActivities: ActivityItem[] = [
  { id: '1', title: 'Leave request approved', description: 'Cpt. Niyonsenga — Annual leave 5 days', timestamp: '2026-07-05T10:30:00Z', type: 'approval', module: 'leave' },
  { id: '2', title: 'New recruitment posting', description: 'Software Engineer — RDF Cyber Defence Unit', timestamp: '2026-07-05T09:15:00Z', type: 'system', module: 'recruitment' },
  { id: '3', title: 'Procurement requisition', description: 'Medical supplies — RWF 45M pending approval', timestamp: '2026-07-05T08:00:00Z', type: 'approval', module: 'procurement' },
];

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentActivities: builder.query<ActivityItem[], void>({
      queryFn: async (_arg, _api, _extra, baseQuery) => {
        const result = await baseQuery(
          serviceQuery('notification', '/notifications/inbox?page=1&limit=5'),
        );

        if (!result.data) {
          return { data: mockActivities };
        }

        const paginated = unwrapPaginated<Record<string, unknown>>(result.data);
        const activities: ActivityItem[] = paginated.data.map((n, i) => ({
          id: String(n.id ?? i),
          title: String(n.title ?? n.subject ?? 'Notification'),
          description: String(n.body ?? n.message ?? ''),
          timestamp: String(n.createdAt ?? new Date().toISOString()),
          type: 'notification' as const,
          module: 'notification',
        }));

        return { data: activities.length ? activities : mockActivities };
      },
      providesTags: ['Dashboard'],
    }),
    getDashboardChart: builder.query<{ month: string; personnel: number; expenditure: number }[], void>({
      queryFn: async (_arg, _api, _extra, baseQuery) => {
        const personnelResult = await baseQuery(
          serviceQuery('personnel', '/personnel?page=1&limit=1'),
        );
        const financeResult = await baseQuery(
          serviceQuery('finance', '/expenditures?page=1&limit=1'),
        );

        const personnelTotal = personnelResult.data
          ? unwrapPaginated(personnelResult.data).meta.total
          : 24850;
        const expenditureTotal = financeResult.data
          ? unwrapPaginated(financeResult.data).meta.total
          : 5200;

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const data = months.map((month, i) => ({
          month,
          personnel: Math.round(personnelTotal * (0.97 + i * 0.006)),
          expenditure: Math.round((expenditureTotal / 10) * (0.8 + i * 0.04)),
        }));

        return { data };
      },
      providesTags: ['Dashboard'],
    }),
    getPersonnelKpi: builder.query<{ total: number; active: number }, void>({
      queryFn: async (_arg, _api, _extra, baseQuery) => {
        const result = await baseQuery(serviceQuery('personnel', '/personnel?page=1&limit=1'));
        const total = result.data ? unwrapPaginated(result.data).meta.total : 0;
        return { data: { total, active: total } };
      },
      providesTags: ['Dashboard'],
    }),
    getRecruitmentKpi: builder.query<{ vacancies: number; applications: number }, void>({
      queryFn: async (_arg, _api, _extra, baseQuery) => {
        const vacResult = await baseQuery(serviceQuery('recruitment', '/vacancies?page=1&limit=1'));
        const appResult = await baseQuery(serviceQuery('recruitment', '/applications?page=1&limit=1'));
        const vacancies = vacResult.data ? unwrapPaginated(vacResult.data).meta.total : 0;
        const applications = appResult.data ? unwrapPaginated(appResult.data).meta.total : 0;
        return { data: { vacancies, applications } };
      },
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useGetRecentActivitiesQuery,
  useGetDashboardChartQuery,
  useGetPersonnelKpiQuery,
  useGetRecruitmentKpiQuery,
} = dashboardApi;

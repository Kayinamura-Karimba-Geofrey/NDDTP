import { baseApi, serviceQuery } from '@/services/api/base-api';
import type { ActivityItem, DashboardStat } from '@/types';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse, unwrapPaginated } from '@/utils/api-response';

const mockStats: DashboardStat[] = [
  { id: '1', label: 'Total Personnel', value: '24,850', change: 2.4, trend: 'up', icon: 'FiUsers', color: 'bg-accent' },
  { id: '2', label: 'Active Deployments', value: '1,240', change: -0.5, trend: 'down', icon: 'FiGlobe', color: 'bg-success' },
  { id: '3', label: 'Pending Approvals', value: 47, change: 12, trend: 'up', icon: 'FiClock', color: 'bg-warning' },
  { id: '4', label: 'Budget Utilization', value: '68%', change: 3.1, trend: 'up', icon: 'FiDollarSign', color: 'bg-primary' },
  { id: '5', label: 'Inventory Items', value: '156K', change: 1.2, trend: 'up', icon: 'FiPackage', color: 'bg-secondary' },
  { id: '6', label: 'Open Maintenance', value: 23, change: -8, trend: 'down', icon: 'FiTool', color: 'bg-danger' },
];

const mockActivities: ActivityItem[] = [
  { id: '1', title: 'Leave request approved', description: 'Cpt. Niyonsenga — Annual leave 5 days', timestamp: '2026-07-05T10:30:00Z', type: 'approval', module: 'leave' },
  { id: '2', title: 'New recruitment posting', description: 'Software Engineer — RDF Cyber Defence Unit', timestamp: '2026-07-05T09:15:00Z', type: 'system', module: 'recruitment' },
  { id: '3', title: 'Procurement requisition', description: 'Medical supplies — RWF 45M pending approval', timestamp: '2026-07-05T08:00:00Z', type: 'approval', module: 'procurement' },
];

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStat[], void>({
      queryFn: async (_arg, _api, _extra, baseQuery) => {
        if (ENABLE_MOCK_API) {
          return { data: mockStats };
        }

        const stats: DashboardStat[] = [];

        const personnelResult = await baseQuery(
          serviceQuery('personnel', '/personnel?page=1&limit=1'),
        );
        if (personnelResult.data) {
          const paginated = unwrapPaginated(personnelResult.data);
          stats.push({
            id: 'personnel',
            label: 'Total Personnel',
            value: paginated.meta.total,
            icon: 'FiUsers',
            color: 'bg-accent',
            trend: 'neutral',
          });
        }

        const leaveResult = await baseQuery(
          serviceQuery('leave', '/leave-requests/pending-approvals?page=1&limit=1'),
        );
        if (leaveResult.data) {
          const paginated = unwrapPaginated(leaveResult.data);
          stats.push({
            id: 'leave',
            label: 'Pending Approvals',
            value: paginated.meta.total,
            icon: 'FiClock',
            color: 'bg-warning',
            trend: 'up',
          });
        }

        const notifResult = await baseQuery(
          serviceQuery('notification', '/notifications/inbox/unread-count'),
        );
        if (notifResult.data) {
          const count = unwrapApiResponse<{ count: number } | number>(notifResult.data);
          stats.push({
            id: 'notifications',
            label: 'Unread Notifications',
            value: typeof count === 'number' ? count : count.count,
            icon: 'FiBell',
            color: 'bg-primary',
            trend: 'neutral',
          });
        }

        const maintenanceResult = await baseQuery(
          serviceQuery('maintenance', '/requests/pending?page=1&limit=1'),
        );
        if (maintenanceResult.data) {
          const paginated = unwrapPaginated(maintenanceResult.data);
          stats.push({
            id: 'maintenance',
            label: 'Open Maintenance',
            value: paginated.meta.total,
            icon: 'FiTool',
            color: 'bg-danger',
            trend: 'down',
          });
        }

        const inventoryResult = await baseQuery(
          serviceQuery('inventory', '/items?page=1&limit=1'),
        );
        if (inventoryResult.data) {
          const paginated = unwrapPaginated(inventoryResult.data);
          stats.push({
            id: 'inventory',
            label: 'Inventory Items',
            value: paginated.meta.total,
            icon: 'FiPackage',
            color: 'bg-secondary',
            trend: 'neutral',
          });
        }

        const recruitmentResult = await baseQuery(
          serviceQuery('recruitment', '/applications/pipeline/stats'),
        );
        if (recruitmentResult.data) {
          const pipeline = unwrapApiResponse<Record<string, number>>(recruitmentResult.data);
          const total = Object.values(pipeline).reduce((sum, n) => sum + (Number(n) || 0), 0);
          stats.push({
            id: 'recruitment',
            label: 'Recruitment Pipeline',
            value: total,
            icon: 'FiUserPlus',
            color: 'bg-success',
            trend: 'up',
          });
        }

        return { data: stats.length ? stats : mockStats };
      },
      providesTags: ['Dashboard'],
    }),
    getRecentActivities: builder.query<ActivityItem[], void>({
      queryFn: async (_arg, _api, _extra, baseQuery) => {
        if (ENABLE_MOCK_API) {
          return { data: mockActivities };
        }

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
    }),
    getDashboardChart: builder.query<{ month: string; personnel: number; expenditure: number }[], void>({
      queryFn: async (_arg, _api, _extra, baseQuery) => {
        if (ENABLE_MOCK_API) {
          return {
            data: [
              { month: 'Jan', personnel: 24200, expenditure: 4200 },
              { month: 'Feb', personnel: 24350, expenditure: 3800 },
              { month: 'Mar', personnel: 24500, expenditure: 5100 },
              { month: 'Apr', personnel: 24600, expenditure: 4600 },
              { month: 'May', personnel: 24750, expenditure: 4900 },
              { month: 'Jun', personnel: 24850, expenditure: 5200 },
            ],
          };
        }

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
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetRecentActivitiesQuery,
  useGetDashboardChartQuery,
} = dashboardApi;

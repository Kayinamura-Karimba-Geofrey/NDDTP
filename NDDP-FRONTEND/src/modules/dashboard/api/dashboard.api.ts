import { baseApi } from '@/services/api/base-api';
import type { ActivityItem, DashboardStat } from '@/types';

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
      queryFn: async () => ({ data: mockStats }),
      providesTags: ['Dashboard'],
    }),
    getRecentActivities: builder.query<ActivityItem[], void>({
      queryFn: async () => ({ data: mockActivities }),
    }),
    getDashboardChart: builder.query<{ month: string; personnel: number; expenditure: number }[], void>({
      queryFn: async () => ({
        data: [
          { month: 'Jan', personnel: 24200, expenditure: 4200 },
          { month: 'Feb', personnel: 24350, expenditure: 3800 },
          { month: 'Mar', personnel: 24500, expenditure: 5100 },
          { month: 'Apr', personnel: 24600, expenditure: 4600 },
          { month: 'May', personnel: 24750, expenditure: 4900 },
          { month: 'Jun', personnel: 24850, expenditure: 5200 },
        ],
      }),
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetRecentActivitiesQuery,
  useGetDashboardChartQuery,
} = dashboardApi;

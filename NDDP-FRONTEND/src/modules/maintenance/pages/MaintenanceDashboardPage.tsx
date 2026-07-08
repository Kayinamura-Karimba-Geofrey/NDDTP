import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import {
  MAINTENANCE_DASHBOARD_KPIS,
  WORK_ORDERS_BY_TYPE,
  WORK_ORDER_STATUS,
  WEEKLY_VOLUME,
} from '../constants/maintenance-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#ef4444', '#8b5cf6'];

export function MaintenanceDashboardPage() {
  const kpis = [
    { label: 'Open Work Orders', value: MAINTENANCE_DASHBOARD_KPIS.openWorkOrders },
    { label: 'Pending Requests', value: MAINTENANCE_DASHBOARD_KPIS.pendingRequests },
    { label: 'Overdue Orders', value: MAINTENANCE_DASHBOARD_KPIS.overdueOrders },
    { label: 'Emergency Today', value: MAINTENANCE_DASHBOARD_KPIS.emergencyToday },
    { label: 'Preventive Due', value: MAINTENANCE_DASHBOARD_KPIS.preventiveDue },
    { label: 'In Progress', value: MAINTENANCE_DASHBOARD_KPIS.inProgress },
    { label: 'Completed This Month', value: MAINTENANCE_DASHBOARD_KPIS.completedThisMonth },
    { label: 'Avg Resolution', value: MAINTENANCE_DASHBOARD_KPIS.avgResolutionHours },
    { label: 'SLA Compliance', value: MAINTENANCE_DASHBOARD_KPIS.slaCompliance },
    { label: 'Technicians Active', value: MAINTENANCE_DASHBOARD_KPIS.techniciansActive },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'Dashboard' }]} title="Maintenance Dashboard" description="Work orders, requests, preventive schedules, SLA, and technician workload" />
      <MaintenanceSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Work Orders by Type</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={WORK_ORDERS_BY_TYPE} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                  {WORK_ORDERS_BY_TYPE.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Work Order Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={WORK_ORDER_STATUS}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 9 }} /><YAxis tick={chartAxisStyle} width={32} />
                <Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Weekly Work Order Volume</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={WEEKLY_VOLUME}>
              <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="day" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} />
              <Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="count" stroke={CHART_COLORS.secondary} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

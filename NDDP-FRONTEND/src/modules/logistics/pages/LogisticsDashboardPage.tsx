import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { LogisticsSubNav } from '../components/LogisticsSubNav';
import {
  LOGISTICS_DASHBOARD_KPIS,
  SHIPMENTS_BY_STATUS,
  SHIPMENTS_BY_MODE,
  WEEKLY_DISPATCHES,
} from '../constants/logistics-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export function LogisticsDashboardPage() {
  const kpis = [
    { label: 'Active Shipments', value: LOGISTICS_DASHBOARD_KPIS.activeShipments },
    { label: 'In Transit', value: LOGISTICS_DASHBOARD_KPIS.inTransit },
    { label: 'Delayed', value: LOGISTICS_DASHBOARD_KPIS.delayed },
    { label: 'Delivered (Month)', value: LOGISTICS_DASHBOARD_KPIS.deliveredThisMonth },
    { label: 'Pending Dispatch', value: LOGISTICS_DASHBOARD_KPIS.pendingDispatch },
    { label: 'Locations', value: LOGISTICS_DASHBOARD_KPIS.locations },
    { label: 'Active Routes', value: LOGISTICS_DASHBOARD_KPIS.activeRoutes },
    { label: 'Drafts', value: LOGISTICS_DASHBOARD_KPIS.drafts },
    { label: 'Critical Priority', value: LOGISTICS_DASHBOARD_KPIS.criticalPriority },
    { label: 'On-Time Rate', value: LOGISTICS_DASHBOARD_KPIS.onTimeRate },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Logistics', path: '/logistics/dashboard' }, { label: 'Dashboard' }]} title="Logistics Dashboard" description="Shipments, routes, locations, and in-transit tracking" />
      <LogisticsSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Shipments by Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={SHIPMENTS_BY_STATUS} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                  {SHIPMENTS_BY_STATUS.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Transport Mode Mix</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={SHIPMENTS_BY_MODE}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 9 }} /><YAxis tick={chartAxisStyle} width={32} />
                <Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Weekly Dispatches</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={WEEKLY_DISPATCHES}>
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

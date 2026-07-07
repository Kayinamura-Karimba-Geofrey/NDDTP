import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import {
  PROCUREMENT_DASHBOARD_KPIS,
  PROCUREMENT_BY_CATEGORY,
  PROCUREMENT_STATUS_BREAKDOWN,
  SUPPLIER_PERFORMANCE,
  MONTHLY_PROCUREMENT_TREND,
} from '../constants/procurement-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#94a3b8', '#64748b', '#22c55e'];

export function ProcurementDashboardPage() {
  const kpis = [
    { label: 'Active Requests', value: PROCUREMENT_DASHBOARD_KPIS.activeRequests },
    { label: 'Pending Requisitions', value: PROCUREMENT_DASHBOARD_KPIS.pendingRequisitions },
    { label: 'Pending Approvals', value: PROCUREMENT_DASHBOARD_KPIS.pendingApprovals },
    { label: 'Orders Issued', value: PROCUREMENT_DASHBOARD_KPIS.ordersIssued },
    { label: 'Open Tenders', value: PROCUREMENT_DASHBOARD_KPIS.openTenders },
    { label: 'Active Contracts', value: PROCUREMENT_DASHBOARD_KPIS.activeContracts },
    { label: 'Registered Suppliers', value: PROCUREMENT_DASHBOARD_KPIS.registeredSuppliers },
    { label: 'Awaiting Delivery', value: PROCUREMENT_DASHBOARD_KPIS.awaitingDelivery },
    { label: 'Completed', value: PROCUREMENT_DASHBOARD_KPIS.completedProcurements },
    { label: 'Cycle Time', value: `${PROCUREMENT_DASHBOARD_KPIS.cycleTimeDays} days` },
    { label: 'Procurement Spend', value: `${(PROCUREMENT_DASHBOARD_KPIS.procurementSpend / 1e9).toFixed(2)}B RWF` },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Dashboard' }]} title="Procurement Dashboard" description="Complete overview of acquisition lifecycle and procurement activities" />
      <ProcurementSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Procurement by Category</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={PROCUREMENT_BY_CATEGORY} layout="vertical"><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} /><XAxis type="number" tick={chartAxisStyle} /><YAxis dataKey="name" type="category" tick={{ ...chartAxisStyle, fontSize: 9 }} width={110} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Procurement Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart><Pie data={PROCUREMENT_STATUS_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>{PROCUREMENT_STATUS_BREAKDOWN.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Supplier Performance</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={SUPPLIER_PERFORMANCE}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 8 }} /><YAxis tick={chartAxisStyle} width={32} domain={[0, 100]} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="delivery" fill={CHART_COLORS.primary} /><Bar dataKey="quality" fill={CHART_COLORS.secondary} /><Bar dataKey="compliance" fill="#f59e0b" /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Monthly Procurement Trend</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={MONTHLY_PROCUREMENT_TREND}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} /><Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="requisitions" stroke={CHART_COLORS.primary} strokeWidth={2} /><Line type="monotone" dataKey="orders" stroke={CHART_COLORS.secondary} strokeWidth={2} /></LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { LEAVE_DASHBOARD_KPIS, LEAVE_BY_TYPE, MONTHLY_LEAVE_TREND, DEPARTMENT_LEAVE_DISTRIBUTION, APPROVAL_STATUS_BREAKDOWN } from '../constants/leave-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#94a3b8', '#cbd5e1', '#64748b', '#e2e8f0', '#475569'];

export function LeaveDashboardPage() {
  const kpis = [
    { label: 'Annual Leave Balance', value: `${LEAVE_DASHBOARD_KPIS.annualBalance} days` },
    { label: 'Pending Requests', value: LEAVE_DASHBOARD_KPIS.pendingRequests },
    { label: 'Approved Requests', value: LEAVE_DASHBOARD_KPIS.approvedRequests },
    { label: 'Rejected Requests', value: LEAVE_DASHBOARD_KPIS.rejectedRequests },
    { label: 'Team on Leave', value: LEAVE_DASHBOARD_KPIS.teamOnLeave },
    { label: 'Upcoming Leave', value: LEAVE_DASHBOARD_KPIS.upcomingLeave },
    { label: 'Days Used (YTD)', value: LEAVE_DASHBOARD_KPIS.daysUsedThisYear },
    { label: 'Days Remaining', value: LEAVE_DASHBOARD_KPIS.daysRemaining },
    { label: 'Carry-Over Days', value: LEAVE_DASHBOARD_KPIS.carryOverDays },
    { label: 'Awaiting My Approval', value: LEAVE_DASHBOARD_KPIS.awaitingMyApproval },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Dashboard' }]} title="Leave Dashboard" description="Leave balances, approvals, and team availability at a glance" />
      <LeaveSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Leave by Type</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={LEAVE_BY_TYPE} layout="vertical"><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} /><XAxis type="number" tick={chartAxisStyle} /><YAxis dataKey="name" type="category" tick={{ ...chartAxisStyle, fontSize: 10 }} width={100} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Approval Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart><Pie data={APPROVAL_STATUS_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80}>{APPROVAL_STATUS_BREAKDOWN.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Monthly Leave Trend</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={MONTHLY_LEAVE_TREND}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} /><Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="days" stroke={CHART_COLORS.primary} strokeWidth={2} /></LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Department Leave Distribution</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={DEPARTMENT_LEAVE_DISTRIBUTION}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="name" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

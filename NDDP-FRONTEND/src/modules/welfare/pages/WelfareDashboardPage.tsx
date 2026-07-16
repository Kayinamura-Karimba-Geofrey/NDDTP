import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { WelfareSubNav } from '../components/WelfareSubNav';
import { WELFARE_DASHBOARD_KPIS, PROGRAM_PARTICIPATION, ASSISTANCE_STATUS_BREAKDOWN, PARTICIPATION_BY_DEPARTMENT, MONTHLY_WELFARE_ACTIVITIES } from '../constants/welfare-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = ['#f59e0b', CHART_COLORS.primary, '#ef4444', CHART_COLORS.secondary];

export function WelfareDashboardPage() {
  const kpis = [
    { label: 'Active Programs', value: WELFARE_DASHBOARD_KPIS.activePrograms },
    { label: 'Employees Enrolled', value: WELFARE_DASHBOARD_KPIS.employeesEnrolled.toLocaleString() },
    { label: 'Pending Requests', value: WELFARE_DASHBOARD_KPIS.pendingRequests },
    { label: 'Approved Requests', value: WELFARE_DASHBOARD_KPIS.approvedRequests },
    { label: 'Emergency Cases', value: WELFARE_DASHBOARD_KPIS.emergencyCases },
    { label: 'Upcoming Events', value: WELFARE_DASHBOARD_KPIS.upcomingEvents },
    { label: 'Active Campaigns', value: WELFARE_DASHBOARD_KPIS.activeCampaigns },
    { label: 'Counseling Referrals', value: WELFARE_DASHBOARD_KPIS.counselingReferrals },
    { label: 'Budget Utilization', value: `${WELFARE_DASHBOARD_KPIS.budgetUtilization}%` },
    { label: 'Participation Rate', value: `${WELFARE_DASHBOARD_KPIS.participationRate}%` },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'Dashboard' }]} title="Welfare Dashboard" description="Overview of welfare programs, assistance, and employee engagement" />
      <WelfareSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Program Participation</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={PROGRAM_PARTICIPATION} layout="vertical"><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} /><XAxis type="number" tick={chartAxisStyle} /><YAxis dataKey="name" type="category" tick={{ ...chartAxisStyle, fontSize: 10 }} width={120} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Assistance Requests</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart><Pie data={ASSISTANCE_STATUS_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80}>{ASSISTANCE_STATUS_BREAKDOWN.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Participation by Department</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={PARTICIPATION_BY_DEPARTMENT}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="name" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Monthly Welfare Activities</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={MONTHLY_WELFARE_ACTIVITIES}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} /><Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="activities" stroke={CHART_COLORS.primary} strokeWidth={2} /></LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

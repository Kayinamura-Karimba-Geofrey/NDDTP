import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { VisitorSubNav } from '../components/VisitorSubNav';
import {
  VISITOR_DASHBOARD_KPIS,
  VISITS_BY_SITE,
  DAILY_CHECKINS,
  VISIT_STATUS_BREAKDOWN,
} from '../constants/visitor-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#8b5cf6', '#ef4444'];

export function VisitorDashboardPage() {
  const kpis = [
    { label: 'Visitors Today', value: VISITOR_DASHBOARD_KPIS.visitorsToday },
    { label: 'Currently On Site', value: VISITOR_DASHBOARD_KPIS.currentlyOnSite },
    { label: 'Pending Approvals', value: VISITOR_DASHBOARD_KPIS.pendingApprovals },
    { label: 'Check-Ins Today', value: VISITOR_DASHBOARD_KPIS.checkInsToday },
    { label: 'Check-Outs Today', value: VISITOR_DASHBOARD_KPIS.checkOutsToday },
    { label: 'Active Sites', value: VISITOR_DASHBOARD_KPIS.activeSites },
    { label: 'Blacklisted', value: VISITOR_DASHBOARD_KPIS.blacklisted },
    { label: 'Scheduled Tomorrow', value: VISITOR_DASHBOARD_KPIS.scheduledTomorrow },
    { label: 'Avg Visit Duration', value: VISITOR_DASHBOARD_KPIS.avgVisitDuration },
    { label: 'Approval Rate', value: VISITOR_DASHBOARD_KPIS.approvalRate },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Visitors', path: '/visitors/dashboard' }, { label: 'Dashboard' }]} title="Visitor Management Dashboard" description="Sites, visit requests, check-ins, badges, and security controls" />
      <VisitorSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Visits by Site</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={VISITS_BY_SITE} layout="vertical">
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} />
                <XAxis type="number" tick={chartAxisStyle} />
                <YAxis dataKey="name" type="category" tick={{ ...chartAxisStyle, fontSize: 9 }} width={100} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Visit Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={VISIT_STATUS_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                  {VISIT_STATUS_BREAKDOWN.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Check-In Volume by Hour</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={DAILY_CHECKINS}>
              <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="hour" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} />
              <Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="count" stroke={CHART_COLORS.secondary} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

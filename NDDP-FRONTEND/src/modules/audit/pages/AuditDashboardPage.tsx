import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { AuditSubNav } from '../components/AuditSubNav';
import {
  AUDIT_DASHBOARD_KPIS,
  AUDIT_EVENTS_BY_SERVICE,
  LOGIN_ACTIVITY,
  API_PERFORMANCE,
  SECURITY_SEVERITY,
  INFRA_HEALTH,
} from '../constants/audit-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#ef4444'];

export function AuditDashboardPage() {
  const kpis = [
    { label: 'Audit Events Today', value: AUDIT_DASHBOARD_KPIS.auditEventsToday },
    { label: 'Active Users', value: AUDIT_DASHBOARD_KPIS.activeUsers },
    { label: 'Failed Logins', value: AUDIT_DASHBOARD_KPIS.failedLogins },
    { label: 'Critical Alerts', value: AUDIT_DASHBOARD_KPIS.criticalAlerts },
    { label: 'Open Incidents', value: AUDIT_DASHBOARD_KPIS.openIncidents },
    { label: 'System Availability', value: AUDIT_DASHBOARD_KPIS.systemAvailability },
    { label: 'Avg API Response', value: AUDIT_DASHBOARD_KPIS.avgApiResponse },
    { label: 'Active Services', value: AUDIT_DASHBOARD_KPIS.activeServices },
    { label: 'Error Rate', value: AUDIT_DASHBOARD_KPIS.errorRate },
    { label: 'Compliance Status', value: AUDIT_DASHBOARD_KPIS.complianceStatus },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'Dashboard' }]} title="Audit & Compliance Dashboard" description="Operational command center for auditing, monitoring, security, and compliance" />
      <AuditSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Audit Events by Service</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={AUDIT_EVENTS_BY_SERVICE} layout="vertical">
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} />
                <XAxis type="number" tick={chartAxisStyle} />
                <YAxis dataKey="name" type="category" tick={{ ...chartAxisStyle, fontSize: 9 }} width={80} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Login Activity</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={LOGIN_ACTIVITY}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="hour" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} />
                <Tooltip {...chartTooltipStyle} /><Legend />
                <Line type="monotone" dataKey="success" stroke={CHART_COLORS.primary} strokeWidth={2} />
                <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">API Performance (ms)</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={API_PERFORMANCE}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 8 }} /><YAxis tick={chartAxisStyle} width={32} />
                <Tooltip {...chartTooltipStyle} /><Bar dataKey="ms" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Security Events</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={SECURITY_SEVERITY} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70}>
                  {SECURITY_SEVERITY.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Infrastructure Health %</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={INFRA_HEALTH}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="name" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} domain={[0, 100]} />
                <Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

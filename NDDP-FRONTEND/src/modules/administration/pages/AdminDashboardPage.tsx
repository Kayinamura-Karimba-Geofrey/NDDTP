import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { AdminSubNav } from '../components/AdminSubNav';
import {
  ADMIN_DASHBOARD_KPIS,
  ENTRIES_BY_STATUS,
  ENTRIES_BY_ENV,
  WEEKLY_REVISIONS,
} from '../constants/administration-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#ef4444'];

export function AdminDashboardPage() {
  const kpis = [
    { label: 'Namespaces', value: ADMIN_DASHBOARD_KPIS.namespaces },
    { label: 'Active Entries', value: ADMIN_DASHBOARD_KPIS.activeEntries },
    { label: 'Draft Entries', value: ADMIN_DASHBOARD_KPIS.draftEntries },
    { label: 'Deprecated', value: ADMIN_DASHBOARD_KPIS.deprecatedEntries },
    { label: 'Revisions (Week)', value: ADMIN_DASHBOARD_KPIS.revisionsThisWeek },
    { label: 'Services Healthy', value: ADMIN_DASHBOARD_KPIS.servicesHealthy },
    { label: 'Services Degraded', value: ADMIN_DASHBOARD_KPIS.servicesDegraded },
    { label: 'Pending Activations', value: ADMIN_DASHBOARD_KPIS.pendingActivations },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'System Admin', path: '/administration/dashboard' }, { label: 'Dashboard' }]}
        title="System Administration"
        description="Configuration namespaces, entries, revisions, and platform health"
        actions={<Link to="/administration/authorization"><Button size="sm" variant="outline">Authorization</Button></Link>}
      />
      <AdminSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Entries by Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={ENTRIES_BY_STATUS} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                  {ENTRIES_BY_STATUS.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Entries by Environment</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={ENTRIES_BY_ENV}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 9 }} /><YAxis tick={chartAxisStyle} width={32} />
                <Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Weekly Configuration Revisions</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={WEEKLY_REVISIONS}>
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

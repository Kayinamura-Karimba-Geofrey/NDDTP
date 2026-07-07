import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import dayjs from 'dayjs';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import {
  AUTH_DASHBOARD_KPIS,
  ROLE_DISTRIBUTION,
  PERMISSION_USAGE,
  ACCESS_REQUEST_TRENDS,
  AUTH_RECENT_ACTIVITY,
} from '../constants/authorization-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#94a3b8', '#cbd5e1', '#e2e8f0', '#64748b'];

export function AuthorizationDashboardPage() {
  const kpis = [
    { label: 'Total Roles', value: AUTH_DASHBOARD_KPIS.totalRoles },
    { label: 'Total Permissions', value: AUTH_DASHBOARD_KPIS.totalPermissions },
    { label: 'Active Users with Roles', value: AUTH_DASHBOARD_KPIS.activeUsersWithRoles },
    { label: 'Pending Access Requests', value: AUTH_DASHBOARD_KPIS.pendingAccessRequests },
    { label: 'Temporary Access', value: AUTH_DASHBOARD_KPIS.temporaryAccess },
    { label: 'Policy Violations', value: AUTH_DASHBOARD_KPIS.policyViolations },
    { label: 'Modified Roles (30d)', value: AUTH_DASHBOARD_KPIS.recentlyModifiedRoles },
    { label: 'New Permissions (30d)', value: AUTH_DASHBOARD_KPIS.recentlyCreatedPermissions },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Administration', path: '/administration' }, { label: 'Authorization' }]}
        title="Authorization Dashboard"
        description="Overview of platform access control, roles, and permissions"
      />
      <AuthorizationSubNav />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{kpi.label}</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-sm">Role Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={ROLE_DISTRIBUTION} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {ROLE_DISTRIBUTION.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip {...chartTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-sm">Most Assigned Permissions</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={PERMISSION_USAGE} layout="vertical" margin={{ left: 80 }}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} />
                <XAxis type="number" tick={chartAxisStyle} />
                <YAxis type="category" dataKey="name" tick={{ ...chartAxisStyle, fontSize: 10 }} width={120} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="count" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-sm">Access Request Trends</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={ACCESS_REQUEST_TRENDS}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={chartAxisStyle} />
                <YAxis tick={chartAxisStyle} width={32} />
                <Tooltip {...chartTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="pending" stroke={CHART_COLORS.secondary} name="Pending" />
                <Line type="monotone" dataKey="approved" stroke={CHART_COLORS.primary} name="Approved" />
                <Line type="monotone" dataKey="rejected" stroke="#ef4444" name="Rejected" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-sm">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {AUTH_RECENT_ACTIVITY.map((item) => (
                <li key={item.id} className="flex items-start gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.module} · {item.user}</p>
                  </div>
                  <time className="shrink-0 text-xs text-muted-foreground">{dayjs(item.timestamp).format('MMM D, HH:mm')}</time>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

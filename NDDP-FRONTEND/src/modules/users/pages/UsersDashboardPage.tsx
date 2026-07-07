import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import dayjs from 'dayjs';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { UserSubNav } from '../components/UserSubNav';
import {
  USER_DASHBOARD_KPIS,
  USERS_BY_DEPARTMENT,
  USERS_BY_STATUS,
  MONTHLY_USER_GROWTH,
  USER_RECENT_ACTIVITY,
} from '../constants/users-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#94a3b8', '#cbd5e1', '#e2e8f0', '#64748b', '#475569'];

export function UsersDashboardPage() {
  const kpis = [
    { label: 'Total Users', value: USER_DASHBOARD_KPIS.totalUsers },
    { label: 'Active Users', value: USER_DASHBOARD_KPIS.activeUsers },
    { label: 'Inactive Users', value: USER_DASHBOARD_KPIS.inactiveUsers },
    { label: 'Suspended Users', value: USER_DASHBOARD_KPIS.suspendedUsers },
    { label: 'Pending Activation', value: USER_DASHBOARD_KPIS.pendingActivation },
    { label: 'Recently Created', value: USER_DASHBOARD_KPIS.recentlyCreated },
    { label: 'Locked Accounts', value: USER_DASHBOARD_KPIS.lockedAccounts },
    { label: 'Without Roles', value: USER_DASHBOARD_KPIS.usersWithoutRoles },
    { label: 'Missing Profile', value: USER_DASHBOARD_KPIS.missingProfile },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'User Management', path: '/users/dashboard' }, { label: 'Dashboard' }]} title="User Management Dashboard" description="Complete overview of platform users" />
      <UserSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold text-foreground">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Users by Department</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={USERS_BY_DEPARTMENT}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 10 }} /><YAxis tick={chartAxisStyle} width={32} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Users by Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart><Pie data={USERS_BY_STATUS} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} label>{USERS_BY_STATUS.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Monthly User Growth</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={MONTHLY_USER_GROWTH}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={40} /><Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="users" stroke={CHART_COLORS.primary} strokeWidth={2} /></LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Recent Activity</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {USER_RECENT_ACTIVITY.map((a) => (
                <li key={a.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                  <div><p className="text-sm font-medium text-foreground">{a.action}</p><p className="text-xs text-muted-foreground">{a.user}</p></div>
                  <time className="text-xs text-muted-foreground">{dayjs(a.timestamp).format('MMM D, HH:mm')}</time>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

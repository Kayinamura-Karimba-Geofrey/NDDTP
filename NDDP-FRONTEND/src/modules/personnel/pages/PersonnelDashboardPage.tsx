import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import dayjs from 'dayjs';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import {
  PERSONNEL_DASHBOARD_KPIS,
  PERSONNEL_BY_DEPARTMENT,
  PERSONNEL_BY_EMPLOYMENT_TYPE,
  AGE_DISTRIBUTION,
  PERSONNEL_GROWTH,
  CONTRACT_EXPIRY,
  QUALIFICATION_DISTRIBUTION,
  PERSONNEL_RECENT_ACTIVITY,
  UPCOMING_RETIREMENTS,
} from '../constants/personnel-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#94a3b8', '#cbd5e1'];

export function PersonnelDashboardPage() {
  const kpis = [
    { label: 'Total Personnel', value: PERSONNEL_DASHBOARD_KPIS.totalPersonnel.toLocaleString() },
    { label: 'Active Personnel', value: PERSONNEL_DASHBOARD_KPIS.activePersonnel.toLocaleString() },
    { label: 'New This Month', value: PERSONNEL_DASHBOARD_KPIS.newThisMonth },
    { label: 'On Leave', value: PERSONNEL_DASHBOARD_KPIS.onLeave },
    { label: 'In Training', value: PERSONNEL_DASHBOARD_KPIS.inTraining },
    { label: 'Near Retirement', value: PERSONNEL_DASHBOARD_KPIS.nearRetirement },
    { label: 'Vacant Positions', value: PERSONNEL_DASHBOARD_KPIS.vacantPositions },
    { label: 'Pending Requests', value: PERSONNEL_DASHBOARD_KPIS.pendingRequests },
    { label: 'Contract Employees', value: PERSONNEL_DASHBOARD_KPIS.contractEmployees.toLocaleString() },
    { label: 'Permanent Employees', value: PERSONNEL_DASHBOARD_KPIS.permanentEmployees.toLocaleString() },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Dashboard' }]} title="Personnel Dashboard" description="HRIS overview — headcount, assignments, and HR actions requiring attention" />
      <PersonnelSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold text-foreground">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Personnel by Department</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={PERSONNEL_BY_DEPARTMENT}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 10 }} /><YAxis tick={chartAxisStyle} width={40} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Personnel by Employment Type</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart><Pie data={PERSONNEL_BY_EMPLOYMENT_TYPE} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} label>{PERSONNEL_BY_EMPLOYMENT_TYPE.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Age Distribution</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={AGE_DISTRIBUTION} layout="vertical"><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} /><XAxis type="number" tick={chartAxisStyle} /><YAxis dataKey="range" type="category" tick={chartAxisStyle} width={50} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="count" fill={CHART_COLORS.secondary} radius={[0, 4, 4, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Personnel Growth</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={PERSONNEL_GROWTH}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={48} /><Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="count" stroke={CHART_COLORS.primary} strokeWidth={2} /></LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Contract Expiry</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={CONTRACT_EXPIRY}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Qualification Distribution</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={QUALIFICATION_DISTRIBUTION} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>{QUALIFICATION_DISTRIBUTION.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Upcoming Retirements</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {UPCOMING_RETIREMENTS.map((r) => (
                <li key={r.name} className="flex justify-between border-b border-border pb-2 last:border-0">
                  <div><p className="text-sm font-medium">{r.name}</p><p className="text-xs text-muted-foreground">{r.department}</p></div>
                  <time className="text-xs text-muted-foreground">{dayjs(r.date).format('MMM D, YYYY')}</time>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Recent Activity</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {PERSONNEL_RECENT_ACTIVITY.map((a) => (
                <li key={a.id} className="flex justify-between border-b border-border pb-2 last:border-0">
                  <div><p className="text-sm font-medium">{a.action}</p><p className="text-xs text-muted-foreground">{a.personnel}</p></div>
                  <time className="text-xs text-muted-foreground">{dayjs(a.timestamp).format('MMM D')}</time>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

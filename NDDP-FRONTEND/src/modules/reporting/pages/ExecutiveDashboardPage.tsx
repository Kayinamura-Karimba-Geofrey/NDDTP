import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ReportingSubNav } from '../components/ReportingSubNav';
import {
  REPORTING_DASHBOARD_KPIS,
  PERSONNEL_BY_DEPT,
  BUDGET_UTILIZATION,
  TRAINING_PROGRESS,
  FLEET_UTILIZATION_TREND,
  ASSET_STATUS,
  PERFORMANCE_BY_DEPT,
} from '../constants/reporting-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#8b5cf6', '#06b6d4', '#ef4444'];

export function ExecutiveDashboardPage() {
  const kpis = [
    { label: 'Total Personnel', value: REPORTING_DASHBOARD_KPIS.totalPersonnel },
    { label: 'Active Employees', value: REPORTING_DASHBOARD_KPIS.activeEmployees },
    { label: 'Recruitment Progress', value: REPORTING_DASHBOARD_KPIS.recruitmentProgress },
    { label: 'Training Completion', value: REPORTING_DASHBOARD_KPIS.trainingCompletion },
    { label: 'Budget Utilization', value: REPORTING_DASHBOARD_KPIS.budgetUtilization },
    { label: 'Procurement Status', value: REPORTING_DASHBOARD_KPIS.procurementStatus },
    { label: 'Fleet Utilization', value: REPORTING_DASHBOARD_KPIS.fleetUtilization },
    { label: 'Asset Utilization', value: REPORTING_DASHBOARD_KPIS.assetUtilization },
    { label: 'Leave Statistics', value: REPORTING_DASHBOARD_KPIS.leaveStatistics },
    { label: 'Medical Readiness', value: REPORTING_DASHBOARD_KPIS.medicalReadiness },
    { label: 'Performance Score', value: REPORTING_DASHBOARD_KPIS.performanceScore },
    { label: 'System Availability', value: REPORTING_DASHBOARD_KPIS.systemAvailability },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Executive' }]} title="Executive Dashboard" description="Leadership view of organizational performance across all NDDTP services" />
      <ReportingSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Personnel by Department</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={PERSONNEL_BY_DEPT} layout="vertical">
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
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Budget Utilization %</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={BUDGET_UTILIZATION}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 8 }} /><YAxis tick={chartAxisStyle} width={32} />
                <Tooltip {...chartTooltipStyle} /><Bar dataKey="utilized" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Training Progress %</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={TRAINING_PROGRESS}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} domain={[60, 100]} />
                <Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="rate" stroke={CHART_COLORS.primary} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Fleet Utilization %</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={FLEET_UTILIZATION_TREND}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} domain={[70, 90]} />
                <Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="rate" stroke={CHART_COLORS.secondary} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Asset Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={ASSET_STATUS} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70}>
                  {ASSET_STATUS.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Performance by Department</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={PERFORMANCE_BY_DEPT}>
              <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="name" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} domain={[0, 5]} />
              <Tooltip {...chartTooltipStyle} /><Bar dataKey="score" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

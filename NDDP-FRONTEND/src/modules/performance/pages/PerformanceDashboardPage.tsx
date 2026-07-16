import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PERFORMANCE_DASHBOARD_KPIS, PERFORMANCE_DISTRIBUTION, DEPARTMENT_PERFORMANCE, GOAL_ACHIEVEMENT, COMPETENCY_DISTRIBUTION, PERFORMANCE_TREND } from '../constants/performance-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#22c55e', '#f59e0b', '#ef4444'];

export function PerformanceDashboardPage() {
  const kpis = [
    { label: 'Active Reviews', value: PERFORMANCE_DASHBOARD_KPIS.activeReviews },
    { label: 'Employees Reviewed', value: PERFORMANCE_DASHBOARD_KPIS.employeesReviewed },
    { label: 'Reviews Pending', value: PERFORMANCE_DASHBOARD_KPIS.reviewsPending },
    { label: 'Avg Score', value: PERFORMANCE_DASHBOARD_KPIS.averageScore },
    { label: 'High Performers', value: PERFORMANCE_DASHBOARD_KPIS.highPerformers },
    { label: 'On PIPs', value: PERFORMANCE_DASHBOARD_KPIS.onImprovementPlans },
    { label: 'Dev Plans Done', value: PERFORMANCE_DASHBOARD_KPIS.completedDevelopmentPlans },
    { label: 'Coaching Sessions', value: PERFORMANCE_DASHBOARD_KPIS.activeCoachingSessions },
    { label: 'Outstanding Objectives', value: PERFORMANCE_DASHBOARD_KPIS.outstandingObjectives },
    { label: 'Org Goal Achievement', value: `${PERFORMANCE_DASHBOARD_KPIS.orgGoalAchievement}%` },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Dashboard' }]} title="Performance Dashboard" description="Workforce performance overview — goals, reviews, and development" />
      <PerformanceSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (<Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Performance Distribution</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}><PieChart><Pie data={PERFORMANCE_DISTRIBUTION} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>{PERFORMANCE_DISTRIBUTION.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '10px' }} /></PieChart></ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Department Performance</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}><BarChart data={DEPARTMENT_PERFORMANCE} layout="vertical"><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} /><XAxis type="number" domain={[0, 5]} tick={chartAxisStyle} /><YAxis dataKey="name" type="category" tick={{ ...chartAxisStyle, fontSize: 9 }} width={80} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="score" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Goal Achievement</CardTitle></CardHeader>
          <CardContent className="pt-4"><ResponsiveContainer width="100%" height={200}><BarChart data={GOAL_ACHIEVEMENT}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="level" tick={{ ...chartAxisStyle, fontSize: 8 }} /><YAxis tick={chartAxisStyle} domain={[0, 100]} width={32} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="percent" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Competency Distribution</CardTitle></CardHeader>
          <CardContent className="pt-4"><ResponsiveContainer width="100%" height={200}><RadarChart data={COMPETENCY_DISTRIBUTION}><PolarGrid /><PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} /><PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} /><Radar dataKey="A" stroke={CHART_COLORS.primary} fill={CHART_COLORS.primary} fillOpacity={0.4} /><Tooltip {...chartTooltipStyle} /></RadarChart></ResponsiveContainer></CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Performance Trends</CardTitle></CardHeader>
          <CardContent className="pt-4"><ResponsiveContainer width="100%" height={200}><LineChart data={PERFORMANCE_TREND}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="quarter" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} domain={[3, 5]} width={28} /><Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="score" stroke={CHART_COLORS.primary} strokeWidth={2} /></LineChart></ResponsiveContainer></CardContent>
        </Card>
      </div>
    </div>
  );
}

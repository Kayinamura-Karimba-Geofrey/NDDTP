import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TRAINING_DASHBOARD_KPIS, PARTICIPATION_BY_DEPARTMENT, COURSE_COMPLETION_BREAKDOWN, CERTIFICATION_STATUS_BREAKDOWN, MONTHLY_TRAINING_HOURS, COMPETENCY_RADAR, TRAINING_CATEGORIES } from '../constants/training-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#94a3b8'];

export function TrainingDashboardPage() {
  const kpis = [
    { label: 'Active Programs', value: TRAINING_DASHBOARD_KPIS.activePrograms },
    { label: 'Available Courses', value: TRAINING_DASHBOARD_KPIS.availableCourses },
    { label: 'Personnel Enrolled', value: TRAINING_DASHBOARD_KPIS.personnelEnrolled.toLocaleString() },
    { label: 'Courses In Progress', value: TRAINING_DASHBOARD_KPIS.coursesInProgress },
    { label: 'Courses Completed', value: TRAINING_DASHBOARD_KPIS.coursesCompleted },
    { label: 'Certifications Issued', value: TRAINING_DASHBOARD_KPIS.certificationsIssued },
    { label: 'Certs Expiring Soon', value: TRAINING_DASHBOARD_KPIS.certificationsExpiring },
    { label: 'Upcoming Sessions', value: TRAINING_DASHBOARD_KPIS.upcomingSessions },
    { label: 'Pending Requests', value: TRAINING_DASHBOARD_KPIS.pendingRequests },
    { label: 'Completion Rate', value: `${TRAINING_DASHBOARD_KPIS.completionRate}%` },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Dashboard' }]} title="Training Dashboard" description="Learning programs, enrollments, and competency overview" />
      <TrainingSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Participation by Department</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={PARTICIPATION_BY_DEPARTMENT}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="name" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Course Completion</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart><Pie data={COURSE_COMPLETION_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>{COURSE_COMPLETION_BREAKDOWN.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Certification Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={CERTIFICATION_STATUS_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70}>{CERTIFICATION_STATUS_BREAKDOWN.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '10px' }} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Monthly Training Hours</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={MONTHLY_TRAINING_HOURS}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} /><Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="hours" stroke={CHART_COLORS.primary} strokeWidth={2} /></LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Training Categories</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={TRAINING_CATEGORIES} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>{TRAINING_CATEGORIES.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '9px' }} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Competency Progress</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={COMPETENCY_RADAR}><PolarGrid stroke={CHART_COLORS.grid} /><PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} /><PolarRadiusAxis tick={chartAxisStyle} /><Radar dataKey="value" stroke={CHART_COLORS.primary} fill={CHART_COLORS.primary} fillOpacity={0.3} /><Tooltip {...chartTooltipStyle} /></RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

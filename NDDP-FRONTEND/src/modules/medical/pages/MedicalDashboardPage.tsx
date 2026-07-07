import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { MEDICAL_DASHBOARD_KPIS, ASSESSMENT_STATUS_BREAKDOWN, CLEARANCE_STATUS_BREAKDOWN, MONTHLY_APPOINTMENT_TREND, OCCUPATIONAL_BY_DEPARTMENT, CAMPAIGN_PARTICIPATION } from '../constants/medical-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = ['#f59e0b', CHART_COLORS.primary, '#94a3b8', '#ef4444'];

export function MedicalDashboardPage() {
  const kpis = [
    { label: 'Personnel Under Care', value: MEDICAL_DASHBOARD_KPIS.totalUnderCare.toLocaleString() },
    { label: 'Appointments Today', value: MEDICAL_DASHBOARD_KPIS.appointmentsToday },
    { label: 'Upcoming Appointments', value: MEDICAL_DASHBOARD_KPIS.upcomingAppointments },
    { label: 'Pending Assessments', value: MEDICAL_DASHBOARD_KPIS.pendingAssessments },
    { label: 'Pending Clearances', value: MEDICAL_DASHBOARD_KPIS.pendingClearances },
    { label: 'Medically Cleared', value: MEDICAL_DASHBOARD_KPIS.medicallyCleared.toLocaleString() },
    { label: 'Awaiting Review', value: MEDICAL_DASHBOARD_KPIS.awaitingReview },
    { label: 'Referral Cases', value: MEDICAL_DASHBOARD_KPIS.referralCases },
    { label: 'Occupational Cases', value: MEDICAL_DASHBOARD_KPIS.occupationalCases },
    { label: 'Active Campaigns', value: MEDICAL_DASHBOARD_KPIS.activeCampaigns },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Dashboard' }]} title="Medical Dashboard" description="Organizational health administration overview — authorized medical staff only" />
      <MedicalSubNav />
      <Card className="mb-4 border-warning/30 bg-warning/5">
        <CardContent className="pt-4 text-sm text-muted-foreground">Confidential medical data. All access is logged for audit and compliance.</CardContent>
      </Card>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Assessment Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart><Pie data={ASSESSMENT_STATUS_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>{ASSESSMENT_STATUS_BREAKDOWN.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Clearance Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart><Pie data={CLEARANCE_STATUS_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>{CLEARANCE_STATUS_BREAKDOWN.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Appointment Trend</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={MONTHLY_APPOINTMENT_TREND}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} /><Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="appointments" stroke={CHART_COLORS.primary} strokeWidth={2} /></LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Occupational Health by Dept</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={OCCUPATIONAL_BY_DEPARTMENT}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="name" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={28} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Campaign Participation</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={CAMPAIGN_PARTICIPATION} layout="vertical"><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} /><XAxis type="number" tick={chartAxisStyle} /><YAxis dataKey="name" type="category" tick={{ ...chartAxisStyle, fontSize: 9 }} width={90} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

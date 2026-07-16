import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, FunnelChart, Funnel, LabelList } from 'recharts';
import dayjs from 'dayjs';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { useGetPipelineStatsQuery } from '../api/recruitment.api';
import {
  RECRUITMENT_DASHBOARD_KPIS,
  APPLICATIONS_BY_DEPARTMENT,
  HIRING_TREND,
  CANDIDATE_SOURCES,
  RECRUITMENT_STATUS_BREAKDOWN,
  RECRUITMENT_RECENT_ACTIVITY,
  RECRUITMENT_PIPELINE,
} from '../constants/recruitment-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#94a3b8', '#cbd5e1', '#64748b'];

export function RecruitmentDashboardPage() {
  const { data: pipeline = RECRUITMENT_PIPELINE } = useGetPipelineStatsQuery();
  const kpis = [
    { label: 'Open Vacancies', value: RECRUITMENT_DASHBOARD_KPIS.openVacancies },
    { label: 'Draft Requisitions', value: RECRUITMENT_DASHBOARD_KPIS.draftRequisitions },
    { label: 'Pending Approvals', value: RECRUITMENT_DASHBOARD_KPIS.pendingApprovals },
    { label: 'Applications Received', value: RECRUITMENT_DASHBOARD_KPIS.applicationsReceived },
    { label: 'Shortlisted', value: RECRUITMENT_DASHBOARD_KPIS.candidatesShortlisted },
    { label: 'Interviews Scheduled', value: RECRUITMENT_DASHBOARD_KPIS.interviewsScheduled },
    { label: 'Offers Sent', value: RECRUITMENT_DASHBOARD_KPIS.offersSent },
    { label: 'Offers Accepted', value: RECRUITMENT_DASHBOARD_KPIS.offersAccepted },
    { label: 'Offers Declined', value: RECRUITMENT_DASHBOARD_KPIS.offersDeclined },
    { label: 'Onboarded', value: RECRUITMENT_DASHBOARD_KPIS.candidatesOnboarded },
    { label: 'Avg. Time to Hire', value: `${RECRUITMENT_DASHBOARD_KPIS.averageTimeToHire} days` },
    { label: 'Recruitment Cost', value: `RWF ${(RECRUITMENT_DASHBOARD_KPIS.recruitmentCost / 1e6).toFixed(1)}M` },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Dashboard' }]} title="Recruitment Dashboard" description="Overview of ongoing recruitment activities" />
      <RecruitmentSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Recruitment Pipeline</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={280}>
              <FunnelChart>
                <Tooltip {...chartTooltipStyle} />
                <Funnel dataKey="count" data={pipeline} isAnimationActive>
                  <LabelList position="right" fill="#64748b" stroke="none" dataKey="stage" fontSize={11} />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Applications by Department</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={APPLICATIONS_BY_DEPARTMENT}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 10 }} /><YAxis tick={chartAxisStyle} width={32} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Hiring Trend</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={HIRING_TREND}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} /><Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="hires" stroke={CHART_COLORS.primary} strokeWidth={2} /></LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Candidate Sources</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={CANDIDATE_SOURCES} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>{CANDIDATE_SOURCES.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '10px' }} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Recruitment Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={RECRUITMENT_STATUS_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70}>{RECRUITMENT_STATUS_BREAKDOWN.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Recent Activity</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <ul className="space-y-3">
            {RECRUITMENT_RECENT_ACTIVITY.map((a) => (
              <li key={a.id} className="flex justify-between border-b border-border pb-2 last:border-0">
                <div><p className="text-sm font-medium">{a.action}</p><p className="text-xs text-muted-foreground">{a.subject}</p></div>
                <time className="text-xs text-muted-foreground">{dayjs(a.timestamp).format('MMM D, HH:mm')}</time>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { WorkflowSubNav } from '../components/WorkflowSubNav';
import {
  WORKFLOW_DASHBOARD_KPIS,
  WORKFLOW_STATUS_BREAKDOWN,
  WORKFLOWS_BY_SERVICE,
  MONTHLY_WORKFLOW_VOLUME,
  APPROVAL_BY_DEPT,
  SLA_COMPLIANCE_TREND,
} from '../constants/workflow-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export function WorkflowDashboardPage() {
  const kpis = [
    { label: 'Active Workflows', value: WORKFLOW_DASHBOARD_KPIS.activeWorkflows },
    { label: 'Pending Approvals', value: WORKFLOW_DASHBOARD_KPIS.pendingApprovals },
    { label: 'Completed Today', value: WORKFLOW_DASHBOARD_KPIS.completedToday },
    { label: 'Overdue Tasks', value: WORKFLOW_DASHBOARD_KPIS.overdueTasks },
    { label: 'Escalated Tasks', value: WORKFLOW_DASHBOARD_KPIS.escalatedTasks },
    { label: 'SLA Compliance', value: WORKFLOW_DASHBOARD_KPIS.slaCompliance },
    { label: 'Avg Approval Time', value: WORKFLOW_DASHBOARD_KPIS.avgApprovalTime },
    { label: 'Automated Processes', value: WORKFLOW_DASHBOARD_KPIS.automatedProcesses },
    { label: 'Failed Processes', value: WORKFLOW_DASHBOARD_KPIS.failedProcesses },
    { label: 'Templates', value: WORKFLOW_DASHBOARD_KPIS.totalTemplates },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'Dashboard' }]} title="Workflow Dashboard" description="Operational control center for all business processes and approvals" />
      <WorkflowSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Workflow Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={WORKFLOW_STATUS_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                  {WORKFLOW_STATUS_BREAKDOWN.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Workflows by Service</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={WORKFLOWS_BY_SERVICE} layout="vertical">
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} />
                <XAxis type="number" tick={chartAxisStyle} />
                <YAxis dataKey="name" type="category" tick={{ ...chartAxisStyle, fontSize: 9 }} width={80} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Monthly Volume</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={MONTHLY_WORKFLOW_VOLUME}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={40} />
                <Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="count" stroke={CHART_COLORS.primary} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Approval Time by Dept (hrs)</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={APPROVAL_BY_DEPT}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 8 }} /><YAxis tick={chartAxisStyle} width={32} />
                <Tooltip {...chartTooltipStyle} /><Bar dataKey="hours" fill={CHART_COLORS.secondary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">SLA Compliance %</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={SLA_COMPLIANCE_TREND}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} domain={[85, 100]} />
                <Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="value" stroke={CHART_COLORS.primary} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

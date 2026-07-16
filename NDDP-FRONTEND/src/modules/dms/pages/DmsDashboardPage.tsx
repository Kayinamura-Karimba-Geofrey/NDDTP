import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
import { DmsSubNav } from '../components/DmsSubNav';
import {
  DMS_DASHBOARD_KPIS,
  DOCS_BY_CATEGORY,
  MONTHLY_UPLOADS,
  APPROVAL_STATUS_DIST,
  STORAGE_BY_DEPT,
  ARCHIVED_VS_ACTIVE,
  RECENT_ACTIVITY,
} from '../constants/dms-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export function DmsDashboardPage() {
  const kpis = [
    { label: 'Total Documents', value: DMS_DASHBOARD_KPIS.totalDocuments },
    { label: 'Uploaded Today', value: DMS_DASHBOARD_KPIS.uploadedToday },
    { label: 'Pending Approvals', value: DMS_DASHBOARD_KPIS.pendingApprovals },
    { label: 'Awaiting Signature', value: DMS_DASHBOARD_KPIS.awaitingSignature },
    { label: 'Archived Records', value: DMS_DASHBOARD_KPIS.archivedRecords },
    { label: 'Shared Documents', value: DMS_DASHBOARD_KPIS.sharedDocuments },
    { label: 'Expiring Records', value: DMS_DASHBOARD_KPIS.expiringRecords },
    { label: 'Storage Used', value: DMS_DASHBOARD_KPIS.storageUsed },
    { label: 'Recent Downloads', value: DMS_DASHBOARD_KPIS.recentDownloads },
    { label: 'Retention Actions Due', value: DMS_DASHBOARD_KPIS.retentionActionsDue },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Dashboard' }]} title="Document & Records Dashboard" description="Storage, approvals, signatures, and retention overview" />
      <DmsSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Documents by Category</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={DOCS_BY_CATEGORY} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>
                  {DOCS_BY_CATEGORY.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Monthly Upload Trend</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={MONTHLY_UPLOADS}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={40} />
                <Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="count" stroke={CHART_COLORS.primary} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Approval Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={APPROVAL_STATUS_DIST}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 9 }} /><YAxis tick={chartAxisStyle} width={32} />
                <Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Storage by Department (GB)</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={STORAGE_BY_DEPT} layout="vertical">
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} />
                <XAxis type="number" tick={chartAxisStyle} /><YAxis dataKey="name" type="category" tick={{ ...chartAxisStyle, fontSize: 9 }} width={80} />
                <Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.secondary} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Archived vs Active</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={ARCHIVED_VS_ACTIVE} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70}>
                  {ARCHIVED_VS_ACTIVE.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-3">
            <CardTitle className="text-sm">Workflow Queue</CardTitle>
            <Link to="/dms/approvals"><Button size="sm" variant="outline">Review</Button></Link>
          </CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm">
            <div className="flex justify-between rounded-lg border border-border p-3"><span>Pending Approval</span><span className="font-bold">{DMS_DASHBOARD_KPIS.pendingApprovals} <span className="text-xs font-normal text-warning">26 urgent</span></span></div>
            <div className="flex justify-between rounded-lg border border-border p-3"><span>Pending Signature</span><span className="font-bold">{DMS_DASHBOARD_KPIS.awaitingSignature} <span className="text-xs font-normal text-warning">12 due today</span></span></div>
            <div className="flex justify-between rounded-lg border border-border p-3"><span>Completed Today</span><span className="font-bold">{DMS_DASHBOARD_KPIS.uploadedToday} <span className="text-xs font-normal text-success">94% SLA</span></span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-3">
            <CardTitle className="text-sm">Recent Activity</CardTitle>
            <Link to="/dms/audit"><Button size="sm" variant="outline">Audit trail</Button></Link>
          </CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm">
            {RECENT_ACTIVITY.map((a) => (
              <div key={a.id} className="border-b border-border pb-2 last:border-0">
                <p className="font-medium">{a.document} — {a.event}</p>
                <p className="text-xs text-muted-foreground">{a.actor} · {dayjs(a.date).format('HH:mm')}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

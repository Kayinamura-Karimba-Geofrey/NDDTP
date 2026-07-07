import dayjs from 'dayjs';
import { WelfareSubNav } from '../components/WelfareSubNav';
import { WelfareStatusBadge } from '../components/WelfareStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_EMERGENCY_CASES, type EmergencyCase } from '../constants/welfare-data';

const PRIORITY_STYLES: Record<string, string> = {
  CRITICAL: 'bg-destructive/10 text-destructive',
  HIGH: 'bg-warning/10 text-warning',
  MEDIUM: 'bg-primary/10 text-primary',
  LOW: 'bg-muted text-muted-foreground',
};

export function EmergencySupportPage() {
  const kpis = [
    { label: 'Emergency Requests', value: 12 },
    { label: 'Cases in Progress', value: MOCK_EMERGENCY_CASES.filter((c) => c.status === 'IN_PROGRESS').length },
    { label: 'Resolved Cases', value: 8 },
    { label: 'Avg Response Time', value: '2.4 hrs' },
  ];

  const columns: DataTableColumn<EmergencyCase>[] = [
    { key: 'case', header: 'Case #', render: (r) => <code className="text-xs">{r.caseNumber}</code> },
    { key: 'emp', header: 'Employee', render: (r) => <span className="font-medium">{r.employeeName}</span> },
    { key: 'dept', header: 'Department' },
    { key: 'category', header: 'Category' },
    { key: 'priority', header: 'Priority', render: (r) => <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${PRIORITY_STYLES[r.priority]}`}>{r.priority}</span> },
    { key: 'officer', header: 'Assigned Officer' },
    { key: 'status', header: 'Status', render: (r) => <WelfareStatusBadge status={r.status} /> },
    { key: 'submitted', header: 'Submitted', render: (r) => dayjs(r.submittedAt).format('MMM D, HH:mm') },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'Emergency' }]} title="Emergency Support" description="Urgent welfare cases requiring immediate attention" />
      <WelfareSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_EMERGENCY_CASES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

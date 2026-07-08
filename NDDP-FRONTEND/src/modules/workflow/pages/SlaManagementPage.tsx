import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { WorkflowStatusBadge } from '../components/WorkflowStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_SLAS, type SlaRule } from '../constants/workflow-data';

export function SlaManagementPage() {
  const columns: DataTableColumn<SlaRule>[] = [
    { key: 'type', header: 'Workflow Type', render: (r) => <span className="font-medium">{r.workflowType}</span> },
    { key: 'target', header: 'Target', render: (r) => `${r.targetHours} hours` },
    { key: 'comp', header: 'Compliance', render: (r) => `${r.compliance}%` },
    { key: 'status', header: 'Status', render: (r) => <WorkflowStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'SLA' }]} title="SLA Management" description="Deadline targets per workflow type with compliance tracking" />
      <WorkflowSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">Overall Compliance</p><p className="text-2xl font-bold">94.2%</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">Breached This Week</p><p className="text-2xl font-bold">12</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">At Risk</p><p className="text-2xl font-bold">28</p></CardContent></Card>
      </div>
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_SLAS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useGetRunningWorkflowsQuery } from '../api/workflow.api';
import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { WorkflowStatusBadge } from '../components/WorkflowStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { RunningWorkflow } from '../constants/workflow-data';

export function RunningWorkflowsPage() {
  const { data, isLoading } = useGetRunningWorkflowsQuery({ page: 1, limit: 50 });
  const rows = data?.data ?? [];

  const columns: DataTableColumn<RunningWorkflow>[] = [
    { key: 'id', header: 'Workflow ID', render: (r) => <code className="text-xs">{r.workflowId}</code> },
    { key: 'tpl', header: 'Template', render: (r) => <span className="font-medium">{r.template}</span> },
    { key: 'stage', header: 'Current Stage', render: (r) => r.currentStage },
    { key: 'owner', header: 'Owner', render: (r) => r.owner },
    { key: 'service', header: 'Service', render: (r) => r.service },
    { key: 'start', header: 'Started', render: (r) => dayjs(r.started).format('DD MMM HH:mm') },
    { key: 'due', header: 'Due', render: (r) => (r.dueDate ? dayjs(r.dueDate).format('DD MMM') : '—') },
    { key: 'status', header: 'Status', render: (r) => <WorkflowStatusBadge status={r.status} /> },
    {
      key: 'actions', header: '',
      render: (r) => r.status === 'RUNNING' || r.status === 'WAITING' ? (
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={() => toast('View workflow')}>View</Button>
          <Button size="sm" variant="outline" onClick={() => toast('Paused')}>Pause</Button>
        </div>
      ) : <Button size="sm" variant="outline" onClick={() => toast('View workflow')}>View</Button>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'Running' }]} title="Running Workflows" description="Monitor live workflow instances — view, pause, resume, cancel" />
      <WorkflowSubNav />
      <Card><CardContent className="pt-6">{isLoading ? <div className="data-table-empty">Loading...</div> : <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />}</CardContent></Card>
    </div>
  );
}

import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useGetPendingTasksQuery } from '../api/workflow.api';
import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { WorkflowStatusBadge } from '../components/WorkflowStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { WorkflowTask } from '../constants/workflow-data';

export function PendingTasksPage() {
  const { data: tasks = [], isLoading } = useGetPendingTasksQuery();

  const columns: DataTableColumn<WorkflowTask>[] = [
    { key: 'name', header: 'Task', render: (r) => <span className="font-medium">{r.taskName}</span> },
    { key: 'assign', header: 'Assigned To', render: (r) => r.assignedTo },
    { key: 'pri', header: 'Priority', render: (r) => r.priority },
    { key: 'due', header: 'Due', render: (r) => dayjs(r.dueDate).format('DD MMM YYYY') },
    { key: 'sla', header: 'SLA', render: (r) => <span className={r.slaStatus === 'Overdue' ? 'text-destructive' : r.slaStatus === 'At Risk' ? 'text-warning' : ''}>{r.slaStatus}</span> },
    { key: 'wf', header: 'Workflow', render: (r) => r.workflow },
    { key: 'status', header: 'Status', render: (r) => <WorkflowStatusBadge status={r.status} /> },
    {
      key: 'actions', header: '',
      render: () => (
        <div className="flex gap-1">
          <Button size="sm" onClick={() => toast.success('Approved')}>Approve</Button>
          <Button size="sm" variant="outline" onClick={() => toast('Rejected')}>Reject</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'Tasks' }]} title="Pending Tasks" description="Tasks awaiting action — approve, reject, delegate, return, comment" />
      <WorkflowSubNav />
      <Card><CardContent className="pt-6">{isLoading ? <div className="data-table-empty">Loading...</div> : <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={tasks as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />}</CardContent></Card>
    </div>
  );
}

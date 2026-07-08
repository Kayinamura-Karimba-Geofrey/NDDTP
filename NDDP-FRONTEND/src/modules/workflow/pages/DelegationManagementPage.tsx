import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { WorkflowStatusBadge } from '../components/WorkflowStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_DELEGATIONS, type Delegation } from '../constants/workflow-data';

export function DelegationManagementPage() {
  const columns: DataTableColumn<Delegation>[] = [
    { key: 'delegate', header: 'Delegate', render: (r) => <span className="font-medium">{r.delegate}</span> },
    { key: 'acting', header: 'Acting For', render: (r) => r.actingFor },
    { key: 'start', header: 'Start', render: (r) => dayjs(r.startDate).format('DD MMM YYYY') },
    { key: 'end', header: 'End', render: (r) => dayjs(r.endDate).format('DD MMM YYYY') },
    { key: 'reason', header: 'Reason', render: (r) => r.reason },
    { key: 'scope', header: 'Scope', render: (r) => r.scope },
    { key: 'status', header: 'Status', render: (r) => <WorkflowStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'Delegation' }]} title="Delegation Management" description="Time-bound authority delegation — auditable and scoped" actions={<Button onClick={() => toast('Create delegation')}><FiPlus className="h-4 w-4" /> Delegate</Button>} />
      <WorkflowSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_DELEGATIONS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

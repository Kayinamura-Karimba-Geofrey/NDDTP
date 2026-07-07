import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useGetPendingTrainingApprovalsQuery } from '../api/training.api';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { TrainingApproval } from '../constants/training-data';

export function TrainingApprovalCenterPage() {
  const { data: queue = [], isLoading } = useGetPendingTrainingApprovalsQuery();

  const columns: DataTableColumn<TrainingApproval>[] = [
    { key: 'emp', header: 'Employee', render: (r) => <span className="font-medium">{r.employeeName}</span> },
    { key: 'course', header: 'Course' },
    { key: 'date', header: 'Request Date', render: (r) => dayjs(r.requestDate).format('MMM D, YYYY') },
    { key: 'priority', header: 'Priority' },
    { key: 'status', header: 'Status', render: (r) => <TrainingStatusBadge status={r.status} /> },
    { key: 'actions', header: 'Actions', render: (r) => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast(`Approved ${r.course}`)}>Approve</Button>
        <Button variant="ghost" size="sm" onClick={() => toast(`Rejected ${r.course}`)}>Reject</Button>
        <Button variant="ghost" size="sm" onClick={() => toast('Returned for revision')}>Return</Button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Approvals' }]} title="Approval Center" description="Enrollment, course, and certification approvals" />
      <TrainingSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={queue as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

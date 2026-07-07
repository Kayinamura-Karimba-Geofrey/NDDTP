import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useGetPendingWelfareApprovalsQuery } from '../api/welfare.api';
import { WelfareSubNav } from '../components/WelfareSubNav';
import { WelfareStatusBadge } from '../components/WelfareStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { AssistanceRequest } from '../constants/welfare-data';

export function WelfareApprovalCenterPage() {
  const { data: queue = [], isLoading } = useGetPendingWelfareApprovalsQuery();

  const columns: DataTableColumn<AssistanceRequest>[] = [
    { key: 'emp', header: 'Employee', render: (r) => <span className="font-medium">{r.employeeName}</span> },
    { key: 'program', header: 'Program' },
    { key: 'type', header: 'Request Type' },
    { key: 'priority', header: 'Priority', render: (r) => r.priority ?? 'MEDIUM' },
    { key: 'submitted', header: 'Submitted', render: (r) => r.submittedAt ? dayjs(r.submittedAt).format('MMM D') : '—' },
    { key: 'status', header: 'Status', render: (r) => <WelfareStatusBadge status={r.status} /> },
    { key: 'actions', header: 'Actions', render: (r) => (
      <div className="flex flex-wrap gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast(`Approved ${r.requestNumber}`)}>Approve</Button>
        <Button variant="ghost" size="sm" onClick={() => toast(`Rejected ${r.requestNumber}`)}>Reject</Button>
        <Button variant="ghost" size="sm" onClick={() => toast('Info requested')}>Request Info</Button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'Approvals' }]} title="Approval Center" description="Review and approve welfare requests" />
      <WelfareSubNav />
      <Card className="mb-6">
        <CardContent className="pt-6">
          <p className="mb-4 text-sm font-medium">Approval Timeline</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {['Submitted', 'Reviewed', 'Approved', 'Completed'].map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">{step}</span>
                {i < 3 && <span>↓</span>}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
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

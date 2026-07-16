import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useGetDmsApprovalsQuery } from '../api/dms.api';
import { DmsSubNav } from '../components/DmsSubNav';
import { DmsStatusBadge } from '../components/DmsStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import type { ApprovalItem } from '../constants/dms-data';

export function ApprovalWorkflowsPage() {
  const { data: approvals = [], isLoading } = useGetDmsApprovalsQuery();

  const columns: DataTableColumn<ApprovalItem>[] = [
    { key: 'num', header: 'Document #', render: (r) => <code className="text-xs">{r.documentNumber}</code> },
    { key: 'doc', header: 'Document', render: (r) => <span className="font-medium">{r.document}</span> },
    { key: 'stage', header: 'Stage', render: (r) => r.stage },
    { key: 'req', header: 'Requester', render: (r) => r.requester },
    { key: 'pri', header: 'Priority', render: (r) => r.priority },
    { key: 'date', header: 'Submitted', render: (r) => dayjs(r.submittedDate).format('DD MMM YYYY') },
    { key: 'status', header: 'Status', render: (r) => <DmsStatusBadge status={r.status} /> },
    {
      key: 'actions', header: '',
      render: (r) => r.status === 'PENDING_APPROVAL' || r.status === 'IN_REVIEW' ? (
        <div className="flex gap-1">
          <Button size="sm" onClick={() => toast('Approved')}>Approve</Button>
          <Button size="sm" variant="outline" onClick={() => toast('Returned')}>Return</Button>
        </div>
      ) : null,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Approvals' }]} title="Approval Workflows" description="Templates, escalation, delegation, comments, and approval history" />
      <DmsSubNav />
      <Card className="mb-6">
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Typical Path</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2 pt-4 text-sm">
          {['Submitted', 'Department Review', 'Finance Review', 'Final Approval'].map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded-full bg-muted px-3 py-1 font-medium">{s}</span>
              {i < 3 && <span className="text-muted-foreground">→</span>}
            </span>
          ))}
        </CardContent>
      </Card>
      <Card><CardContent className="pt-6">{isLoading ? <div className="data-table-empty">Loading...</div> : <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={approvals as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />}</CardContent></Card>
    </div>
  );
}

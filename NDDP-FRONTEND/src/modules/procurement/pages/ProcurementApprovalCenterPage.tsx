import dayjs from 'dayjs';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_APPROVALS, type ProcurementApproval } from '../constants/procurement-data';

export function ProcurementApprovalCenterPage() {
  const columns: DataTableColumn<ProcurementApproval>[] = [
    { key: 'type', header: 'Type' },
    { key: 'ref', header: 'Reference', render: (r) => <code className="text-xs">{r.reference}</code> },
    { key: 'requester', header: 'Requester' },
    { key: 'amount', header: 'Amount', render: (r) => r.amount ? `${(r.amount / 1e6).toFixed(1)}M RWF` : '—' },
    { key: 'date', header: 'Submitted', render: (r) => dayjs(r.submittedDate).format('DD MMM YYYY') },
    { key: 'status', header: 'Status', render: (r) => <ProcurementStatusBadge status={r.status} /> },
    { key: 'actions', header: '', render: () => <Button size="sm" variant="outline">Review</Button> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Approvals' }]} title="Approval Center" description="Approval queue for requisitions, orders, tenders, contracts, and invoices" />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_APPROVALS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_COMMITMENTS, type Commitment } from '../constants/finance-data';

export function CommitmentsPage() {
  const columns: DataTableColumn<Commitment>[] = [
    { key: 'num', header: 'Commitment #', render: (r) => <code className="text-xs">{r.commitmentNumber}</code> },
    { key: 'supplier', header: 'Supplier' },
    { key: 'amount', header: 'Amount', render: (r) => `${(r.amount / 1e6).toFixed(1)}M RWF` },
    { key: 'budget', header: 'Budget', render: (r) => <code className="text-xs">{r.budget}</code> },
    { key: 'status', header: 'Status', render: (r) => <FinanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Commitments' }]} title="Commitments" description="Committed expenditure before payment — PO to invoice to payment" />
      <FinanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_COMMITMENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

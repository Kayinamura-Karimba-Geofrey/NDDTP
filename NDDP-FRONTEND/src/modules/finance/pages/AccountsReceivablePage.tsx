import dayjs from 'dayjs';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_RECEIVABLES, type AccountsReceivable } from '../constants/finance-data';

export function AccountsReceivablePage() {
  const columns: DataTableColumn<AccountsReceivable>[] = [
    { key: 'payer', header: 'Payer', render: (r) => <span className="font-medium">{r.payer}</span> },
    { key: 'amount', header: 'Amount', render: (r) => `${(r.amount / 1e6).toFixed(1)}M RWF` },
    { key: 'due', header: 'Due Date', render: (r) => dayjs(r.dueDate).format('DD MMM YYYY') },
    { key: 'category', header: 'Category' },
    { key: 'status', header: 'Status', render: (r) => <FinanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Accounts Receivable' }]} title="Accounts Receivable" description="Optional — training fees, service charges, rental income" />
      <FinanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_RECEIVABLES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

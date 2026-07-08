import dayjs from 'dayjs';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_PAYABLES, type AccountsPayable } from '../constants/finance-data';

export function AccountsPayablePage() {
  const columns: DataTableColumn<AccountsPayable>[] = [
    { key: 'supplier', header: 'Supplier', render: (r) => <span className="font-medium">{r.supplier}</span> },
    { key: 'amount', header: 'Outstanding', render: (r) => `${(r.outstandingAmount / 1e6).toFixed(1)}M RWF` },
    { key: 'due', header: 'Due Date', render: (r) => dayjs(r.dueDate).format('DD MMM YYYY') },
    { key: 'priority', header: 'Priority' },
    { key: 'status', header: 'Status', render: (r) => <FinanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Accounts Payable' }]} title="Accounts Payable" description="Track organizational obligations to suppliers" />
      <FinanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_PAYABLES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

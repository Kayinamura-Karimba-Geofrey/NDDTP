import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_TRANSFERS, type BudgetTransfer } from '../constants/finance-data';

export function BudgetTransfersPage() {
  const columns: DataTableColumn<BudgetTransfer>[] = [
    { key: 'num', header: 'Transfer #', render: (r) => <code className="text-xs">{r.transferNumber}</code> },
    { key: 'source', header: 'Source', render: (r) => <code className="text-xs">{r.sourceBudget}</code> },
    { key: 'dest', header: 'Destination', render: (r) => <code className="text-xs">{r.destinationBudget}</code> },
    { key: 'amount', header: 'Amount', render: (r) => `${(r.amount / 1e6).toFixed(1)}M RWF` },
    { key: 'reason', header: 'Reason', render: (r) => <span className="text-xs">{r.reason}</span> },
    { key: 'status', header: 'Status', render: (r) => <FinanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Budget Transfers' }]} title="Budget Transfers" description="Move budget between cost centers" actions={<Button onClick={() => toast('New transfer')}><FiPlus className="h-4 w-4" /> New Transfer</Button>} />
      <FinanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_TRANSFERS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_INVOICES, type Invoice } from '../constants/finance-data';

export function InvoiceManagementPage() {
  const columns: DataTableColumn<Invoice>[] = [
    { key: 'num', header: 'Invoice #', render: (r) => <code className="text-xs">{r.invoiceNumber}</code> },
    { key: 'supplier', header: 'Supplier' },
    { key: 'po', header: 'PO #', render: (r) => r.purchaseOrder ? <code className="text-xs">{r.purchaseOrder}</code> : '—' },
    { key: 'amount', header: 'Amount', render: (r) => `${(r.amount / 1e6).toFixed(1)}M RWF` },
    { key: 'due', header: 'Due Date', render: (r) => dayjs(r.dueDate).format('DD MMM YYYY') },
    { key: 'status', header: 'Status', render: (r) => <FinanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Invoices' }]} title="Invoice Management" description="Supplier invoices — validation, matching, approval, payment" actions={<Button onClick={() => toast('Register invoice')}><FiPlus className="h-4 w-4" /> Register Invoice</Button>} />
      <FinanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_INVOICES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

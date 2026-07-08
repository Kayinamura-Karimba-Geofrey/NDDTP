import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_PAYMENTS, type Payment } from '../constants/finance-data';

export function PaymentManagementPage() {
  const columns: DataTableColumn<Payment>[] = [
    { key: 'num', header: 'Payment #', render: (r) => <code className="text-xs">{r.paymentNumber}</code> },
    { key: 'supplier', header: 'Supplier' },
    { key: 'invoice', header: 'Invoice', render: (r) => <code className="text-xs">{r.invoice}</code> },
    { key: 'amount', header: 'Amount', render: (r) => `${(r.amount / 1e6).toFixed(1)}M RWF` },
    { key: 'date', header: 'Payment Date', render: (r) => dayjs(r.paymentDate).format('DD MMM YYYY') },
    { key: 'method', header: 'Method' },
    { key: 'ref', header: 'Reference', render: (r) => <code className="text-xs">{r.reference}</code> },
    { key: 'status', header: 'Status', render: (r) => <FinanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Payments' }]} title="Payment Management" description="Manage supplier payments — bank transfer, electronic, cheque" actions={<Button onClick={() => toast('Process payment')}><FiPlus className="h-4 w-4" /> Process Payment</Button>} />
      <FinanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_PAYMENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

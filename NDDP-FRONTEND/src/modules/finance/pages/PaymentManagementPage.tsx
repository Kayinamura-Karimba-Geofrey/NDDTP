import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetPaymentsQuery } from '../api/finance.api';
import type { Payment } from '../constants/finance-data';
import { CreatePaymentModal } from '../components/CreatePaymentModal';

export function PaymentManagementPage() {
  const { data: payments = [], isLoading } = useGetPaymentsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Payments' }]} title="Payment Management" description="Manage supplier payments — bank transfer, electronic, cheque" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Process Payment</Button>} />
      <FinanceSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={payments as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreatePaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

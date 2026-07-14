import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetInvoicesQuery } from '../api/finance.api';
import type { Invoice } from '../constants/finance-data';
import { CreateInvoiceModal } from '../components/CreateInvoiceModal';

export function InvoiceManagementPage() {
  const { data: invoices = [], isLoading } = useGetInvoicesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Invoices' }]} title="Invoice Management" description="Supplier invoices — validation, matching, approval, payment" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Register Invoice</Button>} />
      <FinanceSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={invoices as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateInvoiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

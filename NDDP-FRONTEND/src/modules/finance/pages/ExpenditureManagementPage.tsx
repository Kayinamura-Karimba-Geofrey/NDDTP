import { useState } from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetExpendituresQuery } from '../api/finance.api';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { Expenditure } from '../constants/finance-data';

export function ExpenditureManagementPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading } = useGetExpendituresQuery({ page: 1, limit: 100 });
  const rows = (data?.data ?? []).filter((r) => !statusFilter || r.status === statusFilter);

  const columns: DataTableColumn<Expenditure>[] = [
    { key: 'num', header: 'Expenditure #', render: (r) => <code className="text-xs">{r.expenditureNumber}</code> },
    { key: 'dept', header: 'Department' },
    { key: 'category', header: 'Category' },
    { key: 'supplier', header: 'Supplier', render: (r) => r.supplier ?? '—' },
    { key: 'amount', header: 'Amount', render: (r) => `${(r.amount / 1e6).toFixed(1)}M RWF` },
    { key: 'payment', header: 'Payment', render: (r) => <FinanceStatusBadge status={r.paymentStatus} /> },
    { key: 'budget', header: 'Budget', render: (r) => <code className="text-xs">{r.budget}</code> },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('DD MMM YYYY') },
    { key: 'status', header: 'Status', render: (r) => <FinanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Expenditures' }]} title="Expenditure Management" description="Track actual spending against budgets" actions={<Button onClick={() => toast('New expenditure')}><FiPlus className="h-4 w-4" /> New Expenditure</Button>} />
      <FinanceSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {['', 'DRAFT', 'SUBMITTED', 'APPROVED', 'PAID'].map((s) => (
              <button key={s || 'all'} type="button" onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-medium ${statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{s ? s.replace(/_/g, ' ') : 'All'}</button>
            ))}
          </div>
          {isLoading ? <div className="data-table-empty">Loading...</div> : <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />}
        </CardContent>
      </Card>
    </div>
  );
}

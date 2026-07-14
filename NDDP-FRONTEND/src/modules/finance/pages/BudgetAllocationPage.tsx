import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useGetBudgetsQuery } from '../api/finance.api';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { BudgetRecord } from '../constants/finance-data';
import { CreateBudgetModal } from '../components/CreateBudgetModal';

export function BudgetAllocationPage() {
  const { data, isLoading } = useGetBudgetsQuery({ page: 1, limit: 100 });
  const rows = data?.data ?? [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<BudgetRecord>[] = [
    { key: 'code', header: 'Budget Code', render: (r) => <code className="text-xs">{r.budgetCode}</code> },
    { key: 'dept', header: 'Department' },
    { key: 'cc', header: 'Cost Center' },
    { key: 'year', header: 'FY', render: (r) => r.fiscalYear },
    { key: 'allocated', header: 'Allocated', render: (r) => `${(r.allocatedAmount / 1e6).toFixed(0)}M` },
    { key: 'committed', header: 'Committed', render: (r) => `${(r.committedAmount / 1e6).toFixed(0)}M` },
    { key: 'spent', header: 'Spent', render: (r) => `${(r.spentAmount / 1e6).toFixed(0)}M` },
    { key: 'available', header: 'Available', render: (r) => `${(r.availableAmount / 1e6).toFixed(0)}M` },
    { key: 'status', header: 'Status', render: (r) => <FinanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Budget Allocation' }]} title="Budget Allocation" description="Allocate approved budgets across organization levels" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Allocate Budget</Button>} />
      <FinanceSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateBudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

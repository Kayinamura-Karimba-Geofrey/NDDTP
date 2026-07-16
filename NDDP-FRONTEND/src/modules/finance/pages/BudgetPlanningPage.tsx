import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_BUDGET_PLANS, type BudgetPlan } from '../constants/finance-data';

export function BudgetPlanningPage() {
  const columns: DataTableColumn<BudgetPlan>[] = [
    { key: 'code', header: 'Budget Code', render: (r) => <code className="text-xs">{r.budgetCode}</code> },
    { key: 'dept', header: 'Department' },
    { key: 'cc', header: 'Cost Center' },
    { key: 'program', header: 'Program' },
    { key: 'cat', header: 'Category' },
    { key: 'amount', header: 'Est. Amount', render: (r) => `${(r.estimatedAmount / 1e6).toFixed(0)}M RWF` },
    { key: 'priority', header: 'Priority' },
    { key: 'status', header: 'Status', render: (r) => <FinanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Budget Planning' }]} title="Budget Planning" description="Annual budget preparation" actions={<Button onClick={() => toast('New budget plan')}><FiPlus className="h-4 w-4" /> New Plan</Button>} />
      <FinanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_BUDGET_PLANS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

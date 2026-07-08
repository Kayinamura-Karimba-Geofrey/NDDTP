import { useGetBudgetsQuery } from '../api/finance.api';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';

export function BudgetMonitoringPage() {
  const { data } = useGetBudgetsQuery({ page: 1, limit: 100 });
  const budgets = data?.data ?? [];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Budget Monitoring' }]} title="Budget Monitoring" description="Real-time budget tracking with utilization and alerts" />
      <FinanceSubNav />
      <div className="grid gap-4">
        {budgets.map((b) => {
          const utilization = b.allocatedAmount > 0 ? Math.round(((b.committedAmount + b.spentAmount) / b.allocatedAmount) * 100) : 0;
          const alert = utilization > 90 ? 'Overspending risk' : utilization > 75 ? 'Low remaining budget' : null;
          return (
            <Card key={b.id}>
              <CardContent className="pt-6">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div><p className="font-medium">{b.budgetCode}</p><p className="text-xs text-muted-foreground">{b.department} · {b.costCenter}</p></div>
                  <FinanceStatusBadge status={b.status} />
                </div>
                <div className="mb-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full ${utilization > 90 ? 'bg-destructive' : utilization > 75 ? 'bg-warning' : 'bg-primary'}`} style={{ width: `${Math.min(utilization, 100)}%` }} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-5">
                  <div><p className="text-xs text-muted-foreground">Allocated</p><p>{(b.allocatedAmount / 1e6).toFixed(0)}M</p></div>
                  <div><p className="text-xs text-muted-foreground">Committed</p><p>{(b.committedAmount / 1e6).toFixed(0)}M</p></div>
                  <div><p className="text-xs text-muted-foreground">Spent</p><p>{(b.spentAmount / 1e6).toFixed(0)}M</p></div>
                  <div><p className="text-xs text-muted-foreground">Available</p><p>{(b.availableAmount / 1e6).toFixed(0)}M</p></div>
                  <div><p className="text-xs text-muted-foreground">Utilization</p><p className="font-medium">{utilization}%</p></div>
                </div>
                {alert && <p className="mt-2 text-xs text-warning">{alert}</p>}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

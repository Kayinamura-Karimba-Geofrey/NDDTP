import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { FinanceSubNav } from '../components/FinanceSubNav';
import {
  FINANCE_DASHBOARD_KPIS,
  BUDGET_BY_DEPARTMENT,
  MONTHLY_EXPENDITURE,
  SPENDING_BY_CATEGORY,
  INVOICE_STATUS_BREAKDOWN,
} from '../constants/finance-data';
import { CHART_COLORS, chartAxisStyle, chartTooltipStyle } from '@/constants/chart-theme';

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, '#f59e0b', '#ef4444'];

export function FinanceDashboardPage() {
  const kpis = [
    { label: 'Annual Budget', value: `${(FINANCE_DASHBOARD_KPIS.totalAnnualBudget / 1e9).toFixed(2)}B RWF` },
    { label: 'Budget Utilized', value: `${(FINANCE_DASHBOARD_KPIS.budgetUtilized / 1e9).toFixed(2)}B RWF` },
    { label: 'Budget Remaining', value: `${(FINANCE_DASHBOARD_KPIS.budgetRemaining / 1e9).toFixed(2)}B RWF` },
    { label: 'Commitments', value: `${(FINANCE_DASHBOARD_KPIS.outstandingCommitments / 1e6).toFixed(0)}M RWF` },
    { label: 'Pending Payments', value: FINANCE_DASHBOARD_KPIS.pendingPayments },
    { label: 'Paid Invoices', value: FINANCE_DASHBOARD_KPIS.paidInvoices },
    { label: 'Outstanding Invoices', value: FINANCE_DASHBOARD_KPIS.outstandingInvoices },
    { label: 'Cost Centers', value: FINANCE_DASHBOARD_KPIS.activeCostCenters },
    { label: 'Budget Variance', value: `${FINANCE_DASHBOARD_KPIS.budgetVariance}%` },
    { label: 'Fiscal Period', value: FINANCE_DASHBOARD_KPIS.currentFiscalPeriod },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Dashboard' }]} title="Finance Dashboard" description="Budget execution, expenditure control, and financial overview" />
      <FinanceSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p><p className="mt-1 text-2xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Budget Utilization by Department</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={BUDGET_BY_DEPARTMENT} layout="vertical"><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" horizontal={false} /><XAxis type="number" tick={chartAxisStyle} /><YAxis dataKey="name" type="category" tick={{ ...chartAxisStyle, fontSize: 9 }} width={80} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Invoice Status</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart><Pie data={INVOICE_STATUS_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75}>{INVOICE_STATUS_BREAKDOWN.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie><Tooltip {...chartTooltipStyle} /><Legend wrapperStyle={{ fontSize: '11px' }} /></PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Budget vs Actual</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MONTHLY_EXPENDITURE}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="month" tick={chartAxisStyle} /><YAxis tick={chartAxisStyle} width={32} /><Tooltip {...chartTooltipStyle} /><Bar dataKey="budget" fill={CHART_COLORS.primary} /><Bar dataKey="actual" fill={CHART_COLORS.secondary} /></BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Spending by Category</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={SPENDING_BY_CATEGORY}><CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="4 4" vertical={false} /><XAxis dataKey="name" tick={{ ...chartAxisStyle, fontSize: 8 }} /><YAxis tick={chartAxisStyle} width={32} /><Tooltip {...chartTooltipStyle} /><Line type="monotone" dataKey="value" stroke={CHART_COLORS.primary} strokeWidth={2} /></LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

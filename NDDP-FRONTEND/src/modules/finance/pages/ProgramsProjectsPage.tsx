import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_PROGRAMS, type ProgramProject } from '../constants/finance-data';

export function ProgramsProjectsPage() {
  const columns: DataTableColumn<ProgramProject>[] = [
    { key: 'code', header: 'Program Code', render: (r) => <code className="text-xs">{r.programCode}</code> },
    { key: 'name', header: 'Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'budget', header: 'Budget', render: (r) => `${(r.budget / 1e6).toFixed(0)}M` },
    { key: 'spent', header: 'Spent', render: (r) => `${(r.spent / 1e6).toFixed(0)}M` },
    { key: 'remaining', header: 'Remaining', render: (r) => `${(r.remaining / 1e6).toFixed(0)}M` },
    { key: 'manager', header: 'Manager' },
    { key: 'status', header: 'Status', render: (r) => <FinanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Programs & Projects' }]} title="Programs & Projects" description="Financial allocation by program and project" />
      <FinanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_PROGRAMS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetImprovementPlansQuery } from '../api/performance.api';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PerformanceStatusBadge } from '../components/PerformanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { ImprovementPlan } from '../constants/performance-data';

export function PerformanceImprovementPlansPage() {
  const { data: plans = [], isLoading } = useGetImprovementPlansQuery();

  const columns: DataTableColumn<ImprovementPlan>[] = [
    { key: 'num', header: 'Plan #', render: (r) => <code className="text-xs">{r.planNumber}</code> },
    { key: 'employee', header: 'Employee', render: (r) => <span className="font-medium">{r.employee}</span> },
    { key: 'supervisor', header: 'Supervisor' },
    { key: 'gap', header: 'Performance Gap', render: (r) => <span className="text-xs">{r.performanceGap}</span> },
    { key: 'timeline', header: 'Timeline' },
    { key: 'status', header: 'Status', render: (r) => <PerformanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'PIPs' }]} title="Performance Improvement Plans" description="Structured support for employees requiring additional development" actions={<Button onClick={() => toast('Create PIP')}><FiPlus className="h-4 w-4" /> Create PIP</Button>} />
      <PerformanceSubNav />
      <Card><CardContent className="pt-6">{isLoading ? <div className="data-table-empty">Loading...</div> : <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={plans as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />}</CardContent></Card>
    </div>
  );
}

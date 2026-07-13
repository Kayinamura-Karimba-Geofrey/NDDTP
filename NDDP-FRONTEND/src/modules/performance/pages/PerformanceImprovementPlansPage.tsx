import { FiPlus } from 'react-icons/fi';
import { useGetImprovementPlansQuery, useCreateImprovementPlanMutation } from '../api/performance.api';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PerformanceStatusBadge } from '../components/PerformanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { ImprovementPlan } from '../constants/performance-data';
import toast from 'react-hot-toast';

export function PerformanceImprovementPlansPage() {
  const { data: pips = [], isLoading } = useGetImprovementPlansQuery();
  const [createPip, { isLoading: isCreating }] = useCreateImprovementPlanMutation();

  const handleCreate = async () => {
    try {
      await createPip({ status: 'DRAFT' }).unwrap();
      toast.success('PIP created — complete details to activate');
    } catch {
      toast.error('Failed to create PIP');
    }
  };

  const columns: DataTableColumn<ImprovementPlan>[] = [
    { key: 'num', header: 'PIP #', render: (r) => <code className="text-xs">{r.planNumber}</code> },
    { key: 'employee', header: 'Employee', render: (r) => <span className="font-medium">{r.employee}</span> },
    { key: 'supervisor', header: 'Supervisor' },
    { key: 'gap', header: 'Performance Gap', render: (r) => r.performanceGap },
    { key: 'timeline', header: 'Timeline' },
    { key: 'status', header: 'Status', render: (r) => <PerformanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'PIPs' }]} title="Performance Improvement Plans" description="Structured support for employees requiring additional development" actions={<Button onClick={handleCreate} isLoading={isCreating}><FiPlus className="h-4 w-4" /> Create PIP</Button>} />
      <PerformanceSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={pips as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

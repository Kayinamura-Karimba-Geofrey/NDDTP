import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetReviewCyclesQuery, useCreateReviewCycleMutation } from '../api/performance.api';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PerformanceStatusBadge } from '../components/PerformanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { ReviewCycle } from '../constants/performance-data';
import toast from 'react-hot-toast';

export function ReviewCyclesPage() {
  const { data: cycles = [], isLoading } = useGetReviewCyclesQuery();
  const [createCycle, { isLoading: isCreating }] = useCreateReviewCycleMutation();

  const handleCreate = async () => {
    try {
      await createCycle({ name: 'New Review Cycle', type: 'ANNUAL', status: 'PLANNED' }).unwrap();
      toast.success('Review cycle created');
    } catch {
      toast.error('Failed to create review cycle');
    }
  };

  const columns: DataTableColumn<ReviewCycle>[] = [
    { key: 'code', header: 'Code', render: (r) => <code className="text-xs">{r.code}</code> },
    { key: 'name', header: 'Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'type', header: 'Type' },
    { key: 'start', header: 'Start Date', render: (r) => dayjs(r.startDate).format('MMM D, YYYY') },
    { key: 'end', header: 'End Date', render: (r) => dayjs(r.endDate).format('MMM D, YYYY') },
    { key: 'status', header: 'Status', render: (r) => <PerformanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Review Cycles' }]} title="Review Cycles" description="Configure annual, quarterly, and probation review periods" actions={<Button onClick={handleCreate} isLoading={isCreating}><FiPlus className="h-4 w-4" /> Create Cycle</Button>} />
      <PerformanceSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={cycles as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

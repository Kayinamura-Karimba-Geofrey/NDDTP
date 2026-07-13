import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetPerformanceReviewsQuery, useStartReviewMutation } from '../api/performance.api';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PerformanceStatusBadge } from '../components/PerformanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { PerformanceReview } from '../constants/performance-data';
import toast from 'react-hot-toast';

export function PerformanceReviewsPage() {
  const { data, isLoading } = useGetPerformanceReviewsQuery({ page: 1, limit: 50 });
  const reviews = data?.data ?? [];
  const [startReview, { isLoading: isStarting }] = useStartReviewMutation();

  const handleStart = async () => {
    try {
      await startReview({ reviewType: 'Annual' }).unwrap();
      toast.success('Review started');
    } catch {
      toast.error('Failed to start review');
    }
  };

  const columns: DataTableColumn<PerformanceReview>[] = [
    { key: 'num', header: 'Review #', render: (r) => <code className="text-xs">{r.reviewNumber}</code> },
    { key: 'employee', header: 'Employee' },
    { key: 'reviewer', header: 'Reviewer', render: (r) => r.reviewer ?? '—' },
    { key: 'cycle', header: 'Cycle' },
    { key: 'type', header: 'Type', render: (r) => r.reviewType },
    { key: 'rating', header: 'Overall Rating', render: (r) => r.overallRating ? <span className="capitalize">{String(r.overallRating).replace(/_/g, ' ')}</span> : '—' },
    { key: 'submitted', header: 'Submitted', render: (r) => r.submittedAt ? dayjs(r.submittedAt).format('DD MMM YYYY') : '—' },
    { key: 'status', header: 'Status', render: (r) => <PerformanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Reviews' }]} title="Performance Reviews" description="Formal review process — self-assessment, supervisor review, final rating" actions={<Button onClick={handleStart} isLoading={isStarting}><FiPlus className="h-4 w-4" /> Start Review</Button>} />
      <PerformanceSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={reviews as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

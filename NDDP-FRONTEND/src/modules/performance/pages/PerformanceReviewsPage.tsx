import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetPerformanceReviewsQuery } from '../api/performance.api';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PerformanceStatusBadge } from '../components/PerformanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { PerformanceReview } from '../constants/performance-data';

export function PerformanceReviewsPage() {
  const { data, isLoading } = useGetPerformanceReviewsQuery({ page: 1, limit: 100 });
  const rows = data?.data ?? [];

  const columns: DataTableColumn<PerformanceReview>[] = [
    { key: 'num', header: 'Review #', render: (r) => <code className="text-xs">{r.reviewNumber}</code> },
    { key: 'employee', header: 'Employee', render: (r) => <span className="font-medium">{r.employee}</span> },
    { key: 'cycle', header: 'Cycle' },
    { key: 'type', header: 'Type' },
    { key: 'rating', header: 'Rating', render: (r) => r.overallRating ? String(r.overallRating).replace(/_/g, ' ') : '—' },
    { key: 'status', header: 'Status', render: (r) => <PerformanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Reviews' }]} title="Performance Reviews" description="Formal review process — self-assessment, supervisor review, final rating" actions={<Button onClick={() => toast('Start review')}><FiPlus className="h-4 w-4" /> Start Review</Button>} />
      <PerformanceSubNav />
      <Card><CardContent className="pt-6">{isLoading ? <div className="data-table-empty">Loading...</div> : <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />}</CardContent></Card>
    </div>
  );
}

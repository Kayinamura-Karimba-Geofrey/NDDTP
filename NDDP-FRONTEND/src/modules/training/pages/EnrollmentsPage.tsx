import { useState } from 'react';
import dayjs from 'dayjs';
import { useGetEnrollmentsQuery } from '../api/training.api';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import type { Enrollment } from '../constants/training-data';

export function EnrollmentsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading } = useGetEnrollmentsQuery({ page: 1, limit: 50 });
  const rows = (data?.data ?? []).filter((r) => !statusFilter || r.status === statusFilter);

  const columns: DataTableColumn<Enrollment>[] = [
    { key: 'emp', header: 'Personnel', render: (r) => <span className="font-medium">{r.personnelName}</span> },
    { key: 'course', header: 'Course' },
    { key: 'date', header: 'Enrollment Date', render: (r) => dayjs(r.enrollmentDate).format('MMM D, YYYY') },
    { key: 'progress', header: 'Progress', render: (r) => `${r.progress}%` },
    { key: 'status', header: 'Status', render: (r) => <TrainingStatusBadge status={r.status} /> },
    { key: 'completed', header: 'Completion', render: (r) => r.completionDate ? dayjs(r.completionDate).format('MMM D, YYYY') : '—' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Enrollments' }]} title="Enrollments" description="Course enrollment management" />
      <TrainingSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {['', 'PENDING', 'APPROVED', 'ENROLLED', 'IN_PROGRESS', 'COMPLETED', 'WITHDRAWN'].map((s) => (
              <button key={s || 'all'} type="button" onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-medium ${statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{s ? s.replace(/_/g, ' ') : 'All'}</button>
            ))}
          </div>
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

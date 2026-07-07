import { useState } from 'react';
import { useGetTrainingCoursesQuery } from '../api/training.api';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import type { TrainingCourse } from '../constants/training-data';

export function TrainingCatalogPage() {
  const [categoryFilter, setCategoryFilter] = useState('');
  const { data: courses = [], isLoading } = useGetTrainingCoursesQuery();
  const rows = courses.filter((c) => !categoryFilter || c.category === categoryFilter);

  const columns: DataTableColumn<TrainingCourse>[] = [
    { key: 'code', header: 'Code', render: (r) => <code className="text-xs">{r.code}</code> },
    { key: 'title', header: 'Course Name', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'category', header: 'Category' },
    { key: 'instructor', header: 'Instructor' },
    { key: 'duration', header: 'Duration' },
    { key: 'mode', header: 'Delivery', render: (r) => r.deliveryMode },
    { key: 'capacity', header: 'Capacity', render: (r) => `${r.enrolled ?? 0}/${r.capacity}` },
    { key: 'status', header: 'Status', render: (r) => <TrainingStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Catalog' }]} title="Training Catalog" description="Browse all available training opportunities" />
      <TrainingSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {['', 'Technical', 'Leadership', 'Compliance', 'Health & Safety', 'Professional Development'].map((c) => (
              <button key={c || 'all'} type="button" onClick={() => setCategoryFilter(c)} className={`rounded-full px-3 py-1 text-xs font-medium ${categoryFilter === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{c || 'All'}</button>
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

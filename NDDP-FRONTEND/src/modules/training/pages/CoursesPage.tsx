import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetTrainingCoursesQuery } from '../api/training.api';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { TrainingCourse } from '../constants/training-data';

export function CoursesPage() {
  const { data: courses = [], isLoading } = useGetTrainingCoursesQuery();

  const columns: DataTableColumn<TrainingCourse>[] = [
    { key: 'code', header: 'Code', render: (r) => <code className="text-xs">{r.code}</code> },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'category', header: 'Category' },
    { key: 'duration', header: 'Duration' },
    { key: 'instructor', header: 'Instructor' },
    { key: 'mode', header: 'Delivery', render: (r) => r.deliveryMode },
    { key: 'capacity', header: 'Max Participants', render: (r) => r.capacity },
    { key: 'pass', header: 'Passing Score', render: (r) => r.passingScore ? `${r.passingScore}%` : '—' },
    { key: 'status', header: 'Status', render: (r) => <TrainingStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Courses' }]} title="Courses" description="Manage individual training courses" actions={<Button onClick={() => toast('Create course')}><FiPlus className="h-4 w-4" /> Create Course</Button>} />
      <TrainingSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={courses as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

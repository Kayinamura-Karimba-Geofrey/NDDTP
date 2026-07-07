import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_EXAMINATIONS, type Examination } from '../constants/training-data';

export function ExaminationsPage() {
  const columns: DataTableColumn<Examination>[] = [
    { key: 'name', header: 'Exam', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'course', header: 'Course' },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('MMM D, YYYY') },
    { key: 'duration', header: 'Duration' },
    { key: 'pass', header: 'Passing Score', render: (r) => `${r.passingScore}%` },
    { key: 'location', header: 'Location' },
    { key: 'invigilator', header: 'Invigilator' },
    { key: 'status', header: 'Status', render: (r) => <TrainingStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Examinations' }]} title="Examinations" description="Formal examinations and results" actions={<Button onClick={() => toast('Schedule examination')}><FiPlus className="h-4 w-4" /> Schedule Exam</Button>} />
      <TrainingSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_EXAMINATIONS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

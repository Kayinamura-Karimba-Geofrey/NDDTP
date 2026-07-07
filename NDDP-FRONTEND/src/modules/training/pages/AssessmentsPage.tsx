import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_ASSESSMENTS, type TrainingAssessment } from '../constants/training-data';

export function AssessmentsPage() {
  const columns: DataTableColumn<TrainingAssessment>[] = [
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'course', header: 'Course' },
    { key: 'type', header: 'Type' },
    { key: 'pass', header: 'Passing Score', render: (r) => `${r.passingScore}%` },
    { key: 'attempts', header: 'Attempts' },
    { key: 'duration', header: 'Duration' },
    { key: 'status', header: 'Status', render: (r) => <TrainingStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Assessments' }]} title="Assessments" description="Quizzes, assignments, and practical exercises" actions={<Button onClick={() => toast('Create assessment')}><FiPlus className="h-4 w-4" /> Create Assessment</Button>} />
      <TrainingSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_ASSESSMENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

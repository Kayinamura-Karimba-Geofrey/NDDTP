import { FiPlus } from 'react-icons/fi';
import { useGetTrainingAssessmentsQuery, useCreateAssessmentMutation } from '../api/training.api';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { TrainingAssessment } from '../constants/training-data';
import toast from 'react-hot-toast';

export function AssessmentsPage() {
  const { data: assessments = [], isLoading } = useGetTrainingAssessmentsQuery();
  const [createAssessment, { isLoading: isCreating }] = useCreateAssessmentMutation();

  const handleCreate = async () => {
    try {
      await createAssessment({ title: 'New Assessment', status: 'DRAFT' }).unwrap();
      toast.success('Assessment created');
    } catch {
      toast.error('Failed to create assessment');
    }
  };

  const columns: DataTableColumn<TrainingAssessment>[] = [
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'course', header: 'Course' },
    { key: 'type', header: 'Type' },
    { key: 'pass', header: 'Pass Score', render: (r) => `${r.passingScore}%` },
    { key: 'attempts', header: 'Max Attempts' },
    { key: 'duration', header: 'Duration' },
    { key: 'status', header: 'Status', render: (r) => <TrainingStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Assessments' }]} title="Assessments" description="Quizzes, assignments, and practical exercises" actions={<Button onClick={handleCreate} isLoading={isCreating}><FiPlus className="h-4 w-4" /> Create Assessment</Button>} />
      <TrainingSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={assessments as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

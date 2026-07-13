import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { MedicalStatusBadge } from '../components/MedicalStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMedicalAssessmentsQuery, useCreateAssessmentMutation } from '../api/medical.api';
import type { MedicalAssessment } from '../constants/medical-data';
import toast from 'react-hot-toast';

export function MedicalAssessmentsPage() {
  const { data: assessments = [], isLoading } = useGetMedicalAssessmentsQuery();
  const [createAssessment, { isLoading: isCreating }] = useCreateAssessmentMutation();

  const handleNew = async () => {
    try {
      await createAssessment({ category: 'Annual Assessment', status: 'PENDING' }).unwrap();
      toast.success('Assessment created');
    } catch {
      toast.error('Failed to create assessment');
    }
  };

  const columns: DataTableColumn<MedicalAssessment>[] = [
    { key: 'emp', header: 'Personnel', render: (r) => <span className="font-medium">{r.personnelName}</span> },
    { key: 'category', header: 'Category' },
    { key: 'date', header: 'Assessment Date', render: (r) => dayjs(r.assessmentDate).format('MMM D, YYYY') },
    { key: 'examiner', header: 'Examiner' },
    { key: 'followup', header: 'Follow-up', render: (r) => r.followUpRequired ? 'Yes' : 'No' },
    { key: 'status', header: 'Status', render: (r) => <MedicalStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Assessments' }]} title="Medical Assessments" description="Periodic medical examinations and fitness evaluations" actions={<Button onClick={handleNew} isLoading={isCreating}><FiPlus className="h-4 w-4" /> New Assessment</Button>} />
      <MedicalSubNav />
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

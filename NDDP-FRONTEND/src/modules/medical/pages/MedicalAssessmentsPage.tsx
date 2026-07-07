import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { MedicalStatusBadge } from '../components/MedicalStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_ASSESSMENTS, type MedicalAssessment } from '../constants/medical-data';

export function MedicalAssessmentsPage() {
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
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Assessments' }]} title="Medical Assessments" description="Periodic medical examinations and fitness evaluations" actions={<Button onClick={() => toast('New assessment form')}><FiPlus className="h-4 w-4" /> New Assessment</Button>} />
      <MedicalSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_ASSESSMENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

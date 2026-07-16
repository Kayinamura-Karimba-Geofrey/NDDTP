import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetExaminationsQuery, useScheduleExaminationMutation } from '../api/training.api';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { Examination } from '../constants/training-data';
import toast from 'react-hot-toast';

export function ExaminationsPage() {
  const { data: examinations = [], isLoading } = useGetExaminationsQuery();
  const [scheduleExam, { isLoading: isScheduling }] = useScheduleExaminationMutation();

  const handleSchedule = async () => {
    try {
      await scheduleExam({ name: 'New Examination', status: 'DRAFT' }).unwrap();
      toast.success('Examination scheduled');
    } catch {
      toast.error('Failed to schedule examination');
    }
  };

  const columns: DataTableColumn<Examination>[] = [
    { key: 'name', header: 'Examination', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'course', header: 'Course' },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('MMM D, YYYY') },
    { key: 'duration', header: 'Duration' },
    { key: 'location', header: 'Location' },
    { key: 'pass', header: 'Pass Score', render: (r) => `${r.passingScore}%` },
    { key: 'invigilator', header: 'Invigilator' },
    { key: 'status', header: 'Status', render: (r) => <TrainingStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Examinations' }]} title="Examinations" description="Formal examinations and results" actions={<Button onClick={handleSchedule} isLoading={isScheduling}><FiPlus className="h-4 w-4" /> Schedule Exam</Button>} />
      <TrainingSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={examinations as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

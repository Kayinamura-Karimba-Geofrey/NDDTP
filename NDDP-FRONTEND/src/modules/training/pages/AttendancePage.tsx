import dayjs from 'dayjs';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_ATTENDANCE, type AttendanceRecord } from '../constants/training-data';

export function AttendancePage() {
  const columns: DataTableColumn<AttendanceRecord>[] = [
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('MMM D, YYYY') },
    { key: 'course', header: 'Course' },
    { key: 'instructor', header: 'Instructor' },
    { key: 'emp', header: 'Personnel', render: (r) => <span className="font-medium">{r.personnelName}</span> },
    { key: 'status', header: 'Attendance', render: (r) => <TrainingStatusBadge status={r.status} /> },
    { key: 'notes', header: 'Notes', render: (r) => r.notes ?? '—' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Attendance' }]} title="Attendance" description="Session attendance tracking" />
      <TrainingSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_ATTENDANCE as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

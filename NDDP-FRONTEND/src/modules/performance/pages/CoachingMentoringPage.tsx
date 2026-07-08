import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_COACHING, type CoachingSession } from '../constants/performance-data';

export function CoachingMentoringPage() {
  const columns: DataTableColumn<CoachingSession>[] = [
    { key: 'coach', header: 'Coach' },
    { key: 'employee', header: 'Employee', render: (r) => <span className="font-medium">{r.employee}</span> },
    { key: 'objectives', header: 'Objectives', render: (r) => <span className="text-xs">{r.objectives}</span> },
    { key: 'next', header: 'Next Meeting', render: (r) => r.nextMeeting ?? '—' },
    { key: 'progress', header: 'Progress' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Coaching' }]} title="Coaching & Mentoring" description="Manage coaching relationships and sessions" actions={<Button onClick={() => toast('Schedule session')}><FiPlus className="h-4 w-4" /> Schedule Session</Button>} />
      <PerformanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_COACHING as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

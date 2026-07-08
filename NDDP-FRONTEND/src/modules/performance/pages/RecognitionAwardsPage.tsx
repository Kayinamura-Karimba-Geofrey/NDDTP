import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_RECOGNITION, type RecognitionAward } from '../constants/performance-data';

export function RecognitionAwardsPage() {
  const columns: DataTableColumn<RecognitionAward>[] = [
    { key: 'award', header: 'Award', render: (r) => <span className="font-medium">{r.award}</span> },
    { key: 'employee', header: 'Employee' },
    { key: 'reason', header: 'Reason', render: (r) => <span className="text-xs">{r.reason}</span> },
    { key: 'dept', header: 'Department' },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('DD MMM YYYY') },
    { key: 'by', header: 'Presented By' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Recognition' }]} title="Recognition & Awards" description="Employee achievements and commendations" actions={<Button onClick={() => toast('Nominate for award')}><FiPlus className="h-4 w-4" /> Nominate</Button>} />
      <PerformanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_RECOGNITION as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

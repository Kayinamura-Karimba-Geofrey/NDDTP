import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PerformanceStatusBadge } from '../components/PerformanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_DEPT_GOALS, type PerformanceGoal } from '../constants/performance-data';

export function DepartmentGoalsPage() {
  const columns: DataTableColumn<PerformanceGoal>[] = [
    { key: 'num', header: 'Goal #', render: (r) => <code className="text-xs">{r.goalNumber}</code> },
    { key: 'dept', header: 'Department' },
    { key: 'title', header: 'Goal', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'owner', header: 'Owner' },
    { key: 'target', header: 'Target' },
    { key: 'progress', header: 'Progress', render: (r) => `${r.progressPercent}%` },
    { key: 'status', header: 'Status', render: (r) => <PerformanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Department Goals' }]} title="Department Goals" description="Department objectives aligned to organizational goals" actions={<Button onClick={() => toast('Create dept goal')}><FiPlus className="h-4 w-4" /> Add Goal</Button>} />
      <PerformanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_DEPT_GOALS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

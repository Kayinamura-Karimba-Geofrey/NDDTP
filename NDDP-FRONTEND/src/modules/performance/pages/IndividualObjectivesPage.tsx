import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetMyGoalsQuery } from '../api/performance.api';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PerformanceStatusBadge } from '../components/PerformanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_INDIVIDUAL_OBJECTIVES, type PerformanceGoal } from '../constants/performance-data';

export function IndividualObjectivesPage() {
  const { data: apiGoals, isLoading } = useGetMyGoalsQuery();
  const rows = apiGoals?.length ? apiGoals : MOCK_INDIVIDUAL_OBJECTIVES;

  const columns: DataTableColumn<PerformanceGoal>[] = [
    { key: 'num', header: 'Objective #', render: (r) => <code className="text-xs">{r.goalNumber ?? r.id.slice(0, 8)}</code> },
    { key: 'employee', header: 'Employee', render: (r) => r.employee ?? '—' },
    { key: 'title', header: 'Description', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'weight', header: 'Weight', render: (r) => r.weight ? `${r.weight}%` : '—' },
    { key: 'target', header: 'Target', render: (r) => r.target ?? '—' },
    { key: 'due', header: 'Due Date', render: (r) => r.dueDate ? dayjs(r.dueDate).format('DD MMM YYYY') : '—' },
    { key: 'progress', header: 'Progress', render: (r) => `${r.progressPercent}%` },
    { key: 'status', header: 'Status', render: (r) => <PerformanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Objectives' }]} title="Individual Objectives" description="Measurable employee objectives" actions={<Button onClick={() => toast('Create objective')}><FiPlus className="h-4 w-4" /> New Objective</Button>} />
      <PerformanceSubNav />
      <Card><CardContent className="pt-6">{isLoading ? <div className="data-table-empty">Loading...</div> : <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />}</CardContent></Card>
    </div>
  );
}

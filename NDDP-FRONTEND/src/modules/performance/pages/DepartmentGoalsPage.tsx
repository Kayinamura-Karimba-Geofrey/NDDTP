import { useGetDeptGoalsQuery, useCreateGoalMutation } from '../api/performance.api';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PerformanceStatusBadge } from '../components/PerformanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { PerformanceGoal } from '../constants/performance-data';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';

export function DepartmentGoalsPage() {
  const { data: deptGoals = [], isLoading } = useGetDeptGoalsQuery();
  const [createGoal, { isLoading: isCreating }] = useCreateGoalMutation();

  const handleAdd = async () => {
    try {
      await createGoal({ title: 'New Department Goal', level: 'department' }).unwrap();
      toast.success('Department Goal created successfully');
    } catch {
      toast.error('Failed to create Department Goal');
    }
  };

  const columns: DataTableColumn<PerformanceGoal>[] = [
    { key: 'num', header: 'Goal #', render: (r) => <code className="text-xs">{r.goalNumber ?? r.id.slice(0, 8)}</code> },
    { key: 'dept', header: 'Department', render: (r) => r.department ?? '—' },
    { key: 'title', header: 'Goal', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'owner', header: 'Owner', render: (r) => r.owner ?? '—' },
    { key: 'target', header: 'Target', render: (r) => r.target ?? '—' },
    { key: 'progress', header: 'Progress', render: (r) => `${r.progressPercent}%` },
    { key: 'status', header: 'Status', render: (r) => <PerformanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Department Goals' }]} title="Department Goals" description="Department objectives aligned to organizational goals" actions={<Button onClick={handleAdd} isLoading={isCreating}><FiPlus className="h-4 w-4" /> Add Goal</Button>} />
      <PerformanceSubNav />
      <Card><CardContent className="pt-6">{isLoading ? <div className="data-table-empty">Loading...</div> : <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={deptGoals as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />}</CardContent></Card>
    </div>
  );
}

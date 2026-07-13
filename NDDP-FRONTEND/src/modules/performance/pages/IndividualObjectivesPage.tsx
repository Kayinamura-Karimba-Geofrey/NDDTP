import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetMyGoalsQuery } from '../api/performance.api';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PerformanceStatusBadge } from '../components/PerformanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { PerformanceGoal } from '../constants/performance-data';
import { CreateObjectiveModal } from '../components/CreateObjectiveModal';

export function IndividualObjectivesPage() {
  const { data: goals = [], isLoading } = useGetMyGoalsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<PerformanceGoal>[] = [
    { key: 'num', header: 'Objective #', render: (r) => <code className="text-xs">{r.goalNumber ?? r.id.slice(0, 8)}</code> },
    { key: 'employee', header: 'Employee', render: (r) => r.employee ?? '—' },
    { key: 'title', header: 'Description', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'weight', header: 'Weight', render: (r) => r.weight ? `${r.weight}%` : '—' },
    { key: 'target', header: 'Target', render: (r) => r.target ?? '—' },
    { key: 'due', header: 'Due Date', render: (r) => r.dueDate ? dayjs(r.dueDate).format('DD MMM YYYY') : '—' },
    { key: 'progress', header: 'Progress', render: (r) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-primary" style={{ width: `${r.progressPercent}%` }} />
        </div>
        <span className="text-xs">{r.progressPercent}%</span>
      </div>
    ) },
    { key: 'status', header: 'Status', render: (r) => <PerformanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Objectives' }]} title="Individual Objectives" description="Measurable employee objectives" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Objective</Button>} />
      <PerformanceSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={goals as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
      <CreateObjectiveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

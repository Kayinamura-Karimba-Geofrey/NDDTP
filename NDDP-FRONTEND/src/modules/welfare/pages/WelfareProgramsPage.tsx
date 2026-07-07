import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetWelfareProgramsQuery } from '../api/welfare.api';
import { WelfareSubNav } from '../components/WelfareSubNav';
import { WelfareStatusBadge } from '../components/WelfareStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { WelfareProgram } from '../constants/welfare-data';

export function WelfareProgramsPage() {
  const { data: programs = [], isLoading } = useGetWelfareProgramsQuery();

  const columns: DataTableColumn<WelfareProgram>[] = [
    { key: 'name', header: 'Program Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'category', header: 'Category', render: (r) => String(r.category).replace(/_/g, ' ') },
    { key: 'start', header: 'Start', render: (r) => dayjs(r.startDate).format('MMM D, YYYY') },
    { key: 'end', header: 'End', render: (r) => r.endDate ? dayjs(r.endDate).format('MMM D, YYYY') : '—' },
    { key: 'eligible', header: 'Eligible Personnel', render: (r) => <span className="text-xs">{r.eligiblePersonnel}</span> },
    { key: 'budget', header: 'Budget', render: (r) => r.budget ? `RWF ${r.budget.toLocaleString()}` : '—' },
    { key: 'coordinator', header: 'Coordinator' },
    { key: 'status', header: 'Status', render: (r) => <WelfareStatusBadge status={r.status} /> },
    { key: 'actions', header: 'Actions', render: () => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast('View participants')}>View</Button>
        <Button variant="ghost" size="sm" onClick={() => toast('Edit program')}>Edit</Button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'Programs' }]} title="Welfare Programs" description="Manage all welfare initiatives and programs" actions={<Button onClick={() => toast('Create program wizard')}><FiPlus className="h-4 w-4" /> Create Program</Button>} />
      <WelfareSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={programs as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

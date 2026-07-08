import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { MaintenanceStatusBadge } from '../components/MaintenanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetWorkOrdersQuery } from '../api/maintenance.api';
import type { WorkOrder } from '../constants/maintenance-data';

export function MaintenanceWorkOrdersPage() {
  const { data: orders = [] } = useGetWorkOrdersQuery();

  const columns: DataTableColumn<WorkOrder>[] = [
    { key: 'id', header: 'WO ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'asset', header: 'Asset', render: (r) => r.asset },
    { key: 'priority', header: 'Priority', render: (r) => r.priority },
    { key: 'assignee', header: 'Assignee', render: (r) => r.assignee },
    { key: 'due', header: 'Due', render: (r) => r.dueAt ?? '—' },
    { key: 'progress', header: 'Progress', render: (r) => `${r.progress}%` },
    { key: 'status', header: 'Status', render: (r) => <MaintenanceStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/maintenance/work-orders/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'Work Orders' }]} title="Work Orders" description="Schedule, start, complete, and track facility and equipment maintenance" actions={<Link to="/maintenance/requests/new"><Button><FiPlus className="h-4 w-4" /> From Request</Button></Link>} />
      <MaintenanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={orders as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { MaintenanceStatusBadge } from '../components/MaintenanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_MY_REQUESTS, type MaintenanceRequest } from '../constants/maintenance-data';

export function MaintenanceMyRequestsPage() {
  const columns: DataTableColumn<MaintenanceRequest>[] = [
    { key: 'id', header: 'Request ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'priority', header: 'Priority', render: (r) => r.priority },
    { key: 'at', header: 'Requested At', render: (r) => r.requestedAt },
    { key: 'status', header: 'Status', render: (r) => <MaintenanceStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/maintenance/requests/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'My Requests' }]} title="My Requests" description="Maintenance requests you submitted" actions={<Link to="/maintenance/requests/new"><Button>New Request</Button></Link>} />
      <MaintenanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_MY_REQUESTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

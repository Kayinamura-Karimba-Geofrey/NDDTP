import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { MaintenanceStatusBadge } from '../components/MaintenanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetPendingMaintenanceRequestsQuery } from '../api/maintenance.api';
import type { MaintenanceRequest } from '../constants/maintenance-data';

export function MaintenancePendingPage() {
  const { data: requests = [] } = useGetPendingMaintenanceRequestsQuery();

  const columns: DataTableColumn<MaintenanceRequest>[] = [
    { key: 'title', header: 'Request', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'category', header: 'Category', render: (r) => r.category },
    { key: 'priority', header: 'Priority', render: (r) => r.priority },
    { key: 'asset', header: 'Asset', render: (r) => r.asset },
    { key: 'by', header: 'Requested By', render: (r) => r.requestedBy },
    { key: 'status', header: 'Status', render: (r) => <MaintenanceStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <div className="flex gap-1">
          <Button size="sm" onClick={() => toast(`Approved ${r.id}`)}>Approve</Button>
          <Button size="sm" variant="outline" onClick={() => toast(`Rejected ${r.id}`)}>Reject</Button>
          <Link to={`/maintenance/requests/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'Pending' }]} title="Pending Approvals" description="Maintenance requests awaiting authorization" />
      <MaintenanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={requests as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

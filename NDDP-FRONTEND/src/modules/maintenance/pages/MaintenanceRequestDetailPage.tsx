import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { MaintenanceStatusBadge } from '../components/MaintenanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMaintenanceRequestsQuery } from '../api/maintenance.api';
import { MOCK_REQUESTS } from '../constants/maintenance-data';

export function MaintenanceRequestDetailPage() {
  const { id = 'REQ-301' } = useParams();
  const { data: requests = [] } = useGetMaintenanceRequestsQuery();
  const request = requests.find((r) => r.id === id) ?? MOCK_REQUESTS.find((r) => r.id === id) ?? MOCK_REQUESTS[0];

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Maintenance', path: '/maintenance/dashboard' },
          { label: 'Requests', path: '/maintenance/requests' },
          { label: request.id },
        ]}
        title={request.title}
        description={`${request.type} · ${request.category} · ${request.priority}`}
        actions={<MaintenanceStatusBadge status={request.status} />}
      />
      <MaintenanceSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Request ID</p><p className="mt-1 font-mono text-sm">{request.id}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Asset</p><p className="mt-1 font-medium">{request.asset}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Requested By</p><p className="mt-1 font-medium">{request.requestedBy}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Requested At</p><p className="mt-1 font-medium">{request.requestedAt}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Category</p><p className="mt-1 font-medium">{request.category}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Priority</p><p className="mt-1 font-medium">{request.priority}</p></CardContent></Card>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast('Request approved')}>Approve</Button>
        <Button variant="outline" onClick={() => toast('Request rejected')}>Reject</Button>
        <Button variant="outline" onClick={() => toast('Request cancelled')}>Cancel</Button>
        <Link to="/maintenance/work-orders"><Button variant="outline">Create Work Order</Button></Link>
      </div>
    </div>
  );
}

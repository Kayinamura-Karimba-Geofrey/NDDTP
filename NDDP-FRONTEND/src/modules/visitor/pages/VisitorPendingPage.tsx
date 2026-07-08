import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { VisitorSubNav } from '../components/VisitorSubNav';
import { VisitorStatusBadge } from '../components/VisitorStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetPendingVisitsQuery } from '../api/visitor.api';
import type { VisitRequest } from '../constants/visitor-data';

export function VisitorPendingPage() {
  const { data: visits = [] } = useGetPendingVisitsQuery();

  const columns: DataTableColumn<VisitRequest>[] = [
    { key: 'visitor', header: 'Visitor', render: (r) => <span className="font-medium">{r.visitor}</span> },
    { key: 'host', header: 'Host', render: (r) => r.host },
    { key: 'site', header: 'Site', render: (r) => r.site },
    { key: 'purpose', header: 'Purpose', render: (r) => r.purpose },
    { key: 'when', header: 'Scheduled', render: (r) => r.scheduledAt },
    { key: 'status', header: 'Status', render: (r) => <VisitorStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <div className="flex gap-1">
          <Button size="sm" onClick={() => toast(`Approved ${r.id}`)}>Approve</Button>
          <Button size="sm" variant="outline" onClick={() => toast(`Rejected ${r.id}`)}>Reject</Button>
          <Link to={`/visitors/requests/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Visitors', path: '/visitors/dashboard' }, { label: 'Pending' }]} title="Pending Approvals" description="Visit requests awaiting host or security approval" />
      <VisitorSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={visits as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

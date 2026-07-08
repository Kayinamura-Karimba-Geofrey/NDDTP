import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { VisitorSubNav } from '../components/VisitorSubNav';
import { VisitorStatusBadge } from '../components/VisitorStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetVisitRequestsQuery } from '../api/visitor.api';
import type { VisitRequest } from '../constants/visitor-data';

export function VisitorRequestsPage() {
  const { data: visits = [] } = useGetVisitRequestsQuery();

  const columns: DataTableColumn<VisitRequest>[] = [
    { key: 'id', header: 'Visit ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'visitor', header: 'Visitor', render: (r) => <span className="font-medium">{r.visitor}</span> },
    { key: 'host', header: 'Host', render: (r) => r.host },
    { key: 'site', header: 'Site', render: (r) => r.site },
    { key: 'purpose', header: 'Purpose', render: (r) => <span className="line-clamp-1">{r.purpose}</span> },
    { key: 'when', header: 'Scheduled', render: (r) => r.scheduledAt },
    { key: 'status', header: 'Status', render: (r) => <VisitorStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/visitors/requests/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Visitors', path: '/visitors/dashboard' }, { label: 'Requests' }]} title="Visit Requests" description="All scheduled, pending, approved, and completed visits" actions={<Link to="/visitors/requests/new"><Button><FiPlus className="h-4 w-4" /> New Visit</Button></Link>} />
      <VisitorSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={visits as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

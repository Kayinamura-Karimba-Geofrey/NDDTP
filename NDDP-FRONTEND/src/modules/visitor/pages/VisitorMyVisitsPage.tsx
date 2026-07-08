import { Link } from 'react-router-dom';
import { VisitorSubNav } from '../components/VisitorSubNav';
import { VisitorStatusBadge } from '../components/VisitorStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_MY_VISITS, type VisitRequest } from '../constants/visitor-data';

export function VisitorMyVisitsPage() {
  const columns: DataTableColumn<VisitRequest>[] = [
    { key: 'id', header: 'Visit ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'visitor', header: 'Visitor', render: (r) => r.visitor },
    { key: 'site', header: 'Site', render: (r) => r.site },
    { key: 'purpose', header: 'Purpose', render: (r) => r.purpose },
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
      <PageHeader breadcrumbs={[{ label: 'Visitors', path: '/visitors/dashboard' }, { label: 'My Visits' }]} title="My Visits" description="Visits you are hosting or recently hosted" actions={<Link to="/visitors/requests/new"><Button>New Visit</Button></Link>} />
      <VisitorSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_MY_VISITS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

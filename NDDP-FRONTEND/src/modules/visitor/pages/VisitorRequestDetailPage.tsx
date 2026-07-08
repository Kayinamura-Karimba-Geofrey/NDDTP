import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { VisitorSubNav } from '../components/VisitorSubNav';
import { VisitorStatusBadge } from '../components/VisitorStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetVisitRequestsQuery } from '../api/visitor.api';
import { MOCK_VISITS } from '../constants/visitor-data';

export function VisitorRequestDetailPage() {
  const { id = 'VST-501' } = useParams();
  const { data: visits = [] } = useGetVisitRequestsQuery();
  const visit = visits.find((v) => v.id === id) ?? MOCK_VISITS.find((v) => v.id === id) ?? MOCK_VISITS[0];

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Visitors', path: '/visitors/dashboard' },
          { label: 'Requests', path: '/visitors/requests' },
          { label: visit.id },
        ]}
        title={visit.visitor}
        description={`${visit.purpose} · ${visit.site}`}
        actions={<VisitorStatusBadge status={visit.status} />}
      />
      <VisitorSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Visit ID</p><p className="mt-1 font-mono text-sm">{visit.id}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Host</p><p className="mt-1 font-medium">{visit.host}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Site</p><p className="mt-1 font-medium">{visit.site}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Scheduled</p><p className="mt-1 font-medium">{visit.scheduledAt}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Badge</p><p className="mt-1 font-medium">{visit.badge ?? '—'}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Purpose</p><p className="mt-1 font-medium">{visit.purpose}</p></CardContent></Card>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast('Visit approved')}>Approve</Button>
        <Button variant="outline" onClick={() => toast('Visit rejected')}>Reject</Button>
        <Button variant="outline" onClick={() => toast('Visit cancelled')}>Cancel</Button>
        <Link to="/visitors/check-in"><Button variant="outline">Check-In Desk</Button></Link>
      </div>
    </div>
  );
}

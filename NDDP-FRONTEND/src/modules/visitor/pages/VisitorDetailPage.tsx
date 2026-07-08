import { useParams, Link } from 'react-router-dom';
import { VisitorSubNav } from '../components/VisitorSubNav';
import { VisitorStatusBadge } from '../components/VisitorStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetVisitorDirectoryQuery } from '../api/visitor.api';
import { MOCK_VISITORS } from '../constants/visitor-data';

export function VisitorDetailPage() {
  const { id = 'VIS-1001' } = useParams();
  const { data: visitors = [] } = useGetVisitorDirectoryQuery();
  const visitor = visitors.find((v) => v.id === id) ?? MOCK_VISITORS.find((v) => v.id === id) ?? MOCK_VISITORS[0];

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Visitors', path: '/visitors/dashboard' },
          { label: 'Directory', path: '/visitors/directory' },
          { label: visitor.name },
        ]}
        title={visitor.name}
        description={`${visitor.organization} · ${visitor.idType.replace(/_/g, ' ')}`}
        actions={<VisitorStatusBadge status={visitor.status} />}
      />
      <VisitorSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Visitor ID</p><p className="mt-1 font-mono text-sm">{visitor.id}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Phone</p><p className="mt-1 font-medium">{visitor.phone}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Email</p><p className="mt-1 font-medium">{visitor.email}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">ID Number</p><p className="mt-1 font-mono text-sm">{visitor.idNumber}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Total Visits</p><p className="mt-1 font-medium">{visitor.visits}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Last Visit</p><p className="mt-1 font-medium">{visitor.lastVisit ?? '—'}</p></CardContent></Card>
      </div>
      <Link to="/visitors/requests/new"><Button>Request Visit</Button></Link>
    </div>
  );
}

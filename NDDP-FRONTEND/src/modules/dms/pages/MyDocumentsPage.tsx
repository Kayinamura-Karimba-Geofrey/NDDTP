import { Link } from 'react-router-dom';
import { DmsSubNav } from '../components/DmsSubNav';
import { DmsStatusBadge } from '../components/DmsStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { DMS_MOCK_DOCUMENTS, MOCK_APPROVALS, MOCK_SIGNATURES, MOCK_SHARED } from '../constants/dms-data';

export function MyDocumentsPage() {
  const mine = DMS_MOCK_DOCUMENTS.filter((d) => d.owner.includes('Alice') || d.status === 'DRAFT');
  const awaitingApproval = MOCK_APPROVALS.filter((a) => a.status === 'PENDING_APPROVAL' || a.status === 'IN_REVIEW');
  const awaitingSig = MOCK_SIGNATURES.filter((s) => s.status === 'PENDING_SIGNATURE');
  const recent = DMS_MOCK_DOCUMENTS.slice(0, 3);
  const favorites = DMS_MOCK_DOCUMENTS.filter((d) => d.status === 'APPROVED' || d.status === 'SIGNED').slice(0, 2);

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'My Documents' }]} title="My Documents" description="Personal workspace — uploads, approvals, signatures, and favorites" />
      <DmsSubNav />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">My Uploads</CardTitle></CardHeader>
          <CardContent className="space-y-2 pt-4 text-sm">
            {mine.map((d) => (
              <Link key={d.id} to={`/dms/documents/${d.id}`} className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/50">
                <span className="font-medium">{d.title}</span>
                <DmsStatusBadge status={d.status} />
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Awaiting My Approval</CardTitle></CardHeader>
          <CardContent className="space-y-2 pt-4 text-sm">
            {awaitingApproval.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="font-medium">{a.document}</p><p className="text-xs text-muted-foreground">{a.stage} · {a.priority}</p></div>
                <DmsStatusBadge status={a.status} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Awaiting My Signature</CardTitle></CardHeader>
          <CardContent className="space-y-2 pt-4 text-sm">
            {awaitingSig.map((s) => (
              <div key={s.id} className="rounded-lg border border-border p-3">
                <p className="font-medium">{s.document}</p>
                <p className="text-xs text-muted-foreground">{s.signatories.filter((x) => x.status === 'Waiting').length} signature(s) remaining</p>
              </div>
            ))}
            {!awaitingSig.length && <p className="text-muted-foreground">No signatures pending.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Recently Viewed & Favorites</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm">
            <p className="text-xs font-medium uppercase text-muted-foreground">Recent</p>
            {recent.map((d) => <Link key={d.id} to={`/dms/documents/${d.id}`} className="block text-primary underline-offset-2 hover:underline">{d.documentNumber} — {d.title}</Link>)}
            <p className="pt-2 text-xs font-medium uppercase text-muted-foreground">Favorites</p>
            {favorites.map((d) => <Link key={d.id} to={`/dms/documents/${d.id}`} className="block text-primary underline-offset-2 hover:underline">{d.title}</Link>)}
            <p className="pt-2 text-xs font-medium uppercase text-muted-foreground">Shared With Me</p>
            {MOCK_SHARED.slice(0, 2).map((s) => <p key={s.id}>{s.document} · {s.accessLevel}</p>)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

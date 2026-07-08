import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { AdminSubNav } from '../components/AdminSubNav';
import { AdminStatusBadge } from '../components/AdminStatusBadge';
import { useGetConfigEntriesQuery, useGetConfigRevisionsQuery } from '../api/configuration.api';

export function ConfigEntryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: entries = [] } = useGetConfigEntriesQuery();
  const entry = entries.find((e) => e.id === id) ?? entries[0];
  const { data: revisions = [] } = useGetConfigRevisionsQuery(entry?.id);

  if (!entry) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'System Admin', path: '/administration/dashboard' }, { label: 'Entries', path: '/administration/entries' }, { label: 'Not found' }]} title="Entry Not Found" description="No entry matches this reference" />
        <AdminSubNav />
        <Link to="/administration/entries"><Button variant="outline">Back</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'System Admin', path: '/administration/dashboard' }, { label: 'Entries', path: '/administration/entries' }, { label: entry.key }]}
        title={entry.key}
        description={`${entry.namespaceCode} · ${entry.environment}`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <AdminStatusBadge status={entry.status} />
            {entry.status === 'DRAFT' && <Button size="sm" onClick={() => toast.success('Entry activated')}>Activate</Button>}
            {entry.status === 'ACTIVE' && <Button size="sm" variant="outline" onClick={() => toast('Entry deprecated')}>Deprecate</Button>}
            <Button size="sm" variant="outline" onClick={() => toast.success('Entry updated')}>Save</Button>
          </div>
        }
      />
      <AdminSubNav />
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Entry details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <Input label="Value" defaultValue={entry.value} />
            <Input label="Type" defaultValue={entry.valueType} disabled />
            <Input label="Description" defaultValue={entry.description} />
            <div className="text-sm text-muted-foreground">Version {entry.version} · Updated {entry.updatedAt}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm">Recent revisions</CardTitle>
            <Link to={`/administration/revisions/entry/${entry.id}`}><Button size="sm" variant="outline">All revisions</Button></Link>
          </CardHeader>
          <CardContent className="divide-y divide-border pt-0">
            {revisions.length === 0 ? (
              <p className="py-4 text-sm text-muted-foreground">No revisions recorded.</p>
            ) : (
              revisions.slice(0, 5).map((r) => (
                <div key={r.id} className="py-3 text-sm">
                  <p className="font-medium">v{r.version} · {r.changedBy}</p>
                  <p className="text-muted-foreground">{r.previousValue} → {r.newValue}</p>
                  <p className="text-xs text-muted-foreground">{r.changedAt}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

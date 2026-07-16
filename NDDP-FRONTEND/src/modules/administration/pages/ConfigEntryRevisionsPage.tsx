import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { AdminSubNav } from '../components/AdminSubNav';
import { useGetConfigEntriesQuery, useGetConfigRevisionsQuery } from '../api/configuration.api';

export function ConfigEntryRevisionsPage() {
  const { entryId } = useParams<{ entryId: string }>();
  const { data: entries = [] } = useGetConfigEntriesQuery();
  const entry = entries.find((e) => e.id === entryId) ?? entries[0];
  const { data: revisions = [] } = useGetConfigRevisionsQuery(entry?.id ?? entryId);

  if (!entry) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'System Admin', path: '/administration/dashboard' }, { label: 'Revisions', path: '/administration/revisions' }, { label: 'Not found' }]} title="Revisions Not Found" description="No entry matches this reference" />
        <AdminSubNav />
        <Link to="/administration/revisions"><Button variant="outline">Back</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'System Admin', path: '/administration/dashboard' }, { label: 'Revisions', path: '/administration/revisions' }, { label: entry.key }]}
        title={`Revisions · ${entry.key}`}
        description={`${entry.namespaceCode} · current v${entry.version}`}
        actions={<Link to={`/administration/entries/${entry.id}`}><Button size="sm" variant="outline">Open entry</Button></Link>}
      />
      <AdminSubNav />
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Version history</CardTitle></CardHeader>
        <CardContent className="divide-y divide-border pt-0">
          {revisions.length === 0 ? (
            <p className="py-4 text-sm text-muted-foreground">No revisions for this entry.</p>
          ) : (
            revisions.map((r) => (
              <div key={r.id} className="flex items-start justify-between gap-3 py-3 text-sm">
                <div>
                  <p className="font-medium">v{r.version} · {r.changedBy}</p>
                  <p className="text-muted-foreground"><span className="line-through opacity-70">{r.previousValue}</span> → <span className="font-medium text-foreground">{r.newValue}</span></p>
                  <p className="text-xs text-muted-foreground">{r.note}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{r.changedAt}</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { AdminSubNav } from '../components/AdminSubNav';
import { AdminStatusBadge } from '../components/AdminStatusBadge';
import { useGetConfigNamespacesQuery, useGetConfigEntriesQuery } from '../api/configuration.api';

export function ConfigNamespaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: namespaces = [] } = useGetConfigNamespacesQuery();
  const ns = namespaces.find((n) => n.id === id) ?? namespaces[0];
  const { data: entries = [] } = useGetConfigEntriesQuery(ns?.id);

  if (!ns) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'System Admin', path: '/administration/dashboard' }, { label: 'Namespaces', path: '/administration/namespaces' }, { label: 'Not found' }]} title="Namespace Not Found" description="No namespace matches this reference" />
        <AdminSubNav />
        <Link to="/administration/namespaces"><Button variant="outline">Back</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'System Admin', path: '/administration/dashboard' }, { label: 'Namespaces', path: '/administration/namespaces' }, { label: ns.code }]}
        title={ns.name}
        description={ns.description}
        actions={
          <div className="flex items-center gap-2">
            <AdminStatusBadge status={ns.status} />
            <Link to="/administration/entries/new"><Button size="sm">New Entry</Button></Link>
          </div>
        }
      />
      <AdminSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Code', value: ns.code },
          { label: 'Entries', value: ns.entryCount },
          { label: 'Updated', value: ns.updatedAt },
        ].map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">{k.label}</p><p className="mt-1 text-xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Entries in namespace</CardTitle></CardHeader>
        <CardContent className="divide-y divide-border pt-0">
          {entries.length === 0 ? (
            <p className="py-4 text-sm text-muted-foreground">No entries yet.</p>
          ) : (
            entries.map((e) => (
              <div key={e.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                <div>
                  <p className="font-medium font-mono text-xs">{e.key}</p>
                  <p className="text-muted-foreground truncate max-w-md">{e.value}</p>
                </div>
                <div className="flex items-center gap-2">
                  <AdminStatusBadge status={e.status} />
                  <Link to={`/administration/entries/${e.id}`}><Button size="sm" variant="outline">Open</Button></Link>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useParams, Link } from 'react-router-dom';
import { SearchPlatformSubNav } from '../components/SearchPlatformSubNav';
import { SearchStatusBadge } from '../components/SearchStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useGetSearchIndexesQuery, useGetSearchDocumentsQuery } from '../api/search.api';

export function SearchIndexDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: indexes = [] } = useGetSearchIndexesQuery();
  const index = indexes.find((i) => i.id === id) ?? indexes[0];
  const { data: documents = [] } = useGetSearchDocumentsQuery(index?.id);

  if (!index) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'Search', path: '/search/dashboard' }, { label: 'Indexes', path: '/search/indexes' }, { label: 'Not found' }]} title="Index Not Found" description="No index matches this reference" />
        <SearchPlatformSubNav />
        <Link to="/search/indexes"><Button variant="outline">Back to indexes</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Search', path: '/search/dashboard' }, { label: 'Indexes', path: '/search/indexes' }, { label: index.name }]}
        title={index.name}
        description={`${index.code} · ${index.indexType}`}
        actions={<SearchStatusBadge status={index.status} />}
      />
      <SearchPlatformSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Documents', value: index.documentCount.toLocaleString() },
          { label: 'Last Indexed', value: index.lastIndexedAt },
          { label: 'Type', value: index.indexType },
        ].map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">{k.label}</p><p className="mt-1 text-xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3 flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm">Documents in index</CardTitle>
          <Link to="/search/documents/new"><Button size="sm">Index Document</Button></Link>
        </CardHeader>
        <CardContent className="divide-y divide-border pt-0">
          {documents.length === 0 ? (
            <p className="py-4 text-sm text-muted-foreground">No documents for this index.</p>
          ) : (
            documents.map((d) => (
              <div key={d.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium">{d.title}</p>
                  <p className="text-muted-foreground">{d.externalId} · {d.indexedAt}</p>
                </div>
                <div className="flex items-center gap-2">
                  <SearchStatusBadge status={d.status} />
                  <Link to={`/search/documents/${d.id}`}><Button size="sm" variant="outline">Open</Button></Link>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

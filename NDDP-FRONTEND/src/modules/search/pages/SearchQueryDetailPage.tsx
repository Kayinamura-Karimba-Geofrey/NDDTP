import { useParams, Link } from 'react-router-dom';
import { SearchPlatformSubNav } from '../components/SearchPlatformSubNav';
import { SearchStatusBadge } from '../components/SearchStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useGetSearchQueriesQuery } from '../api/search.api';

export function SearchQueryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: queries = [] } = useGetSearchQueriesQuery();
  const record = queries.find((q) => q.id === id) ?? queries[0];

  if (!record) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'Search', path: '/search/dashboard' }, { label: 'Queries', path: '/search/queries' }, { label: 'Not found' }]} title="Query Not Found" description="No query matches this reference" />
        <SearchPlatformSubNav />
        <Link to="/search/queries"><Button variant="outline">Back to queries</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Search', path: '/search/dashboard' }, { label: 'Queries', path: '/search/queries' }, { label: record.id }]}
        title={record.query}
        description={`${record.indexName} · ${record.submittedAt}`}
        actions={<SearchStatusBadge status={record.status} />}
      />
      <SearchPlatformSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Hits', value: record.hitCount },
          { label: 'Submitted by', value: record.submittedBy },
          { label: 'Status', value: record.status },
        ].map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">{k.label}</p><p className="mt-1 text-xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Results</CardTitle></CardHeader>
        <CardContent className="divide-y divide-border pt-0">
          {record.results.length === 0 ? (
            <p className="py-4 text-sm text-muted-foreground">No hits returned.</p>
          ) : (
            record.results.map((hit) => (
              <div key={hit.documentId} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium">{hit.title}</p>
                  <p className="text-muted-foreground font-mono text-xs">{hit.documentId} · score {hit.score.toFixed(2)}</p>
                </div>
                <Link to={`/search/documents/${hit.documentId}`}><Button size="sm" variant="outline">Document</Button></Link>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

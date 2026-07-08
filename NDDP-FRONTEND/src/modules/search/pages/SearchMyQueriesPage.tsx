import { Link } from 'react-router-dom';
import { SearchPlatformSubNav } from '../components/SearchPlatformSubNav';
import { SearchStatusBadge } from '../components/SearchStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMySearchQueriesQuery } from '../api/search.api';
import type { SearchQueryRecord } from '../constants/search-data';

export function SearchMyQueriesPage() {
  const { data: queries = [] } = useGetMySearchQueriesQuery();

  const columns: DataTableColumn<SearchQueryRecord>[] = [
    { key: 'id', header: 'ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'query', header: 'Query', render: (r) => <span className="font-medium">{r.query}</span> },
    { key: 'indexName', header: 'Index', render: (r) => r.indexName },
    { key: 'hitCount', header: 'Hits', render: (r) => r.hitCount },
    { key: 'submittedAt', header: 'When', render: (r) => r.submittedAt },
    { key: 'status', header: 'Status', render: (r) => <SearchStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/search/queries/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Search', path: '/search/dashboard' }, { label: 'My Queries' }]} title="My Queries" description="Queries you submitted" actions={<Link to="/search/query"><Button>New Query</Button></Link>} />
      <SearchPlatformSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={queries as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { SearchPlatformSubNav } from '../components/SearchPlatformSubNav';
import { SearchStatusBadge } from '../components/SearchStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetSearchIndexesQuery } from '../api/search.api';
import type { SearchIndexRecord } from '../constants/search-data';

export function SearchIndexesPage() {
  const { data: indexes = [] } = useGetSearchIndexesQuery();

  const columns: DataTableColumn<SearchIndexRecord>[] = [
    { key: 'code', header: 'Code', render: (r) => <span className="font-mono text-xs">{r.code}</span> },
    { key: 'name', header: 'Index', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'indexType', header: 'Type', render: (r) => r.indexType },
    { key: 'documentCount', header: 'Documents', render: (r) => r.documentCount.toLocaleString() },
    { key: 'lastIndexedAt', header: 'Last Indexed', render: (r) => r.lastIndexedAt },
    { key: 'status', header: 'Status', render: (r) => <SearchStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/search/indexes/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Search', path: '/search/dashboard' }, { label: 'Indexes' }]} title="Search Indexes" description="Active corpora available for enterprise queries" actions={<Link to="/search/indexes/new"><Button><FiPlus className="h-4 w-4" /> New Index</Button></Link>} />
      <SearchPlatformSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={indexes as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

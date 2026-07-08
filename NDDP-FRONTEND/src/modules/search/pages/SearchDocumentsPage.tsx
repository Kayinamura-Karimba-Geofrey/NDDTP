import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { SearchPlatformSubNav } from '../components/SearchPlatformSubNav';
import { SearchStatusBadge } from '../components/SearchStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetSearchDocumentsQuery } from '../api/search.api';
import type { SearchDocumentRecord } from '../constants/search-data';

export function SearchDocumentsPage() {
  const { data: documents = [] } = useGetSearchDocumentsQuery();

  const columns: DataTableColumn<SearchDocumentRecord>[] = [
    { key: 'externalId', header: 'External ID', render: (r) => <span className="font-mono text-xs">{r.externalId}</span> },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'indexName', header: 'Index', render: (r) => r.indexName },
    { key: 'indexedAt', header: 'Indexed', render: (r) => r.indexedAt },
    { key: 'status', header: 'Status', render: (r) => <SearchStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/search/documents/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Search', path: '/search/dashboard' }, { label: 'Documents' }]} title="Indexed Documents" description="Content registered across search indexes" actions={<Link to="/search/documents/new"><Button><FiPlus className="h-4 w-4" /> Index Document</Button></Link>} />
      <SearchPlatformSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={documents as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SearchPlatformSubNav } from '../components/SearchPlatformSubNav';
import { SearchStatusBadge } from '../components/SearchStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useGetSearchDocumentsQuery } from '../api/search.api';

export function SearchDocumentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: documents = [] } = useGetSearchDocumentsQuery();
  const doc = documents.find((d) => d.id === id) ?? documents[0];

  if (!doc) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'Search', path: '/search/dashboard' }, { label: 'Documents', path: '/search/documents' }, { label: 'Not found' }]} title="Document Not Found" description="No indexed document matches this reference" />
        <SearchPlatformSubNav />
        <Link to="/search/documents"><Button variant="outline">Back to documents</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Search', path: '/search/dashboard' }, { label: 'Documents', path: '/search/documents' }, { label: doc.title }]}
        title={doc.title}
        description={`${doc.externalId} · ${doc.indexName}`}
        actions={
          <div className="flex items-center gap-2">
            <SearchStatusBadge status={doc.status} />
            <Button size="sm" variant="outline" onClick={() => toast.success('Document updated')}>Update</Button>
            <Button size="sm" variant="danger" onClick={() => toast.error('Document soft-deleted')}>Delete</Button>
          </div>
        }
      />
      <SearchPlatformSubNav />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Document metadata</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Document ID</span><span className="font-mono">{doc.id}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">External ID</span><span className="font-mono">{doc.externalId}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Index</span><Link to={`/search/indexes/${doc.indexId}`} className="text-primary hover:underline">{doc.indexName}</Link></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Indexed at</span><span>{doc.indexedAt}</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Content preview</CardTitle></CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">{doc.content}</CardContent>
        </Card>
      </div>
    </div>
  );
}

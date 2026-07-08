import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiDownload, FiZoomIn } from 'react-icons/fi';
import { useGetDmsDocumentQuery } from '../api/dms.api';
import { DmsSubNav } from '../components/DmsSubNav';
import { DmsStatusBadge } from '../components/DmsStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_VERSIONS } from '../constants/dms-data';

export function DocumentViewerPage() {
  const { id = 'd1' } = useParams();
  const { data: doc, isLoading } = useGetDmsDocumentQuery(id);

  if (isLoading) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Viewer' }]} title="Document Viewer" description="Loading…" />
        <DmsSubNav /><div className="data-table-empty">Loading document…</div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Library', path: '/dms/library' }, { label: 'Viewer' }]} title="Not Found" description="Document not found" />
        <DmsSubNav /><Card><CardContent className="pt-6"><Link to="/dms/library" className="underline">Back to library</Link></CardContent></Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Library', path: '/dms/library' }, { label: doc.documentNumber }]}
        title={doc.title}
        description={`${doc.documentNumber} · ${doc.fileType} · ${doc.version}`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast('Download')}><FiDownload className="h-4 w-4" /> Download</Button>
            <Button variant="outline" onClick={() => toast('Zoom')}><FiZoomIn className="h-4 w-4" /></Button>
          </div>
        }
      />
      <DmsSubNav />
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
        <DmsStatusBadge status={doc.status} />
        <span className="text-muted-foreground">{doc.category} · {doc.owner} · Modified {dayjs(doc.lastModified).format('DD MMM YYYY HH:mm')}</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="flex min-h-[420px] flex-col items-center justify-center bg-muted/40 pt-6 text-center text-sm text-muted-foreground">
            <p className="text-lg font-medium text-foreground">{doc.fileType} Preview</p>
            <p className="mt-2 max-w-md">Built-in viewer — PDF / Office / Image preview with zoom, rotate, page navigation, and in-document search. Annotations optional per policy.</p>
            <p className="mt-4 font-mono text-xs">{doc.documentNumber}.{(doc.fileType || 'pdf').toLowerCase()}</p>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-2 pt-6 text-sm">
              <p className="font-medium">Metadata</p>
              <p><span className="text-muted-foreground">Classification:</span> {doc.classification ?? '—'}</p>
              <p><span className="text-muted-foreground">Retention:</span> {doc.retentionClass ?? '—'}</p>
              <p><span className="text-muted-foreground">Department:</span> {doc.department}</p>
              <p><span className="text-muted-foreground">Related:</span> {doc.relatedEntity ?? '—'}</p>
              <p><span className="text-muted-foreground">Tags:</span> {doc.tags?.join(', ') ?? '—'}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2 pt-6 text-sm">
              <div className="flex items-center justify-between">
                <p className="font-medium">Versions</p>
                <Link to="/dms/versions" className="text-xs underline">History</Link>
              </div>
              {MOCK_VERSIONS.filter((v) => v.documentId === doc.id || doc.id === 'd1').slice(0, 3).map((v) => (
                <div key={v.id} className="border-b border-border pb-2 last:border-0">
                  <p className="font-medium">{v.version}{v.current ? ' · Current' : ''}</p>
                  <p className="text-xs text-muted-foreground">{v.notes} · {v.author}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

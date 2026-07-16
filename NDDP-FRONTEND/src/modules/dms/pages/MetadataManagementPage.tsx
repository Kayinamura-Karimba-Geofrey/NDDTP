import { DmsSubNav } from '../components/DmsSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { DMS_MOCK_DOCUMENTS, type DmsDocument } from '../constants/dms-data';

export function MetadataManagementPage() {
  const columns: DataTableColumn<DmsDocument>[] = [
    { key: 'num', header: 'Document #', render: (r) => <code className="text-xs">{r.documentNumber}</code> },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'cat', header: 'Category', render: (r) => r.category },
    { key: 'dept', header: 'Department', render: (r) => r.department },
    { key: 'class', header: 'Classification', render: (r) => r.classification ?? '—' },
    { key: 'ret', header: 'Retention', render: (r) => r.retentionClass ?? '—' },
    { key: 'related', header: 'Related Entity', render: (r) => r.relatedEntity ?? '—' },
    { key: 'tags', header: 'Tags', render: (r) => <span className="text-xs">{r.tags?.join(', ') ?? '—'}</span> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Metadata' }]} title="Metadata Management" description="Category-specific fields for Personnel, Procurement, Finance, Training, Medical" />
      <DmsSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={DMS_MOCK_DOCUMENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

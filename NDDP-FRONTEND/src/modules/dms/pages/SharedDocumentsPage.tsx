import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useGetSharedDocumentsQuery } from '../api/dms.api';
import { DmsSubNav } from '../components/DmsSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import type { SharedDocument } from '../constants/dms-data';

export function SharedDocumentsPage() {
  const { data: rows = [], isLoading } = useGetSharedDocumentsQuery();

  const columns: DataTableColumn<SharedDocument>[] = [
    { key: 'doc', header: 'Document', render: (r) => <span className="font-medium">{r.document}</span> },
    { key: 'num', header: 'Number', render: (r) => <code className="text-xs">{r.documentNumber}</code> },
    { key: 'by', header: 'Shared By', render: (r) => r.sharedBy },
    { key: 'access', header: 'Access Level', render: (r) => r.accessLevel },
    { key: 'date', header: 'Date Shared', render: (r) => dayjs(r.dateShared).format('DD MMM YYYY') },
    { key: 'expiry', header: 'Expiry', render: (r) => (r.expiry ? dayjs(r.expiry).format('DD MMM YYYY') : '—') },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Shared' }]} title="Shared Documents" description="Documents shared by users or departments — optional access expiry" />
      <DmsSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
          <p className="mt-4 text-sm text-muted-foreground">Open from <Link to="/dms/library" className="underline">Document Library</Link> to preview or comment.</p>
        </CardContent>
      </Card>
    </div>
  );
}

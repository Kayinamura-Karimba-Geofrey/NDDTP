import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { DmsSubNav } from '../components/DmsSubNav';
import { DmsStatusBadge } from '../components/DmsStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_ARCHIVE, type ArchiveRecord } from '../constants/dms-data';

export function ArchiveDisposalPage() {
  const columns: DataTableColumn<ArchiveRecord>[] = [
    { key: 'num', header: 'Document #', render: (r) => <code className="text-xs">{r.documentNumber}</code> },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'arch', header: 'Archived', render: (r) => dayjs(r.archivedDate).format('DD MMM YYYY') },
    { key: 'disp', header: 'Disposition', render: (r) => (r.dispositionDate ? dayjs(r.dispositionDate).format('DD MMM YYYY') : '—') },
    { key: 'status', header: 'Status', render: (r) => <DmsStatusBadge status={r.status} /> },
    {
      key: 'actions', header: '',
      render: (r) => r.status === 'PENDING_DISPOSAL' ? (
        <Button size="sm" variant="outline" onClick={() => toast('Disposal review opened')}>Review</Button>
      ) : null,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Archive' }]} title="Archive & Disposal" description="Active → Inactive → Archived → Pending Disposal → Disposed" />
      <DmsSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_ARCHIVE as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

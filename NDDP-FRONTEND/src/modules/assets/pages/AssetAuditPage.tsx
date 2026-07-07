import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { AssetSubNav } from '../components/AssetSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_AUDIT_HISTORY, type AssetAuditEntry } from '../constants/asset-data';

export function AssetAuditPage() {
  const columns: DataTableColumn<AssetAuditEntry>[] = [
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('MMM D, YYYY HH:mm') },
    { key: 'event', header: 'Event', render: (r) => <span className="font-medium">{r.event}</span> },
    { key: 'asset', header: 'Asset #', render: (r) => r.assetNumber ?? '—' },
    { key: 'desc', header: 'Description' },
    { key: 'by', header: 'Performed By', render: (r) => r.performedBy },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Audit' }]} title="Asset Audit" description="Complete audit trail of asset actions" actions={<Button onClick={() => toast('Schedule audit')}><FiPlus className="h-4 w-4" /> Schedule Audit</Button>} />
      <AssetSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_AUDIT_HISTORY as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

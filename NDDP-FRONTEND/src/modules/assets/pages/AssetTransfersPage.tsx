import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { AssetSubNav } from '../components/AssetSubNav';
import { AssetStatusBadge } from '../components/AssetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_TRANSFERS, type AssetTransfer } from '../constants/asset-data';

export function AssetTransfersPage() {
  const columns: DataTableColumn<AssetTransfer>[] = [
    { key: 'num', header: 'Asset #', render: (r) => <code className="text-xs">{r.assetNumber}</code> },
    { key: 'name', header: 'Asset' },
    { key: 'from', header: 'From', render: (r) => r.fromOwner },
    { key: 'to', header: 'To', render: (r) => r.toOwner },
    { key: 'dept', header: 'Department' },
    { key: 'date', header: 'Transfer Date', render: (r) => dayjs(r.transferDate).format('MMM D, YYYY') },
    { key: 'reason', header: 'Reason' },
    { key: 'status', header: 'Status', render: (r) => <AssetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Transfers' }]} title="Asset Transfers" description="Transfer assets between personnel, departments, and locations" actions={<Button onClick={() => toast('Initiate transfer')}><FiPlus className="h-4 w-4" /> New Transfer</Button>} />
      <AssetSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_TRANSFERS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

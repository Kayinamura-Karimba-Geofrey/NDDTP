import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetAssetTransfersQuery } from '../api/asset.api';
import { AssetSubNav } from '../components/AssetSubNav';
import { AssetStatusBadge } from '../components/AssetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { AssetTransfer } from '../constants/asset-data';
import { TransferAssetModal } from '../components/TransferAssetModal';

export function AssetTransfersPage() {
  const { data: transfers = [], isLoading } = useGetAssetTransfersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<AssetTransfer>[] = [
    { key: 'num', header: 'Asset #', render: (r) => <code className="text-xs">{r.assetNumber}</code> },
    { key: 'name', header: 'Asset', render: (r) => r.assetName },
    { key: 'from', header: 'From', render: (r) => r.fromOwner },
    { key: 'to', header: 'To', render: (r) => r.toOwner },
    { key: 'dept', header: 'Department' },
    { key: 'date', header: 'Transfer Date', render: (r) => dayjs(r.transferDate).format('MMM D, YYYY') },
    { key: 'reason', header: 'Reason' },
    { key: 'status', header: 'Status', render: (r) => <AssetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Transfers' }]} title="Asset Transfers" description="Transfer assets between personnel, departments, and locations" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Transfer</Button>} />
      <AssetSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={transfers as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <TransferAssetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

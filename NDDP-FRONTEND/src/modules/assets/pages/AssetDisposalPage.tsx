import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetAssetDisposalsQuery } from '../api/asset.api';
import { AssetSubNav } from '../components/AssetSubNav';
import { AssetStatusBadge } from '../components/AssetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { AssetDisposal } from '../constants/asset-data';
import { DisposeAssetModal } from '../components/DisposeAssetModal';

export function AssetDisposalPage() {
  const { data: disposals = [], isLoading } = useGetAssetDisposalsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<AssetDisposal>[] = [
    { key: 'num', header: 'Asset #', render: (r) => <code className="text-xs">{r.assetNumber}</code> },
    { key: 'name', header: 'Asset', render: (r) => r.assetName },
    { key: 'method', header: 'Method' },
    { key: 'reason', header: 'Reason' },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.disposalDate).format('MMM D, YYYY') },
    { key: 'value', header: 'Value', render: (r) => r.value !== undefined ? `RWF ${r.value.toLocaleString()}` : '—' },
    { key: 'status', header: 'Status', render: (r) => <AssetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Disposal' }]} title="Asset Disposal" description="Dispose assets per organizational policy" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Dispose Asset</Button>} />
      <AssetSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={disposals as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <DisposeAssetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

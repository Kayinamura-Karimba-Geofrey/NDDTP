import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetAssetReturnsQuery } from '../api/asset.api';
import { AssetSubNav } from '../components/AssetSubNav';
import { AssetStatusBadge } from '../components/AssetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { AssetReturn } from '../constants/asset-data';
import { ReturnAssetModal } from '../components/ReturnAssetModal';

export function AssetReturnsPage() {
  const { data: returns = [], isLoading } = useGetAssetReturnsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<AssetReturn>[] = [
    { key: 'num', header: 'Asset #', render: (r) => <code className="text-xs">{r.assetNumber}</code> },
    { key: 'name', header: 'Asset', render: (r) => r.assetName },
    { key: 'emp', header: 'Personnel', render: (r) => r.personnelName },
    { key: 'date', header: 'Returned', render: (r) => dayjs(r.returnedDate).format('MMM D, YYYY') },
    { key: 'condition', header: 'Condition' },
    { key: 'inspector', header: 'Inspector' },
    { key: 'status', header: 'Status', render: (r) => <AssetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Returns' }]} title="Asset Returns" description="Track returned assets with condition assessment" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Return Asset</Button>} />
      <AssetSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={returns as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <ReturnAssetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

import dayjs from 'dayjs';
import { AssetSubNav } from '../components/AssetSubNav';
import { AssetStatusBadge } from '../components/AssetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_RETURNS, type AssetReturn } from '../constants/asset-data';

export function AssetReturnsPage() {
  const columns: DataTableColumn<AssetReturn>[] = [
    { key: 'num', header: 'Asset #', render: (r) => <code className="text-xs">{r.assetNumber}</code> },
    { key: 'name', header: 'Asset' },
    { key: 'emp', header: 'Personnel', render: (r) => r.personnelName },
    { key: 'date', header: 'Returned', render: (r) => dayjs(r.returnedDate).format('MMM D, YYYY') },
    { key: 'condition', header: 'Condition' },
    { key: 'inspector', header: 'Inspector' },
    { key: 'status', header: 'Status', render: (r) => <AssetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Returns' }]} title="Asset Returns" description="Track returned assets with condition assessment" />
      <AssetSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_RETURNS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

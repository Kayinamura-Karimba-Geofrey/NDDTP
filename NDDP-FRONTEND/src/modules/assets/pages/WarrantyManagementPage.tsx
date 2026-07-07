import dayjs from 'dayjs';
import { AssetSubNav } from '../components/AssetSubNav';
import { AssetStatusBadge } from '../components/AssetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_WARRANTIES, type WarrantyRecord } from '../constants/asset-data';

export function WarrantyManagementPage() {
  const columns: DataTableColumn<WarrantyRecord>[] = [
    { key: 'asset', header: 'Asset', render: (r) => r.assetNumber },
    { key: 'name', header: 'Name' },
    { key: 'war', header: 'Warranty #', render: (r) => <code className="text-xs">{r.warrantyNumber}</code> },
    { key: 'provider', header: 'Provider' },
    { key: 'start', header: 'Start', render: (r) => dayjs(r.startDate).format('MMM D, YYYY') },
    { key: 'expiry', header: 'Expiry', render: (r) => dayjs(r.expiryDate).format('MMM D, YYYY') },
    { key: 'coverage', header: 'Coverage' },
    { key: 'status', header: 'Status', render: (r) => <AssetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Warranty' }]} title="Warranty Management" description="Warranty tracking, expiry alerts, and renewals" />
      <AssetSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_WARRANTIES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

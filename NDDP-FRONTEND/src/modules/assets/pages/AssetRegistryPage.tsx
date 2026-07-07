import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetAssetsQuery } from '../api/asset.api';
import { AssetSubNav } from '../components/AssetSubNav';
import { AssetStatusBadge } from '../components/AssetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { AssetRecord } from '../constants/asset-data';

export function AssetRegistryPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading } = useGetAssetsQuery({ page: 1, limit: 100 });
  const rows = (data?.data ?? []).filter((r) => !statusFilter || r.status === statusFilter);

  const columns: DataTableColumn<AssetRecord>[] = [
    { key: 'num', header: 'Asset #', render: (r) => <Link to={`/assets/profiles/${r.id}`} className="font-mono text-xs underline">{r.assetNumber}</Link> },
    { key: 'name', header: 'Asset Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'category', header: 'Category' },
    { key: 'type', header: 'Type' },
    { key: 'serial', header: 'Serial #', render: (r) => r.serialNumber ?? '—' },
    { key: 'dept', header: 'Department' },
    { key: 'assigned', header: 'Assigned To', render: (r) => r.assignedTo ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <AssetStatusBadge status={r.status} /> },
    { key: 'purchase', header: 'Purchase', render: (r) => r.purchaseDate ? dayjs(r.purchaseDate).format('MMM YYYY') : '—' },
    { key: 'location', header: 'Location', render: (r) => <span className="text-xs">{r.location}</span> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Registry' }]} title="Asset Registry" description="Master register of all organizational assets" actions={<Button onClick={() => toast('Register asset')}><FiPlus className="h-4 w-4" /> Register Asset</Button>} />
      <AssetSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {['', 'AVAILABLE', 'ASSIGNED', 'IN_MAINTENANCE', 'RESERVED', 'DISPOSED'].map((s) => (
              <button key={s || 'all'} type="button" onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-medium ${statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{s ? s.replace(/_/g, ' ') : 'All'}</button>
            ))}
          </div>
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetAssetMaintenanceQuery } from '../api/asset.api';
import { AssetSubNav } from '../components/AssetSubNav';
import { AssetStatusBadge } from '../components/AssetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { MaintenanceRecord } from '../constants/asset-data';
import { RequestMaintenanceModal } from '../components/RequestMaintenanceModal';

export function MaintenanceManagementPage() {
  const { data: maintenance = [], isLoading } = useGetAssetMaintenanceQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<MaintenanceRecord>[] = [
    { key: 'num', header: 'Maintenance #', render: (r) => <code className="text-xs">{r.maintenanceNumber}</code> },
    { key: 'asset', header: 'Asset', render: (r) => `${r.assetNumber} — ${r.assetName}` },
    { key: 'tech', header: 'Technician' },
    { key: 'type', header: 'Type' },
    { key: 'scheduled', header: 'Scheduled', render: (r) => dayjs(r.scheduledDate).format('MMM D, YYYY') },
    { key: 'completed', header: 'Completed', render: (r) => r.completionDate ? dayjs(r.completionDate).format('MMM D, YYYY') : '—' },
    { key: 'cost', header: 'Cost', render: (r) => r.cost ? `RWF ${r.cost.toLocaleString()}` : '—' },
    { key: 'status', header: 'Status', render: (r) => <AssetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Maintenance' }]} title="Maintenance Management" description="Preventive and corrective maintenance" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Schedule</Button>} />
      <AssetSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={maintenance as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <RequestMaintenanceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

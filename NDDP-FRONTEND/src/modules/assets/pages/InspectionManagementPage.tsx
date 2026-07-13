import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetAssetInspectionsQuery } from '../api/asset.api';
import { AssetSubNav } from '../components/AssetSubNav';
import { AssetStatusBadge } from '../components/AssetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { InspectionRecord } from '../constants/asset-data';
import { SubmitInspectionModal } from '../components/SubmitInspectionModal';

export function InspectionManagementPage() {
  const { data: inspections = [], isLoading } = useGetAssetInspectionsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<InspectionRecord>[] = [
    { key: 'asset', header: 'Asset', render: (r) => <code className="text-xs">{r.assetNumber}</code> },
    { key: 'name', header: 'Name', render: (r) => r.assetName },
    { key: 'date', header: 'Inspection Date', render: (r) => dayjs(r.inspectionDate).format('MMM D, YYYY') },
    { key: 'inspector', header: 'Inspector' },
    { key: 'condition', header: 'Condition' },
    { key: 'compliance', header: 'Compliance' },
    { key: 'status', header: 'Status', render: (r) => <AssetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Inspections' }]} title="Inspection Management" description="Routine asset inspections and compliance" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Schedule</Button>} />
      <AssetSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={inspections as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <SubmitInspectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

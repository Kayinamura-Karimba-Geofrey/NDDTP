import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { MaintenanceStatusBadge } from '../components/MaintenanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMaintenancePartsQuery } from '../api/maintenance.api';
import type { MaintenancePart } from '../constants/maintenance-data';
import { CreateMaintenancePartModal } from '../components/CreateMaintenancePartModal';

export function MaintenancePartsPage() {
  const { data: parts = [], isLoading } = useGetMaintenancePartsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<MaintenancePart>[] = [
    { key: 'sku', header: 'SKU', render: (r) => <span className="font-mono text-xs">{r.sku}</span> },
    { key: 'name', header: 'Part', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'stock', header: 'Stock', render: (r) => r.stock },
    { key: 'reorder', header: 'Reorder Level', render: (r) => r.reorderLevel },
    { key: 'cost', header: 'Unit Cost', render: (r) => r.unitCost },
    { key: 'status', header: 'Status', render: (r) => <MaintenanceStatusBadge status={r.stock <= r.reorderLevel ? 'OVERDUE' : r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Button size="sm" variant="outline" onClick={() => toast(`Reorder ${r.sku}`)}>Reorder</Button>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'Parts' }]} title="Parts Inventory" description="Spare parts stock levels tied to maintenance work orders" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Add Part</Button>} />
      <MaintenanceSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={parts as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateMaintenancePartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

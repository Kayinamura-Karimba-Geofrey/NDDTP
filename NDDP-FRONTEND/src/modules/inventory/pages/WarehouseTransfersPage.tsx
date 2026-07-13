import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetWarehouseTransfersQuery } from '../api/inventory.api';
import { InventorySubNav } from '../components/InventorySubNav';
import { InventoryStatusBadge } from '../components/InventoryStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { WarehouseTransfer } from '../constants/inventory-data';
import { CreateWarehouseTransferModal } from '../components/CreateWarehouseTransferModal';

export function WarehouseTransfersPage() {
  const { data: transfers = [], isLoading } = useGetWarehouseTransfersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<WarehouseTransfer>[] = [
    { key: 'num', header: 'Transfer #', render: (r) => <code className="text-xs">{r.transferNumber}</code> },
    { key: 'source', header: 'Source', render: (r) => <span className="text-xs">{r.sourceWarehouse}</span> },
    { key: 'dest', header: 'Destination', render: (r) => <span className="text-xs">{r.destinationWarehouse}</span> },
    { key: 'items', header: 'Items' },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.transferDate).format('DD MMM YYYY') },
    { key: 'status', header: 'Status', render: (r) => <InventoryStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Transfers' }]} title="Warehouse Transfers" description="Transfer stock between warehouses" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Transfer</Button>} />
      <InventorySubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={transfers as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
      <CreateWarehouseTransferModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

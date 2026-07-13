import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetGoodsReceiptsQuery } from '../api/inventory.api';
import { InventorySubNav } from '../components/InventorySubNav';
import { InventoryStatusBadge } from '../components/InventoryStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { GoodsReceipt } from '../constants/inventory-data';
import { CreateGoodsReceiptModal } from '../components/CreateGoodsReceiptModal';

export function GoodsReceiptPage() {
  const { data: receipts = [], isLoading } = useGetGoodsReceiptsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<GoodsReceipt>[] = [
    { key: 'num', header: 'Receipt #', render: (r) => <code className="text-xs">{r.receiptNumber}</code> },
    { key: 'supplier', header: 'Supplier' },
    { key: 'warehouse', header: 'Warehouse', render: (r) => <span className="text-xs">{r.warehouse}</span> },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.receiptDate).format('DD MMM YYYY') },
    { key: 'items', header: 'Items' },
    { key: 'qty', header: 'Quantity', render: (r) => r.quantity.toLocaleString() },
    { key: 'receiver', header: 'Receiver' },
    { key: 'status', header: 'Status', render: (r) => <InventoryStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Goods Receipt' }]} title="Goods Receipt" description="Record stock received into warehouses from procurement" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Receipt</Button>} />
      <InventorySubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={receipts as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
      <CreateGoodsReceiptModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

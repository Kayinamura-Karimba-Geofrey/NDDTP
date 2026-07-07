import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetInventoryItemsQuery } from '../api/inventory.api';
import { InventorySubNav } from '../components/InventorySubNav';
import { InventoryStatusBadge } from '../components/InventoryStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { InventoryItem } from '../constants/inventory-data';

export function InventoryItemsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading } = useGetInventoryItemsQuery({ page: 1, limit: 100 });
  const rows = (data?.data ?? []).filter((r) => !statusFilter || r.status === statusFilter);

  const columns: DataTableColumn<InventoryItem>[] = [
    { key: 'code', header: 'Item Code', render: (r) => <code className="text-xs">{r.itemCode}</code> },
    { key: 'name', header: 'Item Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'category', header: 'Category' },
    { key: 'unit', header: 'UoM' },
    { key: 'current', header: 'Current', render: (r) => r.currentStock.toLocaleString() },
    { key: 'reserved', header: 'Reserved', render: (r) => r.reservedStock.toLocaleString() },
    { key: 'available', header: 'Available', render: (r) => r.availableStock.toLocaleString() },
    { key: 'reorder', header: 'Reorder Level', render: (r) => r.reorderLevel },
    { key: 'warehouse', header: 'Warehouse', render: (r) => <span className="text-xs">{r.warehouse}</span> },
    { key: 'status', header: 'Status', render: (r) => <InventoryStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Items' }]} title="Inventory Items" description="Master list of consumable stock items" actions={<Button onClick={() => toast('Add item')}><FiPlus className="h-4 w-4" /> Add Item</Button>} />
      <InventorySubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {['', 'IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK'].map((s) => (
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

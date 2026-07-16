import { useGetStockLevelsQuery } from '../api/inventory.api';
import { InventorySubNav } from '../components/InventorySubNav';
import { InventoryStatusBadge } from '../components/InventoryStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import type { StockLevel } from '../constants/inventory-data';

export function StockLevelsPage() {
  const { data: levels = [], isLoading } = useGetStockLevelsQuery();

  const columns: DataTableColumn<StockLevel>[] = [
    { key: 'code', header: 'Item Code', render: (r) => <code className="text-xs">{r.itemCode}</code> },
    { key: 'name', header: 'Item Name', render: (r) => <span className="font-medium">{r.itemName}</span> },
    { key: 'warehouse', header: 'Warehouse', render: (r) => <span className="text-xs">{r.warehouse}</span> },
    { key: 'current', header: 'Current', render: (r) => r.currentStock.toLocaleString() },
    { key: 'reserved', header: 'Reserved', render: (r) => r.reservedStock.toLocaleString() },
    { key: 'available', header: 'Available', render: (r) => r.availableStock.toLocaleString() },
    { key: 'min', header: 'Min', render: (r) => r.minimumStock },
    { key: 'max', header: 'Max', render: (r) => r.maximumStock },
    { key: 'reorder', header: 'Reorder Pt', render: (r) => r.reorderPoint },
    { key: 'safety', header: 'Safety', render: (r) => r.safetyStock },
    { key: 'status', header: 'Status', render: (r) => <InventoryStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Stock Levels' }]} title="Stock Levels" description="Current inventory quantities across warehouses" />
      <InventorySubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={levels as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

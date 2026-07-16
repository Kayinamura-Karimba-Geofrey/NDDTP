import toast from 'react-hot-toast';
import { InventorySubNav } from '../components/InventorySubNav';
import { InventoryStatusBadge } from '../components/InventoryStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_REORDER, type ReorderItem } from '../constants/inventory-data';

export function ReorderManagementPage() {
  const columns: DataTableColumn<ReorderItem>[] = [
    { key: 'code', header: 'Item Code', render: (r) => <code className="text-xs">{r.itemCode}</code> },
    { key: 'name', header: 'Item Name', render: (r) => <span className="font-medium">{r.itemName}</span> },
    { key: 'current', header: 'Current', render: (r) => r.currentStock },
    { key: 'reorder', header: 'Reorder Pt', render: (r) => r.reorderPoint },
    { key: 'qty', header: 'Reorder Qty', render: (r) => r.reorderQuantity },
    { key: 'supplier', header: 'Preferred Supplier' },
    { key: 'lead', header: 'Lead Time' },
    { key: 'status', header: 'Status', render: (r) => <InventoryStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Reorder' }]} title="Reorder Management" description="Automatic replenishment recommendations for low stock items" actions={<Button onClick={() => toast('Generate replenishment recommendations')}>Generate Recommendations</Button>} />
      <InventorySubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_REORDER as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

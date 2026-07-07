import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { InventorySubNav } from '../components/InventorySubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_BATCHES, type BatchLot } from '../constants/inventory-data';

export function BatchLotManagementPage() {
  const columns: DataTableColumn<BatchLot>[] = [
    { key: 'batch', header: 'Batch #', render: (r) => <code className="text-xs">{r.batchNumber}</code> },
    { key: 'item', header: 'Item', render: (r) => <span className="font-medium">{r.itemName}</span> },
    { key: 'mfg', header: 'Manufacture', render: (r) => dayjs(r.manufactureDate).format('DD MMM YYYY') },
    { key: 'exp', header: 'Expiry', render: (r) => dayjs(r.expiryDate).format('DD MMM YYYY') },
    { key: 'supplier', header: 'Supplier' },
    { key: 'qty', header: 'Quantity', render: (r) => r.quantity.toLocaleString() },
    { key: 'warehouse', header: 'Warehouse', render: (r) => <span className="text-xs">{r.warehouse}</span> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Batch & Lot' }]} title="Batch & Lot Management" description="Traceability for medical supplies, food items, and chemicals" actions={<Button onClick={() => toast('Register batch')}><FiPlus className="h-4 w-4" /> Register Batch</Button>} />
      <InventorySubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_BATCHES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

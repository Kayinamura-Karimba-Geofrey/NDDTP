import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { InventorySubNav } from '../components/InventorySubNav';
import { InventoryStatusBadge } from '../components/InventoryStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_ADJUSTMENTS, type StockAdjustment } from '../constants/inventory-data';

export function StockAdjustmentsPage() {
  const columns: DataTableColumn<StockAdjustment>[] = [
    { key: 'num', header: 'Adjustment #', render: (r) => <code className="text-xs">{r.adjustmentNumber}</code> },
    { key: 'item', header: 'Item', render: (r) => <span className="font-medium">{r.itemName}</span> },
    { key: 'warehouse', header: 'Warehouse', render: (r) => <span className="text-xs">{r.warehouse}</span> },
    { key: 'reason', header: 'Reason' },
    { key: 'qty', header: 'Qty Change', render: (r) => <span className={r.quantity < 0 ? 'text-destructive' : 'text-success'}>{r.quantity > 0 ? '+' : ''}{r.quantity}</span> },
    { key: 'by', header: 'Adjusted By' },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('DD MMM YYYY') },
    { key: 'status', header: 'Status', render: (r) => <InventoryStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Adjustments' }]} title="Stock Adjustments" description="Correct inventory discrepancies with justification and approval" actions={<Button onClick={() => toast('New adjustment')}><FiPlus className="h-4 w-4" /> New Adjustment</Button>} />
      <InventorySubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_ADJUSTMENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

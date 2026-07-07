import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { InventorySubNav } from '../components/InventorySubNav';
import { InventoryStatusBadge } from '../components/InventoryStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_STOCK_COUNTS, type StockCount } from '../constants/inventory-data';

export function StockCountsPage() {
  const columns: DataTableColumn<StockCount>[] = [
    { key: 'num', header: 'Count #', render: (r) => <code className="text-xs">{r.countNumber}</code> },
    { key: 'warehouse', header: 'Warehouse', render: (r) => <span className="text-xs">{r.warehouse}</span> },
    { key: 'type', header: 'Type' },
    { key: 'counter', header: 'Counter' },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.countDate).format('DD MMM YYYY') },
    { key: 'variance', header: 'Variance', render: (r) => <span className={r.variance !== 0 ? 'text-warning' : ''}>{r.variance}</span> },
    { key: 'status', header: 'Status', render: (r) => <InventoryStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Stock Counts' }]} title="Stock Counts" description="Physical inventory verification — full, cycle, and spot counts" actions={<Button onClick={() => toast('Start count')}><FiPlus className="h-4 w-4" /> Start Count</Button>} />
      <InventorySubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_STOCK_COUNTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

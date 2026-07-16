import dayjs from 'dayjs';
import { InventorySubNav } from '../components/InventorySubNav';
import { InventoryStatusBadge } from '../components/InventoryStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_EXPIRY, type ExpiryItem } from '../constants/inventory-data';

export function ExpiryManagementPage() {
  const columns: DataTableColumn<ExpiryItem>[] = [
    { key: 'item', header: 'Item', render: (r) => <span className="font-medium">{r.itemName}</span> },
    { key: 'batch', header: 'Batch #', render: (r) => <code className="text-xs">{r.batchNumber}</code> },
    { key: 'exp', header: 'Expiry Date', render: (r) => dayjs(r.expiryDate).format('DD MMM YYYY') },
    { key: 'qty', header: 'Quantity', render: (r) => r.quantity.toLocaleString() },
    { key: 'warehouse', header: 'Warehouse', render: (r) => <span className="text-xs">{r.warehouse}</span> },
    { key: 'days', header: 'Days Left', render: (r) => <span className={r.daysRemaining < 30 ? 'text-destructive font-medium' : ''}>{r.daysRemaining}</span> },
    { key: 'status', header: 'Status', render: (r) => <InventoryStatusBadge status={r.status} /> },
  ];

  const nearExpiry = MOCK_EXPIRY.filter((e) => e.status === 'EXPIRING_SOON').length;
  const expired = MOCK_EXPIRY.filter((e) => e.status === 'EXPIRED').length;

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Expiry' }]} title="Expiry Management" description="Track inventory approaching expiration — 30, 60, 90 day alerts" />
      <InventorySubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">30-Day Alert</p><p className="text-2xl font-bold text-warning">{nearExpiry}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Expired Items</p><p className="text-2xl font-bold text-destructive">{expired}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Total Tracked</p><p className="text-2xl font-bold">{MOCK_EXPIRY.length}</p></CardContent></Card>
      </div>
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_EXPIRY as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

import { useParams, Link } from 'react-router-dom';
import { InventorySubNav } from '../components/InventorySubNav';
import { InventoryStatusBadge } from '../components/InventoryStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MOCK_WAREHOUSE_PROFILES } from '../constants/inventory-data';

export function WarehouseDetailPage() {
  const { id } = useParams();
  const warehouse = MOCK_WAREHOUSE_PROFILES.find((w) => w.id === id) ?? MOCK_WAREHOUSE_PROFILES[0];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Warehouses', path: '/inventory/warehouses' }, { label: warehouse.name }]} title={warehouse.name} description={warehouse.location} />
      <InventorySubNav />
      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg border border-border p-4">
        <div><p className="text-xs text-muted-foreground">Code</p><p className="font-mono font-medium">{warehouse.code}</p></div>
        <div><p className="text-xs text-muted-foreground">Manager</p><p className="font-medium">{warehouse.manager ?? '—'}</p></div>
        <div><p className="text-xs text-muted-foreground">Status</p><InventoryStatusBadge status={warehouse.status} /></div>
        <div><p className="text-xs text-muted-foreground">Items</p><p className="font-medium">{warehouse.itemCount?.toLocaleString()}</p></div>
        <Link to="/inventory/warehouses" className="ml-auto text-sm underline">← Back to warehouses</Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card><CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Overview</CardTitle></CardHeader><CardContent className="pt-4 text-sm text-muted-foreground">{warehouse.overview}</CardContent></Card>
        <Card><CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Stock Value</CardTitle></CardHeader><CardContent className="pt-4"><p className="text-2xl font-bold">{(warehouse.stockValue / 1e6).toFixed(0)}M RWF</p></CardContent></Card>
        <Card><CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Recent Activity</CardTitle></CardHeader><CardContent className="pt-4 space-y-2 text-sm"><p>Receipts: {warehouse.recentReceipts}</p><p>Issues: {warehouse.recentIssues}</p></CardContent></Card>
      </div>
    </div>
  );
}

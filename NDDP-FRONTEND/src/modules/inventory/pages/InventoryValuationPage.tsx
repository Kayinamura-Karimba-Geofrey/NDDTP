import { InventorySubNav } from '../components/InventorySubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { INVENTORY_DASHBOARD_KPIS } from '../constants/inventory-data';

export function InventoryValuationPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Valuation' }]} title="Inventory Valuation" description="Financial tracking — FIFO, weighted average, standard cost" />
      <InventorySubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Current Value</p><p className="text-2xl font-bold">{(INVENTORY_DASHBOARD_KPIS.inventoryValue / 1e9).toFixed(2)}B RWF</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Valuation Method</p><p className="text-2xl font-bold">FIFO</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Avg Cost / Item</p><p className="text-2xl font-bold">{(INVENTORY_DASHBOARD_KPIS.inventoryValue / INVENTORY_DASHBOARD_KPIS.totalItems / 1000).toFixed(0)}K</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Monthly Consumption</p><p className="text-2xl font-bold">185M RWF</p></CardContent></Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Valuation Methods</CardTitle></CardHeader>
          <CardContent className="space-y-2 pt-4 text-sm">
            <p><strong>FIFO</strong> — First In, First Out (active)</p>
            <p><strong>Weighted Average</strong> — Available</p>
            <p><strong>Standard Cost</strong> — Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Inventory Turnover</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <p className="text-3xl font-bold">4.2x</p>
            <p className="mt-1 text-sm text-muted-foreground">Annual turnover rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

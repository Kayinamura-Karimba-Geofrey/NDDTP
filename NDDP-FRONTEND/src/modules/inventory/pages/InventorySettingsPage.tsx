import { InventorySubNav } from '../components/InventorySubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function InventorySettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Settings' }]} title="Inventory Settings" description="Item numbering, warehouse structure, reorder rules, and approval workflows" />
      <InventorySubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Item Number Format" defaultValue="INV-{CATEGORY}-{SEQUENCE}" />
          <Input label="Valuation Method" defaultValue="FIFO" />
          <Input label="Reorder Rules" defaultValue="Auto-alert at reorder point; generate replenishment recommendation" className="sm:col-span-2" />
          <Input label="Stock Count Schedule" defaultValue="Cycle count monthly; full count annually" className="sm:col-span-2" />
          <Input label="Batch Number Rules" defaultValue="BATCH-{CATEGORY}-{YEAR}-{SEQUENCE}" className="sm:col-span-2" />
          <Input label="Approval Workflows" defaultValue="Stock Request: Manager → Warehouse; Transfer: Source WH → Dest WH" className="sm:col-span-2" />
          <Input label="Notification Templates" defaultValue="Low stock, Expiry alert, Pending approval, Transfer complete" className="sm:col-span-2" />
          <Input label="Barcode Rules" defaultValue="EAN-13 for retail items; internal code for bulk" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}

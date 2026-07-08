import toast from 'react-hot-toast';
import { LogisticsSubNav } from '../components/LogisticsSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function LogisticsCreateShipmentPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Logistics', path: '/logistics/dashboard' }, { label: 'Shipments', path: '/logistics/shipments' }, { label: 'New' }]} title="New Shipment" description="Draft a consignment for scheduling and dispatch" />
      <LogisticsSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Origin" defaultValue="HQ Central Depot" />
          <Input label="Destination" defaultValue="North Cantonment" />
          <Input label="Route" defaultValue="HQ to North Cantonment" />
          <Input label="Transport Mode" defaultValue="ROAD" />
          <Input label="Priority" defaultValue="PRIORITY" />
          <Input label="Scheduled Date" defaultValue="2026-07-10" />
          <Input label="Notes" defaultValue="Routine resupply — dry stores" className="sm:col-span-2" />
          <div className="sm:col-span-2 flex gap-2">
            <Button onClick={() => toast.success('Shipment drafted')}>Create Draft</Button>
            <Button variant="outline" onClick={() => toast('Draft saved')}>Save Draft</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

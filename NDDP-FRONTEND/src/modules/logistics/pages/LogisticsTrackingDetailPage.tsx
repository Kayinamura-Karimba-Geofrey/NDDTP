import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogisticsSubNav } from '../components/LogisticsSubNav';
import { LogisticsStatusBadge } from '../components/LogisticsStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { useGetShipmentsQuery, useGetShipmentTrackingQuery } from '../api/logistics.api';

export function LogisticsTrackingDetailPage() {
  const { shipmentId } = useParams<{ shipmentId: string }>();
  const { data: shipments = [] } = useGetShipmentsQuery();
  const shipment = shipments.find((s) => s.id === shipmentId) ?? shipments[0];
  const { data: events = [] } = useGetShipmentTrackingQuery(shipment?.id ?? shipmentId ?? 'all');

  if (!shipment) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'Logistics', path: '/logistics/dashboard' }, { label: 'Tracking', path: '/logistics/tracking' }, { label: 'Not found' }]} title="Tracking Not Found" description="No shipment matches this reference" />
        <LogisticsSubNav />
        <Link to="/logistics/tracking"><Button variant="outline">Back to tracking</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Logistics', path: '/logistics/dashboard' }, { label: 'Tracking', path: '/logistics/tracking' }, { label: shipment.shipmentNumber }]}
        title={`Tracking · ${shipment.shipmentNumber}`}
        description={`${shipment.origin} → ${shipment.destination}`}
        actions={<LogisticsStatusBadge status={shipment.status} />}
      />
      <LogisticsSubNav />
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Event timeline</CardTitle></CardHeader>
          <CardContent className="divide-y divide-border pt-0">
            {events.map((e) => (
              <div key={e.id} className="flex items-start justify-between gap-3 py-3 text-sm">
                <div>
                  <div className="mb-1"><LogisticsStatusBadge status={e.eventType} /></div>
                  <p className="font-medium">{e.location}</p>
                  <p className="text-muted-foreground">{e.notes} · {e.recordedBy}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{e.recordedAt}</span>
              </div>
            ))}
            {events.length === 0 && <p className="py-4 text-sm text-muted-foreground">No events recorded.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Record event</CardTitle></CardHeader>
          <CardContent className="grid gap-3 pt-4">
            <Input label="Event type" defaultValue="CHECKPOINT" />
            <Input label="Location" defaultValue="Muzanze Checkpoint" />
            <Input label="Notes" defaultValue="Cleared without incident" />
            <Button onClick={() => toast.success('Tracking event recorded')}>Record</Button>
            <Button variant="outline" onClick={() => toast('Delay flagged')}>Flag Delay</Button>
            <Link to={`/logistics/shipments/${shipment.id}`}><Button variant="outline" className="w-full">Open shipment</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

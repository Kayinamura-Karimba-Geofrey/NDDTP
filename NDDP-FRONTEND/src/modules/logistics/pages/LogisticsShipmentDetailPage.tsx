import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogisticsSubNav } from '../components/LogisticsSubNav';
import { LogisticsStatusBadge } from '../components/LogisticsStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useGetShipmentsQuery, useGetShipmentTrackingQuery } from '../api/logistics.api';

export function LogisticsShipmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: shipments = [] } = useGetShipmentsQuery();
  const shipment = shipments.find((s) => s.id === id) ?? shipments[0];
  const { data: events = [] } = useGetShipmentTrackingQuery(shipment?.id ?? 'all');

  if (!shipment) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'Logistics', path: '/logistics/dashboard' }, { label: 'Shipments', path: '/logistics/shipments' }, { label: 'Not found' }]} title="Shipment Not Found" description="No shipment matches this reference" />
        <LogisticsSubNav />
        <Link to="/logistics/shipments"><Button variant="outline">Back to shipments</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Logistics', path: '/logistics/dashboard' }, { label: 'Shipments', path: '/logistics/shipments' }, { label: shipment.shipmentNumber }]}
        title={shipment.shipmentNumber}
        description={`${shipment.origin} → ${shipment.destination}`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <LogisticsStatusBadge status={shipment.status} />
            {shipment.status === 'DRAFT' && <Button size="sm" onClick={() => toast.success('Shipment scheduled')}>Schedule</Button>}
            {shipment.status === 'SCHEDULED' && <Button size="sm" onClick={() => toast.success('Shipment dispatched')}>Dispatch</Button>}
            {shipment.status === 'DISPATCHED' && <Button size="sm" onClick={() => toast.success('Marked in transit')}>In Transit</Button>}
            {['IN_TRANSIT', 'DELAYED'].includes(shipment.status) && <Button size="sm" onClick={() => toast.success('Shipment delivered')}>Deliver</Button>}
            {!['DELIVERED', 'CANCELLED'].includes(shipment.status) && <Button size="sm" variant="danger" onClick={() => toast.error('Shipment cancelled')}>Cancel</Button>}
          </div>
        }
      />
      <LogisticsSubNav />
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Shipment details</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Route</span><span>{shipment.route}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Mode</span><span>{shipment.transportMode}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Priority</span><span>{shipment.priority}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Scheduled</span><span>{shipment.scheduledDate}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Items</span><span>{shipment.items}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Created by</span><span>{shipment.createdBy}</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm">Tracking timeline</CardTitle>
            <Link to={`/logistics/tracking/${shipment.id}`}><Button size="sm" variant="outline">Full tracking</Button></Link>
          </CardHeader>
          <CardContent className="divide-y divide-border pt-0">
            {(events.length ? events : []).slice(0, 5).map((e) => (
              <div key={e.id} className="flex items-start justify-between gap-3 py-3 text-sm">
                <div>
                  <p className="font-medium">{e.eventType.replace(/_/g, ' ')}</p>
                  <p className="text-muted-foreground">{e.location} · {e.notes}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{e.recordedAt}</span>
              </div>
            ))}
            {events.length === 0 && <p className="py-4 text-sm text-muted-foreground">No tracking events yet.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

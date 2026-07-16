import { Link } from 'react-router-dom';
import { LogisticsSubNav } from '../components/LogisticsSubNav';
import { LogisticsStatusBadge } from '../components/LogisticsStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_TRACKING, type TrackingEvent } from '../constants/logistics-data';

export function LogisticsTrackingPage() {
  const columns: DataTableColumn<TrackingEvent>[] = [
    { key: 'shipmentNumber', header: 'Shipment #', render: (r) => <span className="font-mono text-xs">{r.shipmentNumber}</span> },
    { key: 'eventType', header: 'Event', render: (r) => <LogisticsStatusBadge status={r.eventType} /> },
    { key: 'location', header: 'Location', render: (r) => r.location },
    { key: 'notes', header: 'Notes', render: (r) => r.notes },
    { key: 'recordedAt', header: 'Recorded', render: (r) => r.recordedAt },
    { key: 'recordedBy', header: 'By', render: (r) => r.recordedBy },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/logistics/tracking/${r.shipmentId}`}><Button size="sm" variant="outline">Timeline</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Logistics', path: '/logistics/dashboard' }, { label: 'Tracking' }]} title="Shipment Tracking" description="Live events, checkpoints, delays, and deliveries" />
      <LogisticsSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_TRACKING as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { LogisticsSubNav } from '../components/LogisticsSubNav';
import { LogisticsStatusBadge } from '../components/LogisticsStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_MY_SHIPMENTS, type LogisticsShipment } from '../constants/logistics-data';

export function LogisticsMyShipmentsPage() {
  const columns: DataTableColumn<LogisticsShipment>[] = [
    { key: 'shipmentNumber', header: 'Shipment #', render: (r) => <span className="font-mono text-xs">{r.shipmentNumber}</span> },
    { key: 'origin', header: 'Origin', render: (r) => r.origin },
    { key: 'destination', header: 'Destination', render: (r) => r.destination },
    { key: 'scheduledDate', header: 'Scheduled', render: (r) => r.scheduledDate },
    { key: 'status', header: 'Status', render: (r) => <LogisticsStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/logistics/shipments/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Logistics', path: '/logistics/dashboard' }, { label: 'My Shipments' }]} title="My Shipments" description="Shipments you created or own" actions={<Link to="/logistics/shipments/new"><Button>New Shipment</Button></Link>} />
      <LogisticsSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_MY_SHIPMENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

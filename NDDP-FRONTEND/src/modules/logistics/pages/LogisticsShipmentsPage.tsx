import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { LogisticsSubNav } from '../components/LogisticsSubNav';
import { LogisticsStatusBadge } from '../components/LogisticsStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetShipmentsQuery } from '../api/logistics.api';
import type { LogisticsShipment } from '../constants/logistics-data';

export function LogisticsShipmentsPage() {
  const { data: shipments = [] } = useGetShipmentsQuery();

  const columns: DataTableColumn<LogisticsShipment>[] = [
    { key: 'shipmentNumber', header: 'Shipment #', render: (r) => <span className="font-mono text-xs">{r.shipmentNumber}</span> },
    { key: 'origin', header: 'Origin', render: (r) => r.origin },
    { key: 'destination', header: 'Destination', render: (r) => r.destination },
    { key: 'mode', header: 'Mode', render: (r) => r.transportMode },
    { key: 'priority', header: 'Priority', render: (r) => r.priority },
    { key: 'scheduledDate', header: 'Scheduled', render: (r) => r.scheduledDate },
    { key: 'items', header: 'Items', render: (r) => r.items },
    { key: 'status', header: 'Status', render: (r) => <LogisticsStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/logistics/shipments/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Logistics', path: '/logistics/dashboard' }, { label: 'Shipments' }]} title="Shipments" description="Create, schedule, dispatch, and deliver consignments" actions={<Link to="/logistics/shipments/new"><Button><FiPlus className="h-4 w-4" /> New Shipment</Button></Link>} />
      <LogisticsSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={shipments as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

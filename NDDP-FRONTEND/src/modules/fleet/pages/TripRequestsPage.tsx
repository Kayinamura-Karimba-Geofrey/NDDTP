import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetFleetTripsQuery } from '../api/fleet.api';
import { FleetSubNav } from '../components/FleetSubNav';
import { FleetStatusBadge } from '../components/FleetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { TripRequest } from '../constants/fleet-data';

export function TripRequestsPage() {
  const { data: trips = [], isLoading } = useGetFleetTripsQuery();

  const columns: DataTableColumn<TripRequest>[] = [
    { key: 'num', header: 'Trip #', render: (r) => <code className="text-xs">{r.tripNumber}</code> },
    { key: 'requester', header: 'Requester', render: (r) => <span className="font-medium">{r.requester}</span> },
    { key: 'dept', header: 'Department' },
    { key: 'dest', header: 'Destination' },
    { key: 'purpose', header: 'Purpose', render: (r) => <span className="text-xs">{r.purpose}</span> },
    { key: 'dep', header: 'Departure', render: (r) => dayjs(r.departureDate).format('DD MMM YYYY') },
    { key: 'pax', header: 'Passengers' },
    { key: 'priority', header: 'Priority' },
    { key: 'status', header: 'Status', render: (r) => <FleetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Trip Requests' }]} title="Trip Requests" description="Personnel transportation requests and workflow" actions={<Button onClick={() => toast('Create trip request')}><FiPlus className="h-4 w-4" /> New Request</Button>} />
      <FleetSubNav />
      <Card><CardContent className="pt-6">{isLoading ? <div className="data-table-empty">Loading...</div> : <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={trips as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />}</CardContent></Card>
    </div>
  );
}

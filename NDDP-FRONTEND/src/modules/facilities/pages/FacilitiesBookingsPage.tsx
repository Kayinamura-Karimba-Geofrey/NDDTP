import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { FacilitiesStatusBadge } from '../components/FacilitiesStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetSpaceBookingsQuery } from '../api/facilities.api';
import type { SpaceBooking } from '../constants/facilities-data';

export function FacilitiesBookingsPage() {
  const { data: bookings = [] } = useGetSpaceBookingsQuery();

  const columns: DataTableColumn<SpaceBooking>[] = [
    { key: 'id', header: 'ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'space', header: 'Space', render: (r) => <span className="font-medium">{r.space}</span> },
    { key: 'facility', header: 'Facility', render: (r) => r.facility },
    { key: 'requester', header: 'Requester', render: (r) => r.requester },
    { key: 'purpose', header: 'Purpose', render: (r) => r.purpose },
    { key: 'startAt', header: 'Start', render: (r) => r.startAt },
    { key: 'endAt', header: 'End', render: (r) => r.endAt },
    { key: 'attendees', header: 'Attendees', render: (r) => r.attendees },
    { key: 'status', header: 'Status', render: (r) => <FacilitiesStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/facilities/bookings/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Bookings' }]} title="Space Bookings" description="Approve, schedule, and track facility reservations" actions={<Link to="/facilities/bookings/new"><Button><FiPlus className="h-4 w-4" /> New Booking</Button></Link>} />
      <FacilitiesSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={bookings as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

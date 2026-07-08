import { Link } from 'react-router-dom';
import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { FacilitiesStatusBadge } from '../components/FacilitiesStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_MY_BOOKINGS, type SpaceBooking } from '../constants/facilities-data';

export function FacilitiesMyBookingsPage() {
  const bookings = MOCK_MY_BOOKINGS;

  const columns: DataTableColumn<SpaceBooking>[] = [
    { key: 'id', header: 'ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'space', header: 'Space', render: (r) => <span className="font-medium">{r.space}</span> },
    { key: 'facility', header: 'Facility', render: (r) => r.facility },
    { key: 'purpose', header: 'Purpose', render: (r) => r.purpose },
    { key: 'startAt', header: 'Start', render: (r) => r.startAt },
    { key: 'endAt', header: 'End', render: (r) => r.endAt },
    { key: 'status', header: 'Status', render: (r) => <FacilitiesStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/facilities/bookings/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'My Bookings' }]} title="My Bookings" description="Reservations you requested or own" actions={<Link to="/facilities/bookings/new"><Button>New Booking</Button></Link>} />
      <FacilitiesSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={bookings as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { FacilitiesStatusBadge } from '../components/FacilitiesStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useGetSpaceBookingsQuery } from '../api/facilities.api';

export function FacilitiesBookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: bookings = [] } = useGetSpaceBookingsQuery();
  const booking = bookings.find((b) => b.id === id) ?? bookings[0];

  if (!booking) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Bookings', path: '/facilities/bookings' }, { label: 'Not found' }]} title="Booking Not Found" description="No booking matches this reference" />
        <FacilitiesSubNav />
        <Link to="/facilities/bookings"><Button variant="outline">Back to bookings</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Bookings', path: '/facilities/bookings' }, { label: booking.id }]}
        title={booking.space}
        description={`${booking.facility} · ${booking.purpose}`}
        actions={
          <div className="flex items-center gap-2">
            <FacilitiesStatusBadge status={booking.status} />
            {booking.status === 'PENDING' && (
              <>
                <Button size="sm" onClick={() => toast.success('Booking approved')}>Approve</Button>
                <Button size="sm" variant="danger" onClick={() => toast.error('Booking rejected')}>Reject</Button>
              </>
            )}
          </div>
        }
      />
      <FacilitiesSubNav />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Booking details</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Reference</span><span className="font-mono">{booking.id}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Requester</span><span>{booking.requester}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Start</span><span>{booking.startAt}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">End</span><span>{booking.endAt}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Attendees</span><span>{booking.attendees}</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Actions</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2 pt-4">
            <Button variant="outline" onClick={() => toast('Reminder sent')}>Send Reminder</Button>
            <Button variant="outline" onClick={() => toast('Booking cancelled')}>Cancel</Button>
            <Link to="/facilities/bookings"><Button variant="outline">All Bookings</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

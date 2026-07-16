import toast from 'react-hot-toast';
import { FacilitiesSubNav } from '../components/FacilitiesSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function FacilitiesCreateBookingPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Facilities', path: '/facilities/dashboard' }, { label: 'Bookings', path: '/facilities/bookings' }, { label: 'New' }]} title="New Space Booking" description="Reserve a room, hall, or other facility space" />
      <FacilitiesSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Space" defaultValue="HQ Boardroom" className="sm:col-span-2" />
          <Input label="Facility" defaultValue="HQ Complex" />
          <Input label="Attendees" defaultValue="12" type="number" />
          <Input label="Start" defaultValue="2026-07-10 09:00" />
          <Input label="End" defaultValue="2026-07-10 11:00" />
          <Input label="Purpose" defaultValue="Leadership planning session" className="sm:col-span-2" />
          <div className="sm:col-span-2 flex gap-2">
            <Button onClick={() => toast.success('Booking submitted for approval')}>Submit</Button>
            <Button variant="outline" onClick={() => toast('Draft saved')}>Save Draft</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

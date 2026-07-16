import toast from 'react-hot-toast';
import { CalendarSubNav } from '../components/CalendarSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function CalendarCreateEventPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Calendar', path: '/calendar/dashboard' }, { label: 'Events', path: '/calendar/events' }, { label: 'New' }]} title="Create Event" description="Schedule a meeting, training, ceremony, leave block, or other event" />
      <CalendarSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Title" defaultValue="Operations Coordination Brief" className="sm:col-span-2" />
          <Input label="Event Type" defaultValue="MEETING" />
          <Input label="Calendar" defaultValue="Organization Calendar" />
          <Input label="Start" defaultValue="2026-07-11 10:00" />
          <Input label="End" defaultValue="2026-07-11 11:00" />
          <Input label="Location" defaultValue="HQ Boardroom" className="sm:col-span-2" />
          <Input label="Attendees" defaultValue="alice@mod.gov.rw, jean@mod.gov.rw" className="sm:col-span-2" />
          <Input label="Description" defaultValue="Weekly coordination brief for operations cell" className="sm:col-span-2" />
          <div className="sm:col-span-2 flex gap-2">
            <Button onClick={() => toast('Event created as draft')}>Save Draft</Button>
            <Button variant="outline" onClick={() => toast('Event scheduled')}>Schedule</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

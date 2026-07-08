import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CalendarSubNav } from '../components/CalendarSubNav';
import { CalendarStatusBadge } from '../components/CalendarStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetCalendarEventsQuery } from '../api/calendar.api';
import { MOCK_EVENTS } from '../constants/calendar-data';

export function CalendarEventDetailPage() {
  const { id = 'EVT-101' } = useParams();
  const { data: events = [] } = useGetCalendarEventsQuery();
  const event = events.find((e) => e.id === id) ?? MOCK_EVENTS.find((e) => e.id === id) ?? MOCK_EVENTS[0];

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Calendar', path: '/calendar/dashboard' },
          { label: 'Events', path: '/calendar/events' },
          { label: event.title },
        ]}
        title={event.title}
        description={`${event.type.replace('_', ' ')} · ${event.calendar}`}
        actions={<CalendarStatusBadge status={event.status} />}
      />
      <CalendarSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Start</p><p className="mt-1 font-medium">{event.startAt}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">End</p><p className="mt-1 font-medium">{event.endAt}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Location</p><p className="mt-1 font-medium">{event.location ?? '—'}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Organizer</p><p className="mt-1 font-medium">{event.organizer}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Attendees</p><p className="mt-1 font-medium">{event.attendees}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Event ID</p><p className="mt-1 font-mono text-sm">{event.id}</p></CardContent></Card>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast('Event scheduled')}>Schedule</Button>
        <Button variant="outline" onClick={() => toast('Event completed')}>Complete</Button>
        <Button variant="outline" onClick={() => toast('Event cancelled')}>Cancel</Button>
        <Link to="/calendar/attendees"><Button variant="outline">Manage Attendees</Button></Link>
      </div>
    </div>
  );
}

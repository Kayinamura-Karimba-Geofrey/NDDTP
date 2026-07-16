import { Link } from 'react-router-dom';
import { CalendarSubNav } from '../components/CalendarSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { Button } from '@/components/ui';
import { useGetCalendarEventsQuery } from '../api/calendar.api';
import { MONTH_GRID } from '../constants/calendar-data';

export function CalendarViewPage() {
  const { data: events = [] } = useGetCalendarEventsQuery();
  const upcoming = events.filter((e) => e.status === 'SCHEDULED').slice(0, 5);

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Calendar', path: '/calendar/dashboard' }, { label: 'View' }]} title="Calendar View" description="Month overview with upcoming scheduled events" actions={<Link to="/calendar/events/new"><Button>New Event</Button></Link>} />
      <CalendarSubNav />
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <h3 className="mb-4 text-sm font-semibold">July 2026</h3>
            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {MONTH_GRID.map((cell) => (
                <div key={cell.day} className="min-h-16 rounded-lg border border-border p-1.5">
                  <p className="text-xs font-medium">{cell.day}</p>
                  {cell.events > 0 && <p className="mt-1 text-[10px] text-primary">{cell.events} event{cell.events > 1 ? 's' : ''}</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-4 text-sm font-semibold">Upcoming</h3>
            <div className="space-y-3">
              {upcoming.map((e) => (
                <Link key={e.id} to={`/calendar/events/${e.id}`} className="block rounded-lg border border-border p-3 hover:bg-muted/40">
                  <p className="text-sm font-medium">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{e.startAt}</p>
                  <p className="text-xs text-muted-foreground">{e.location ?? e.calendar}</p>
                </Link>
              ))}
              {upcoming.length === 0 && <p className="text-sm text-muted-foreground">No upcoming events</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

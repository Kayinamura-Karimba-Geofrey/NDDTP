import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { CalendarSubNav } from '../components/CalendarSubNav';
import { CalendarStatusBadge } from '../components/CalendarStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetCalendarEventsQuery } from '../api/calendar.api';
import type { CalendarEvent } from '../constants/calendar-data';

export function CalendarEventsPage() {
  const { data: events = [] } = useGetCalendarEventsQuery();

  const columns: DataTableColumn<CalendarEvent>[] = [
    { key: 'title', header: 'Event', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'type', header: 'Type', render: (r) => r.type.replace('_', ' ') },
    { key: 'calendar', header: 'Calendar', render: (r) => r.calendar },
    { key: 'start', header: 'Start', render: (r) => r.startAt },
    { key: 'organizer', header: 'Organizer', render: (r) => r.organizer },
    { key: 'attendees', header: 'Attendees', render: (r) => r.attendees },
    { key: 'status', header: 'Status', render: (r) => <CalendarStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/calendar/events/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Calendar', path: '/calendar/dashboard' }, { label: 'Events' }]} title="All Events" description="Meetings, trainings, ceremonies, leave blocks, and other scheduled activities" actions={<Link to="/calendar/events/new"><Button><FiPlus className="h-4 w-4" /> New Event</Button></Link>} />
      <CalendarSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={events as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

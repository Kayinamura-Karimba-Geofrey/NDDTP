import { Link } from 'react-router-dom';
import { CalendarSubNav } from '../components/CalendarSubNav';
import { CalendarStatusBadge } from '../components/CalendarStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMyCalendarEventsQuery } from '../api/calendar.api';
import type { CalendarEvent } from '../constants/calendar-data';

export function CalendarMyEventsPage() {
  const { data: events = [] } = useGetMyCalendarEventsQuery();

  const columns: DataTableColumn<CalendarEvent>[] = [
    { key: 'title', header: 'Event', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'type', header: 'Type', render: (r) => r.type.replace('_', ' ') },
    { key: 'start', header: 'Start', render: (r) => r.startAt },
    { key: 'end', header: 'End', render: (r) => r.endAt },
    { key: 'location', header: 'Location', render: (r) => r.location ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <CalendarStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/calendar/events/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Calendar', path: '/calendar/dashboard' }, { label: 'My Events' }]} title="My Events" description="Events you organize or are invited to" actions={<Link to="/calendar/events/new"><Button>New Event</Button></Link>} />
      <CalendarSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={events as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

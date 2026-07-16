import toast from 'react-hot-toast';
import { FiUserPlus } from 'react-icons/fi';
import { CalendarSubNav } from '../components/CalendarSubNav';
import { CalendarStatusBadge } from '../components/CalendarStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_ATTENDEES, type CalendarAttendee } from '../constants/calendar-data';

export function CalendarAttendeesPage() {
  const columns: DataTableColumn<CalendarAttendee>[] = [
    { key: 'event', header: 'Event', render: (r) => <span className="font-medium">{r.event}</span> },
    { key: 'name', header: 'Attendee', render: (r) => r.name },
    { key: 'email', header: 'Email', render: (r) => r.email },
    { key: 'role', header: 'Role', render: (r) => r.role },
    { key: 'rsvp', header: 'RSVP', render: (r) => <CalendarStatusBadge status={r.rsvp} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Calendar', path: '/calendar/dashboard' }, { label: 'Attendees' }]} title="Attendees" description="Manage event attendees and invitation roles" actions={<Button onClick={() => toast('Invite attendee')}><FiUserPlus className="h-4 w-4" /> Invite</Button>} />
      <CalendarSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_ATTENDEES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

import toast from 'react-hot-toast';
import { CalendarSubNav } from '../components/CalendarSubNav';
import { CalendarStatusBadge } from '../components/CalendarStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMyInvitationsQuery } from '../api/calendar.api';
import type { CalendarAttendee } from '../constants/calendar-data';

export function CalendarInvitationsPage() {
  const { data: invites = [] } = useGetMyInvitationsQuery();

  const columns: DataTableColumn<CalendarAttendee>[] = [
    { key: 'event', header: 'Event', render: (r) => <span className="font-medium">{r.event}</span> },
    { key: 'role', header: 'Role', render: (r) => r.role },
    { key: 'rsvp', header: 'RSVP', render: (r) => <CalendarStatusBadge status={r.rsvp} /> },
    {
      key: 'actions',
      header: 'Respond',
      render: () => (
        <div className="flex gap-1">
          <Button size="sm" onClick={() => toast('Accepted')}>Accept</Button>
          <Button size="sm" variant="outline" onClick={() => toast('Tentative')}>Tentative</Button>
          <Button size="sm" variant="outline" onClick={() => toast('Declined')}>Decline</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Calendar', path: '/calendar/dashboard' }, { label: 'Invitations' }]} title="Invitations" description="Respond to event invitations — accept, decline, or mark tentative" />
      <CalendarSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={invites as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

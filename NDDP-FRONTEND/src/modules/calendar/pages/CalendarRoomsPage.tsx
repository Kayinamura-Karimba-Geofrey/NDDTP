import { CalendarSubNav } from '../components/CalendarSubNav';
import { CalendarStatusBadge } from '../components/CalendarStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_ROOMS, type RoomBooking } from '../constants/calendar-data';

export function CalendarRoomsPage() {
  const columns: DataTableColumn<RoomBooking>[] = [
    { key: 'room', header: 'Room', render: (r) => <span className="font-medium">{r.room}</span> },
    { key: 'event', header: 'Event', render: (r) => r.event },
    { key: 'date', header: 'Date', render: (r) => r.date },
    { key: 'time', header: 'Time', render: (r) => r.time },
    { key: 'capacity', header: 'Capacity', render: (r) => r.capacity },
    { key: 'status', header: 'Status', render: (r) => <CalendarStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Calendar', path: '/calendar/dashboard' }, { label: 'Rooms' }]} title="Room Bookings" description="Meeting rooms and facility availability linked to calendar events" />
      <CalendarSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_ROOMS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { CalendarSubNav } from '../components/CalendarSubNav';
import { CalendarStatusBadge } from '../components/CalendarStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetRoomBookingsQuery } from '../api/calendar.api';
import type { RoomBooking } from '../constants/calendar-data';
import { BookRoomModal } from '../components/BookRoomModal';

export function CalendarRoomsPage() {
  const { data: rooms = [], isLoading } = useGetRoomBookingsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <PageHeader breadcrumbs={[{ label: 'Calendar', path: '/calendar/dashboard' }, { label: 'Rooms' }]} title="Room Bookings" description="Meeting rooms and facility availability linked to calendar events" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Book Room</Button>} />
      <CalendarSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rooms as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <BookRoomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

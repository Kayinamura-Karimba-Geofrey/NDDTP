import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { CalendarSubNav } from '../components/CalendarSubNav';
import { CalendarStatusBadge } from '../components/CalendarStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetCalendarsQuery } from '../api/calendar.api';
import type { CalendarRecord } from '../constants/calendar-data';
import { CreateCalendarModal } from '../components/CreateCalendarModal';

export function CalendarCalendarsPage() {
  const { data: calendars = [], isLoading } = useGetCalendarsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<CalendarRecord>[] = [
    { key: 'name', header: 'Calendar', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'owner', header: 'Owner', render: (r) => r.owner },
    { key: 'events', header: 'Events', render: (r) => r.eventCount },
    { key: 'desc', header: 'Description', render: (r) => r.description ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <CalendarStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Calendar', path: '/calendar/dashboard' }, { label: 'Calendars' }]} title="Calendars" description="Organizational, department, and personal calendars" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Calendar</Button>} />
      <CalendarSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={calendars as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateCalendarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

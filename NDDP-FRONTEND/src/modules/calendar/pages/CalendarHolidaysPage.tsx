import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { CalendarSubNav } from '../components/CalendarSubNav';
import { CalendarStatusBadge } from '../components/CalendarStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_HOLIDAYS, type HolidayItem } from '../constants/calendar-data';

export function CalendarHolidaysPage() {
  const columns: DataTableColumn<HolidayItem>[] = [
    { key: 'name', header: 'Holiday', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'date', header: 'Date', render: (r) => r.date },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'status', header: 'Status', render: (r) => <CalendarStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Calendar', path: '/calendar/dashboard' }, { label: 'Holidays' }]} title="Holiday Calendar" description="National and organizational holidays used for scheduling and SLA calculations" actions={<Button onClick={() => toast('Add holiday')}><FiPlus className="h-4 w-4" /> Add Holiday</Button>} />
      <CalendarSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_HOLIDAYS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

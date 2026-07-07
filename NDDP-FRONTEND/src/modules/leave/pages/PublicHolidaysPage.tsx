import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_HOLIDAYS, type PublicHoliday } from '../constants/leave-data';

export function PublicHolidaysPage() {
  const columns: DataTableColumn<PublicHoliday>[] = [
    { key: 'name', header: 'Holiday', render: (h) => <span className="font-medium">{h.name}</span> },
    { key: 'date', header: 'Date', render: (h) => dayjs(h.date).format('MMM D, YYYY') },
    { key: 'region', header: 'Region', render: (h) => h.region ?? 'National' },
    { key: 'recurring', header: 'Recurring', render: (h) => h.recurring ? 'Yes' : 'No' },
    { key: 'desc', header: 'Description', render: (h) => h.description ?? '—' },
    { key: 'actions', header: 'Actions', render: () => <Button variant="ghost" size="sm" onClick={() => toast('Edit')}>Edit</Button> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Public Holidays' }]} title="Public Holidays" description="Organization-wide holidays displayed in leave calendar" actions={<Button onClick={() => toast('Add holiday')}><FiPlus className="h-4 w-4" /> Add Holiday</Button>} />
      <LeaveSubNav />
      <Card><CardContent className="pt-6">
        <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_HOLIDAYS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
      </CardContent></Card>
    </div>
  );
}

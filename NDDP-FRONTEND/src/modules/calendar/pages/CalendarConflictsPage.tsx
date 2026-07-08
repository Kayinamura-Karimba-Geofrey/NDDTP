import toast from 'react-hot-toast';
import { CalendarSubNav } from '../components/CalendarSubNav';
import { CalendarStatusBadge } from '../components/CalendarStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_CONFLICTS, type ConflictItem } from '../constants/calendar-data';

export function CalendarConflictsPage() {
  const columns: DataTableColumn<ConflictItem>[] = [
    { key: 'user', header: 'Person', render: (r) => <span className="font-medium">{r.user}</span> },
    { key: 'a', header: 'Event A', render: (r) => r.eventA },
    { key: 'b', header: 'Event B', render: (r) => r.eventB },
    { key: 'overlap', header: 'Overlap', render: (r) => r.overlap },
    { key: 'status', header: 'Status', render: (r) => <CalendarStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: () => <Button size="sm" variant="outline" onClick={() => toast('Conflict resolved')}>Resolve</Button>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Calendar', path: '/calendar/dashboard' }, { label: 'Conflicts' }]} title="Scheduling Conflicts" description="Overlapping events that require review or reschedule" />
      <CalendarSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_CONFLICTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

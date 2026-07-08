import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { NotificationSubNav } from '../components/NotificationSubNav';
import { NotificationStatusBadge } from '../components/NotificationStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_REMINDERS, type ReminderRule } from '../constants/notification-data';

export function ReminderEnginePage() {
  const columns: DataTableColumn<ReminderRule>[] = [
    { key: 'name', header: 'Rule', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'trigger', header: 'Trigger', render: (r) => r.trigger },
    { key: 'channel', header: 'Channels', render: (r) => r.channel },
    { key: 'lead', header: 'Lead Time', render: (r) => r.leadTime },
    { key: 'status', header: 'Status', render: (r) => <NotificationStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'Reminders' }]} title="Reminder Engine" description="Automatically generated reminders — approvals, contracts, inspections, training, leave balance, and performance reviews" actions={<Button onClick={() => toast('Create reminder rule')}><FiPlus className="h-4 w-4" /> New Rule</Button>} />
      <NotificationSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_REMINDERS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

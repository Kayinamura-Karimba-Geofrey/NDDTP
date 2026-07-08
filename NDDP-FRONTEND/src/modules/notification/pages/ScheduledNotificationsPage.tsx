import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { NotificationSubNav } from '../components/NotificationSubNav';
import { NotificationStatusBadge } from '../components/NotificationStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_SCHEDULED, type ScheduledNotification } from '../constants/notification-data';

export function ScheduledNotificationsPage() {
  const columns: DataTableColumn<ScheduledNotification>[] = [
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'channel', header: 'Channel', render: (r) => r.channel.replace('_', ' ') },
    { key: 'scheduled', header: 'Scheduled For', render: (r) => r.scheduledFor },
    { key: 'audience', header: 'Audience', render: (r) => r.audience },
    { key: 'status', header: 'Status', render: (r) => <NotificationStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'Scheduled' }]} title="Scheduled Notifications" description="Future-delivery notifications — birthdays, contract expiry, license renewal, training, and medical reminders" actions={<Button onClick={() => toast('Schedule notification')}><FiPlus className="h-4 w-4" /> Schedule</Button>} />
      <NotificationSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_SCHEDULED as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

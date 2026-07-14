import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { NotificationSubNav } from '../components/NotificationSubNav';
import { NotificationStatusBadge } from '../components/NotificationStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetScheduledNotificationsQuery } from '../api/notification.api';
import type { ScheduledNotification } from '../constants/notification-data';
import { CreateScheduledNotificationModal } from '../components/CreateScheduledNotificationModal';

export function ScheduledNotificationsPage() {
  const { data: scheduled = [], isLoading } = useGetScheduledNotificationsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<ScheduledNotification>[] = [
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'channel', header: 'Channel', render: (r) => r.channel.replace('_', ' ') },
    { key: 'scheduled', header: 'Scheduled For', render: (r) => r.scheduledFor },
    { key: 'audience', header: 'Audience', render: (r) => r.audience },
    { key: 'status', header: 'Status', render: (r) => <NotificationStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'Scheduled' }]} title="Scheduled Notifications" description="Future-delivery notifications — birthdays, contract expiry, license renewal, training, and medical reminders" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Schedule</Button>} />
      <NotificationSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={scheduled as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateScheduledNotificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

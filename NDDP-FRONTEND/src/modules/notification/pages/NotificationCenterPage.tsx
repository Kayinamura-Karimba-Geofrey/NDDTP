import toast from 'react-hot-toast';
import { FiCheck, FiArchive } from 'react-icons/fi';
import { NotificationSubNav } from '../components/NotificationSubNav';
import { NotificationStatusBadge } from '../components/NotificationStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetNotificationInboxQuery } from '../api/notification.api';
import type { InboxNotification } from '../constants/notification-data';

export function NotificationCenterPage() {
  const { data: inbox = [] } = useGetNotificationInboxQuery();

  const columns: DataTableColumn<InboxNotification>[] = [
    { key: 'time', header: 'Time', render: (r) => r.time },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'service', header: 'Service', render: (r) => r.service },
    { key: 'channel', header: 'Channel', render: (r) => r.channel.replace('_', ' ') },
    { key: 'status', header: 'Status', render: (r) => <NotificationStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={() => toast('Marked as read')}><FiCheck className="h-3 w-3" /></Button>
          <Button size="sm" variant="outline" onClick={() => toast('Archived')}><FiArchive className="h-3 w-3" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'Center' }]} title="Notification Center" description="Centralized inbox — view, read, archive, and search notifications" actions={<Button onClick={() => toast('All marked as read')}>Mark All Read</Button>} />
      <NotificationSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={inbox as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

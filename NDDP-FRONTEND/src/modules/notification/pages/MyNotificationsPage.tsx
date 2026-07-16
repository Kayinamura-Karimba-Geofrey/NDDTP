import { NotificationSubNav } from '../components/NotificationSubNav';
import { NotificationStatusBadge } from '../components/NotificationStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { useGetNotificationInboxQuery } from '../api/notification.api';
import type { InboxNotification } from '../constants/notification-data';

const SECTIONS = ['Unread', 'Read', 'Archived', 'High Priority', 'Action Required'] as const;

export function MyNotificationsPage() {
  const { data: inbox = [] } = useGetNotificationInboxQuery();

  const columns: DataTableColumn<InboxNotification>[] = [
    { key: 'time', header: 'Time', render: (r) => r.time },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'service', header: 'Service', render: (r) => r.service },
    { key: 'priority', header: 'Priority', render: (r) => r.priority },
    { key: 'status', header: 'Status', render: (r) => <NotificationStatusBadge status={r.status} /> },
  ];

  const filterBySection = (section: string) => {
    switch (section) {
      case 'Unread': return inbox.filter((n) => n.status === 'UNREAD');
      case 'Read': return inbox.filter((n) => n.status === 'READ');
      case 'Archived': return inbox.filter((n) => n.status === 'ARCHIVED');
      case 'High Priority': return inbox.filter((n) => n.priority === 'High' || n.priority === 'Urgent');
      case 'Action Required': return inbox.filter((n) => n.actionRequired);
      default: return inbox;
    }
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'My Notifications' }]} title="My Notifications" description="Personal notification inbox with filtering by date, service, priority, and status" />
      <NotificationSubNav />
      <div className="space-y-6">
        {SECTIONS.map((section) => {
          const rows = filterBySection(section);
          if (rows.length === 0) return null;
          return (
            <Card key={section}>
              <CardContent className="pt-6">
                <h3 className="mb-4 text-sm font-semibold">{section} ({rows.length})</h3>
                <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

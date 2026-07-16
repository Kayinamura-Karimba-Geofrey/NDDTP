import { NotificationSubNav } from '../components/NotificationSubNav';
import { NotificationStatusBadge } from '../components/NotificationStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_DELIVERY, type DeliveryRecord } from '../constants/notification-data';

export function DeliveryTrackingPage() {
  const columns: DataTableColumn<DeliveryRecord>[] = [
    { key: 'id', header: 'Notification ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'channel', header: 'Channel', render: (r) => r.channel.replace('_', ' ') },
    { key: 'recipient', header: 'Recipient', render: (r) => r.recipient },
    { key: 'sent', header: 'Sent Time', render: (r) => r.sentTime },
    { key: 'delivered', header: 'Delivered Time', render: (r) => r.deliveredTime ?? '—' },
    { key: 'opened', header: 'Opened', render: (r) => (r.opened === undefined ? '—' : r.opened ? 'Yes' : 'No') },
    { key: 'service', header: 'Service', render: (r) => r.service },
    { key: 'status', header: 'Status', render: (r) => <NotificationStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'Delivery' }]} title="Delivery Tracking" description="Track every notification — queued, sent, delivered, opened, failed, and expired" />
      <NotificationSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_DELIVERY as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

import { NotificationSubNav } from '../components/NotificationSubNav';
import { NotificationStatusBadge } from '../components/NotificationStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_RETRY_QUEUE, type RetryQueueItem } from '../constants/notification-data';

export function RetryQueuePage() {
  const columns: DataTableColumn<RetryQueueItem>[] = [
    { key: 'id', header: 'Queue ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'notif', header: 'Notification ID', render: (r) => r.notificationId },
    { key: 'channel', header: 'Channel', render: (r) => r.channel.replace('_', ' ') },
    { key: 'attempt', header: 'Attempt', render: (r) => `#${r.attempt}` },
    { key: 'next', header: 'Next Retry', render: (r) => r.nextRetry },
    { key: 'status', header: 'Status', render: (r) => <NotificationStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'Retry Queue' }]} title="Retry Queue" description="Automatic retry logic — 5 min, 30 min, then move to failed queue" />
      <NotificationSubNav />
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="rounded-lg border border-border px-4 py-2">Attempt 1</span>
            <span>→ Wait 5 min →</span>
            <span className="rounded-lg border border-border px-4 py-2">Attempt 2</span>
            <span>→ Wait 30 min →</span>
            <span className="rounded-lg border border-border px-4 py-2">Attempt 3</span>
            <span>→ Failed Queue</span>
          </div>
        </CardContent>
      </Card>
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_RETRY_QUEUE as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

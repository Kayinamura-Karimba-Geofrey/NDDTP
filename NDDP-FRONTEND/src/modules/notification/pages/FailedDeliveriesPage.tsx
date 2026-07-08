import toast from 'react-hot-toast';
import { NotificationSubNav } from '../components/NotificationSubNav';
import { NotificationStatusBadge } from '../components/NotificationStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_FAILED, type FailedDelivery } from '../constants/notification-data';

export function FailedDeliveriesPage() {
  const columns: DataTableColumn<FailedDelivery>[] = [
    { key: 'id', header: 'ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'channel', header: 'Channel', render: (r) => r.channel.replace('_', ' ') },
    { key: 'recipient', header: 'Recipient', render: (r) => r.recipient },
    { key: 'reason', header: 'Reason', render: (r) => r.reason },
    { key: 'attempts', header: 'Attempts', render: (r) => r.attempts },
    { key: 'last', header: 'Last Attempt', render: (r) => r.lastAttempt },
    { key: 'status', header: 'Status', render: (r) => <NotificationStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={() => toast('Retry queued')}>Retry</Button>
          <Button size="sm" variant="outline" onClick={() => toast('Cancelled')}>Cancel</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'Failed' }]} title="Failed Deliveries" description="Invalid email, unreachable phone, invalid push token, provider errors, timeouts, and rate limits" />
      <NotificationSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_FAILED as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

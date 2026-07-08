import toast from 'react-hot-toast';
import { MessagingSubNav } from '../components/MessagingSubNav';
import { MessagingStatusBadge } from '../components/MessagingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_RECEIPTS, type MessageReceipt } from '../constants/messaging-data';

export function MessagingReceiptsPage() {
  const columns: DataTableColumn<MessageReceipt>[] = [
    { key: 'message', header: 'Message ID', render: (r) => <span className="font-mono text-xs">{r.messageId}</span> },
    { key: 'recipient', header: 'Recipient', render: (r) => r.recipient },
    { key: 'delivered', header: 'Delivered', render: (r) => r.deliveredAt ?? '—' },
    { key: 'read', header: 'Read', render: (r) => r.readAt ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <MessagingStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: () => <Button size="sm" variant="outline" onClick={() => toast('Receipt refreshed')}>Refresh</Button>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Messaging', path: '/messaging/dashboard' }, { label: 'Receipts' }]} title="Delivery Receipts" description="Track sent, delivered, and read acknowledgements for messages" />
      <MessagingSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_RECEIPTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

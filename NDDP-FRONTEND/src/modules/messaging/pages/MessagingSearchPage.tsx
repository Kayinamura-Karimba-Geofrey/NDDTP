import toast from 'react-hot-toast';
import { MessagingSubNav } from '../components/MessagingSubNav';
import { MessagingStatusBadge } from '../components/MessagingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent, Input } from '@/components/ui';
import { useGetChannelMessagesQuery } from '../api/messaging.api';
import type { MessagingMessage } from '../constants/messaging-data';

export function MessagingSearchPage() {
  const { data: messages = [] } = useGetChannelMessagesQuery();

  const columns: DataTableColumn<MessagingMessage>[] = [
    { key: 'channel', header: 'Channel', render: (r) => r.channelName },
    { key: 'sender', header: 'Sender', render: (r) => r.sender },
    { key: 'body', header: 'Message', render: (r) => <span className="line-clamp-1">{r.body}</span> },
    { key: 'at', header: 'Sent', render: (r) => r.sentAt },
    { key: 'status', header: 'Status', render: (r) => <MessagingStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Messaging', path: '/messaging/dashboard' }, { label: 'Search' }]} title="Message Search" description="Search conversations by keyword, channel, sender, or date" />
      <MessagingSubNav />
      <div className="mb-4 grid gap-4 sm:grid-cols-4">
        <Input label="Keyword" placeholder="Search messages…" />
        <Input label="Channel" placeholder="All channels" />
        <Input label="Sender" placeholder="Any sender" />
        <Input label="Date Range" defaultValue="Last 30 days" />
      </div>
      <div className="mb-4"><Button size="sm" onClick={() => toast('Search executed')}>Search</Button></div>
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={messages as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

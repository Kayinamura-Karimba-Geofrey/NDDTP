import { Link } from 'react-router-dom';
import { MessagingSubNav } from '../components/MessagingSubNav';
import { MessagingStatusBadge } from '../components/MessagingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMyChannelsQuery } from '../api/messaging.api';
import type { MessagingChannel } from '../constants/messaging-data';

export function MessagingInboxPage() {
  const { data: channels = [] } = useGetMyChannelsQuery();
  const inbox = channels.filter((c) => c.status !== 'ARCHIVED');

  const columns: DataTableColumn<MessagingChannel>[] = [
    { key: 'name', header: 'Conversation', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'last', header: 'Last Message', render: (r) => <span className="line-clamp-1 text-sm text-muted-foreground">{r.lastMessage ?? '—'}</span> },
    { key: 'at', header: 'Time', render: (r) => r.lastMessageAt ?? '—' },
    { key: 'unread', header: 'Unread', render: (r) => (r.unread > 0 ? <span className="font-semibold text-primary">{r.unread}</span> : '0') },
    { key: 'status', header: 'Status', render: (r) => <MessagingStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/messaging/channels/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Messaging', path: '/messaging/dashboard' }, { label: 'Inbox' }]} title="Inbox" description="Your channels and conversations — direct, group, department, and broadcast" actions={<Link to="/messaging/compose"><Button>Compose</Button></Link>} />
      <MessagingSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={inbox as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

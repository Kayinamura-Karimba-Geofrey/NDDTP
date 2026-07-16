import { Link } from 'react-router-dom';
import { MessagingSubNav } from '../components/MessagingSubNav';
import { MessagingStatusBadge } from '../components/MessagingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMyChannelsQuery } from '../api/messaging.api';
import type { MessagingChannel, ChannelType } from '../constants/messaging-data';

function ChannelTypePage({ type, title, description }: { type: ChannelType; title: string; description: string }) {
  const { data: channels = [] } = useGetMyChannelsQuery();
  const rows = channels.filter((c) => c.type === type && c.status !== 'ARCHIVED');

  const columns: DataTableColumn<MessagingChannel>[] = [
    { key: 'name', header: 'Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'members', header: 'Members', render: (r) => r.members },
    { key: 'last', header: 'Last Message', render: (r) => <span className="line-clamp-1 text-sm text-muted-foreground">{r.lastMessage ?? '—'}</span> },
    { key: 'unread', header: 'Unread', render: (r) => r.unread },
    { key: 'status', header: 'Status', render: (r) => <MessagingStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/messaging/channels/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Messaging', path: '/messaging/dashboard' }, { label: title }]} title={title} description={description} />
      <MessagingSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

export function MessagingDirectPage() {
  return <ChannelTypePage type="DIRECT" title="Direct Messages" description="One-to-one conversations between users" />;
}

export function MessagingGroupsPage() {
  return <ChannelTypePage type="GROUP" title="Group Channels" description="Cross-team collaboration channels" />;
}

export function MessagingDepartmentsPage() {
  return <ChannelTypePage type="DEPARTMENT" title="Department Channels" description="Official department-wide communication channels" />;
}

export function MessagingBroadcastsPage() {
  return <ChannelTypePage type="BROADCAST" title="Broadcast Channels" description="Organization-wide messaging channels (distinct from notification broadcasts)" />;
}

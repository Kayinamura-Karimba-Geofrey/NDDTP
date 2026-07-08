import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MessagingSubNav } from '../components/MessagingSubNav';
import { MessagingStatusBadge } from '../components/MessagingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMyChannelsQuery } from '../api/messaging.api';
import type { MessagingChannel } from '../constants/messaging-data';

export function MessagingArchivedPage() {
  const { data: channels = [] } = useGetMyChannelsQuery();
  const rows = channels.filter((c) => c.status === 'ARCHIVED');

  const columns: DataTableColumn<MessagingChannel>[] = [
    { key: 'name', header: 'Channel', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'members', header: 'Members', render: (r) => r.members },
    { key: 'at', header: 'Last Activity', render: (r) => r.lastMessageAt ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <MessagingStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <div className="flex gap-1">
          <Link to={`/messaging/channels/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>
          <Button size="sm" variant="outline" onClick={() => toast('Channel restored')}>Restore</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Messaging', path: '/messaging/dashboard' }, { label: 'Archived' }]} title="Archived Channels" description="Archived conversations retained for reference and auditability" />
      <MessagingSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

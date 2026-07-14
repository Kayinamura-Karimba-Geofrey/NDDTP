import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { MessagingSubNav } from '../components/MessagingSubNav';
import { MessagingStatusBadge } from '../components/MessagingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMyChannelsQuery } from '../api/messaging.api';
import type { MessagingChannel } from '../constants/messaging-data';
import { CreateChannelModal } from '../components/CreateChannelModal';

export function MessagingChannelsPage() {
  const { data: channels = [], isLoading } = useGetMyChannelsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<MessagingChannel>[] = [
    { key: 'name', header: 'Channel', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'members', header: 'Members', render: (r) => r.members },
    { key: 'owner', header: 'Owner', render: (r) => r.owner ?? '—' },
    { key: 'at', header: 'Last Activity', render: (r) => r.lastMessageAt ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <MessagingStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <div className="flex gap-1">
          <Link to={`/messaging/channels/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>
          <Button size="sm" variant="outline" onClick={() => toast('Archive requested')}>Archive</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Messaging', path: '/messaging/dashboard' }, { label: 'Channels' }]} title="Channels" description="Manage direct, group, department, and broadcast channels" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Channel</Button>} />
      <MessagingSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={channels as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateChannelModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

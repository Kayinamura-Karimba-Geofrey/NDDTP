import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { NotificationSubNav } from '../components/NotificationSubNav';
import { NotificationStatusBadge } from '../components/NotificationStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetBroadcastsQuery } from '../api/notification.api';
import type { BroadcastMessage } from '../constants/notification-data';
import { CreateBroadcastModal } from '../components/CreateBroadcastModal';

export function BroadcastMessagesPage() {
  const { data: broadcasts = [], isLoading } = useGetBroadcastsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<BroadcastMessage>[] = [
    { key: 'id', header: 'ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'audience', header: 'Audience', render: (r) => r.audience },
    { key: 'channels', header: 'Channels', render: (r) => r.channels },
    { key: 'sent', header: 'Sent At', render: (r) => r.sentAt },
    { key: 'recipients', header: 'Recipients', render: (r) => r.recipients.toLocaleString() },
    { key: 'status', header: 'Status', render: (r) => <NotificationStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'Broadcast' }]} title="Broadcast Messages" description="Send messages to large audiences — organization, department, division, unit, role, or custom groups" actions={<Button onClick={() => setIsModalOpen(true)}><FiSend className="h-4 w-4" /> New Broadcast</Button>} />
      <NotificationSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={broadcasts as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateBroadcastModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

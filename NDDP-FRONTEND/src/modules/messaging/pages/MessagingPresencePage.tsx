import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { MessagingSubNav } from '../components/MessagingSubNav';
import { MessagingStatusBadge } from '../components/MessagingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetPresenceUsersQuery } from '../api/messaging.api';
import type { PresenceUser } from '../constants/messaging-data';
import { SetPresenceModal } from '../components/SetPresenceModal';

export function MessagingPresencePage() {
  const { data: presence = [], isLoading } = useGetPresenceUsersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<PresenceUser>[] = [
    { key: 'name', header: 'User', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'department', header: 'Department', render: (r) => r.department },
    { key: 'seen', header: 'Last Seen', render: (r) => r.lastSeen },
    { key: 'status', header: 'Status', render: (r) => <MessagingStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Messaging', path: '/messaging/dashboard' }, { label: 'Presence' }]} title="Presence" description="Online, away, and offline status for messaging collaborators" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Change Status</Button>} />
      <MessagingSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={presence as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <SetPresenceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

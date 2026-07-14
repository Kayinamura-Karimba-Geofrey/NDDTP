import { useState } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { MessagingSubNav } from '../components/MessagingSubNav';
import { MessagingStatusBadge } from '../components/MessagingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetChannelMembersQuery } from '../api/messaging.api';
import type { ChannelMember } from '../constants/messaging-data';
import { AddMemberModal } from '../components/AddMemberModal';

export function MessagingMembersPage() {
  const { data: members = [], isLoading } = useGetChannelMembersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<ChannelMember>[] = [
    { key: 'name', header: 'Member', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'role', header: 'Role', render: (r) => r.role },
    { key: 'department', header: 'Department', render: (r) => r.department },
    { key: 'joined', header: 'Joined', render: (r) => r.joinedAt },
    { key: 'status', header: 'Presence', render: (r) => <MessagingStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Messaging', path: '/messaging/dashboard' }, { label: 'Members' }]} title="Channel Members" description="Manage membership and roles within channels" actions={<Button onClick={() => setIsModalOpen(true)}><FiUserPlus className="h-4 w-4" /> Add Member</Button>} />
      <MessagingSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={members as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <AddMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

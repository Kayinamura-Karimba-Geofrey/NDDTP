import { MessagingSubNav } from '../components/MessagingSubNav';
import { MessagingStatusBadge } from '../components/MessagingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_PRESENCE, type PresenceUser } from '../constants/messaging-data';

export function MessagingPresencePage() {
  const columns: DataTableColumn<PresenceUser>[] = [
    { key: 'name', header: 'User', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'department', header: 'Department', render: (r) => r.department },
    { key: 'seen', header: 'Last Seen', render: (r) => r.lastSeen },
    { key: 'status', header: 'Status', render: (r) => <MessagingStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Messaging', path: '/messaging/dashboard' }, { label: 'Presence' }]} title="Presence" description="Online, away, and offline status for messaging collaborators" />
      <MessagingSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_PRESENCE as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

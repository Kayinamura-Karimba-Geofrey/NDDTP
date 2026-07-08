import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { NotificationSubNav } from '../components/NotificationSubNav';
import { NotificationStatusBadge } from '../components/NotificationStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_ANNOUNCEMENTS, type Announcement } from '../constants/notification-data';

export function NotificationAnnouncementsPage() {
  const columns: DataTableColumn<Announcement>[] = [
    { key: 'id', header: 'ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'category', header: 'Category', render: (r) => r.category },
    { key: 'audience', header: 'Audience', render: (r) => r.audience },
    { key: 'priority', header: 'Priority', render: (r) => r.priority },
    { key: 'publish', header: 'Publish Date', render: (r) => r.publishDate },
    { key: 'expiry', header: 'Expiry Date', render: (r) => r.expiryDate },
    { key: 'status', header: 'Status', render: (r) => <NotificationStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'Announcements' }]} title="Announcements" description="Organization-wide announcements — holidays, policies, security advisories, and emergency alerts" actions={<Button onClick={() => toast('Create announcement')}><FiPlus className="h-4 w-4" /> New Announcement</Button>} />
      <NotificationSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_ANNOUNCEMENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

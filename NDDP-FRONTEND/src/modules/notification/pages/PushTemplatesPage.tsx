import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { NotificationSubNav } from '../components/NotificationSubNav';
import { NotificationStatusBadge } from '../components/NotificationStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_PUSH_TEMPLATES, type NotificationTemplate } from '../constants/notification-data';

export function PushTemplatesPage() {
  const columns: DataTableColumn<NotificationTemplate>[] = [
    { key: 'name', header: 'Template', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'code', header: 'Code', render: (r) => <code className="text-xs">{r.code}</code> },
    { key: 'language', header: 'Language', render: (r) => r.language },
    { key: 'priority', header: 'Priority', render: (r) => r.priority },
    { key: 'modified', header: 'Last Modified', render: (r) => r.lastModified },
    { key: 'status', header: 'Status', render: (r) => <NotificationStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'Push Templates' }]} title="Push Notification Templates" description="Mobile push notification templates for Android and iOS" actions={<Button onClick={() => toast('Create push template')}><FiPlus className="h-4 w-4" /> New Template</Button>} />
      <NotificationSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_PUSH_TEMPLATES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

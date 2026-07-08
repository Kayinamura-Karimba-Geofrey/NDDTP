import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { DmsSubNav } from '../components/DmsSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_PERMISSIONS, type DmsPermission } from '../constants/dms-data';

export function AccessPermissionsPage() {
  const columns: DataTableColumn<DmsPermission>[] = [
    { key: 'subject', header: 'Subject', render: (r) => <span className="font-medium">{r.subject}</span> },
    { key: 'type', header: 'Type', render: (r) => r.subjectType },
    { key: 'doc', header: 'Document', render: (r) => r.document },
    { key: 'perms', header: 'Permissions', render: (r) => <span className="text-xs">{r.permissions.join(', ')}</span> },
    { key: 'exp', header: 'Expires', render: (r) => (r.expires ? dayjs(r.expires).format('DD MMM YYYY') : '—') },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Permissions' }]}
        title="Access Permissions"
        description="View, Download, Comment, Edit, Approve, Sign, Share, Archive — by user, role, department, or temporary grant"
        actions={<Button onClick={() => toast('Grant access')}><FiPlus className="h-4 w-4" /> Grant Access</Button>}
      />
      <DmsSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_PERMISSIONS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

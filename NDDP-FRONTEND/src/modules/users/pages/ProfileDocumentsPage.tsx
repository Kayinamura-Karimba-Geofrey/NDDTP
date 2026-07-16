import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { FiDownload, FiEye } from 'react-icons/fi';
import { USER_MOCK_DOCUMENTS } from '../constants/users-data';
import { UserSubNav } from '../components/UserSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { UserDocument } from '../constants/users-data';

export function ProfileDocumentsPage() {
  const columns: DataTableColumn<UserDocument>[] = [
    { key: 'user', header: 'User', render: (d) => d.userName },
    { key: 'name', header: 'Document', render: (d) => d.name },
    { key: 'type', header: 'Type' },
    { key: 'version', header: 'Version', render: (d) => `v${d.version}` },
    { key: 'uploaded', header: 'Uploaded', render: (d) => dayjs(d.uploadedAt).format('MMM D, YYYY') },
    { key: 'expires', header: 'Expires', render: (d) => d.expiresAt ? dayjs(d.expiresAt).format('MMM D, YYYY') : '—' },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm"><FiEye className="h-4 w-4" /> Preview</Button>
          <Button variant="ghost" size="sm"><FiDownload className="h-4 w-4" /> Download</Button>
          <Button variant="ghost" size="sm" onClick={() => toast('Replace')}>Replace</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'User Management', path: '/users/dashboard' }, { label: 'Documents' }]} title="Profile Documents" description="Employment letters, IDs, certificates with version history and expiry alerts" />
      <UserSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={USER_MOCK_DOCUMENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

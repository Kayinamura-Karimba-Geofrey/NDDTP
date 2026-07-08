import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { MessagingSubNav } from '../components/MessagingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_FILES } from '../constants/messaging-data';

export function MessagingFilesPage() {
  const columns: DataTableColumn<(typeof MOCK_FILES)[number]>[] = [
    { key: 'name', header: 'File', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'channel', header: 'Channel', render: (r) => r.channel },
    { key: 'by', header: 'Uploaded By', render: (r) => r.uploadedBy },
    { key: 'size', header: 'Size', render: (r) => r.size },
    { key: 'at', header: 'Uploaded', render: (r) => r.uploadedAt },
    {
      key: 'actions',
      header: '',
      render: (r) => <Button size="sm" variant="outline" onClick={() => toast(`Downloading ${r.name}`)}><FiDownload className="h-3 w-3" /></Button>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Messaging', path: '/messaging/dashboard' }, { label: 'Files' }]} title="Shared Files" description="Files shared across messaging channels" />
      <MessagingSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_FILES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

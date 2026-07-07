import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { WelfareSubNav } from '../components/WelfareSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_DOCUMENTS, type WelfareDocument } from '../constants/welfare-data';

export function WelfareDocumentsPage() {
  const columns: DataTableColumn<WelfareDocument>[] = [
    { key: 'name', header: 'Document', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'type', header: 'Type' },
    { key: 'employee', header: 'Employee', render: (r) => r.employeeName ?? '—' },
    { key: 'uploaded', header: 'Uploaded', render: (r) => dayjs(r.uploadedAt).format('MMM D, YYYY') },
    { key: 'expires', header: 'Expires', render: (r) => r.expiresAt ? dayjs(r.expiresAt).format('MMM D, YYYY') : '—' },
    { key: 'actions', header: 'Actions', render: (r) => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast(`Preview ${r.name}`)}>Preview</Button>
        <Button variant="ghost" size="sm" onClick={() => toast('Downloading...')}>Download</Button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'Documents' }]} title="Welfare Documents" description="Application forms, policies, and approval letters" />
      <WelfareSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_DOCUMENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

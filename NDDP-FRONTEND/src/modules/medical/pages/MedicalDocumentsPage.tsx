import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_DOCUMENTS, type MedicalDocument } from '../constants/medical-data';

export function MedicalDocumentsPage() {
  const columns: DataTableColumn<MedicalDocument>[] = [
    { key: 'name', header: 'Document', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'type', header: 'Type' },
    { key: 'employee', header: 'Personnel', render: (r) => r.personnelName ?? '—' },
    { key: 'uploaded', header: 'Uploaded', render: (r) => dayjs(r.uploadedAt).format('MMM D, YYYY') },
    { key: 'actions', header: 'Actions', render: (r) => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast(`Preview ${r.name}`)}>Preview</Button>
        <Button variant="ghost" size="sm" onClick={() => toast('Downloading...')}>Download</Button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Documents' }]} title="Medical Documents" description="Certificates, reports, and referral letters — secure storage" />
      <MedicalSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_DOCUMENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useGetPersonnelDocumentsQuery } from '../api/personnel.api';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { PersonnelDocument } from '../constants/personnel-data';

export function PersonnelDocumentsPage() {
  const { data: documents = [], isLoading } = useGetPersonnelDocumentsQuery();

  const columns: DataTableColumn<PersonnelDocument>[] = [
    { key: 'person', header: 'Personnel', render: (d) => d.personnelName },
    { key: 'name', header: 'Document' },
    { key: 'type', header: 'Type' },
    { key: 'uploaded', header: 'Uploaded', render: (d) => dayjs(d.uploadedAt).format('MMM D, YYYY') },
    { key: 'expires', header: 'Expires', render: (d) => d.expiresAt ? dayjs(d.expiresAt).format('MMM D, YYYY') : '—' },
    { key: 'version', header: 'Version', render: (d) => `v${d.version}` },
    {
      key: 'actions',
      header: 'Actions',
      render: (d) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => toast(`Preview ${d.name}`)}>Preview</Button>
          <Button variant="ghost" size="sm" onClick={() => toast('Downloading...')}>Download</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Documents' }]} title="Profile Documents" description="Employment contracts, certificates, ID documents with version history and expiry alerts" />
      <PersonnelSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={documents as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
    </div>
  );
}

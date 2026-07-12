import dayjs from 'dayjs';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { MedicalStatusBadge } from '../components/MedicalStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetLabResultsQuery } from '../api/medical.api';
import type { LabResult } from '../constants/medical-data';
import { FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';

export function LaboratoryResultsPage() {
  const { data: results = [], isLoading } = useGetLabResultsQuery();

  const columns: DataTableColumn<LabResult>[] = [
    { key: 'emp', header: 'Personnel', render: (r) => <span className="font-medium">{r.personnelName}</span> },
    { key: 'test', header: 'Test', render: (r) => r.testName },
    { key: 'date', header: 'Result Date', render: (r) => dayjs(r.resultDate).format('MMM D, YYYY') },
    { key: 'provider', header: 'Provider' },
    { key: 'status', header: 'Status', render: (r) => <MedicalStatusBadge status={r.status} /> },
    { key: 'actions', header: 'Actions', render: (r) => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast(`Preview ${r.testName}`)}>Preview</Button>
        <Button variant="ghost" size="sm" onClick={() => toast('Downloading...')}>Download</Button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Laboratory' }]} title="Laboratory Results" description="Secure laboratory reports — restricted access" actions={<Button onClick={() => toast('Upload lab results')}><FiUpload className="h-4 w-4" /> Upload Results</Button>} />
      <MedicalSubNav />
      <Card className="mb-4 border-warning/30 bg-warning/5">
        <CardContent className="pt-4 text-sm text-muted-foreground">Laboratory results are accessible only to authorized medical personnel and the individual employee.</CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={results as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

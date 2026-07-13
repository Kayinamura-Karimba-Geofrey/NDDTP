import dayjs from 'dayjs';
import { useGetLearningMaterialsQuery, useUploadMaterialMutation } from '../api/training.api';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { LearningMaterial } from '../constants/training-data';
import { FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';

export function LearningMaterialsPage() {
  const { data: materials = [], isLoading } = useGetLearningMaterialsQuery();
  const [uploadMaterial] = useUploadMaterialMutation();

  const columns: DataTableColumn<LearningMaterial>[] = [
    { key: 'name', header: 'Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'type', header: 'Type' },
    { key: 'course', header: 'Course' },
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
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Materials' }]} title="Learning Materials" description="PDFs, videos, presentations, and reference documents" actions={<Button onClick={() => toast('Upload material')}><FiUpload className="h-4 w-4" /> Upload</Button>} />
      <TrainingSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={materials as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

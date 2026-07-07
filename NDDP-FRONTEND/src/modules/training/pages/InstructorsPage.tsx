import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_INSTRUCTORS, type Instructor } from '../constants/training-data';

export function InstructorsPage() {
  const columns: DataTableColumn<Instructor>[] = [
    { key: 'name', header: 'Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'dept', header: 'Department' },
    { key: 'spec', header: 'Specialization' },
    { key: 'courses', header: 'Courses' },
    { key: 'certs', header: 'Certifications' },
    { key: 'rating', header: 'Rating', render: (r) => `${r.rating}/5` },
    { key: 'avail', header: 'Availability' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Instructors' }]} title="Instructors" description="Manage trainers and instructors" actions={<Button onClick={() => toast('Add instructor')}><FiPlus className="h-4 w-4" /> Add Instructor</Button>} />
      <TrainingSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_INSTRUCTORS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_CLASSROOMS, type Classroom } from '../constants/training-data';

export function ClassroomsPage() {
  const columns: DataTableColumn<Classroom>[] = [
    { key: 'name', header: 'Room', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'capacity', header: 'Capacity' },
    { key: 'building', header: 'Building' },
    { key: 'equipment', header: 'Equipment' },
    { key: 'avail', header: 'Availability' },
    { key: 'virtual', header: 'Type', render: (r) => r.isVirtual ? 'Virtual' : 'Physical' },
    { key: 'link', header: 'Meeting Link', render: (r) => r.meetingLink ? <a href={r.meetingLink} className="text-xs underline">Link</a> : '—' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Classrooms' }]} title="Classrooms" description="Physical and virtual training rooms" actions={<Button onClick={() => toast('Add classroom')}><FiPlus className="h-4 w-4" /> Add Classroom</Button>} />
      <TrainingSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_CLASSROOMS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

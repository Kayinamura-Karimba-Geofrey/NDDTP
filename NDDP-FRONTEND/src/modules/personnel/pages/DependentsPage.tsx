import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_DEPENDENTS, type DependentRecord } from '../constants/personnel-data';

export function DependentsPage() {
  const columns: DataTableColumn<DependentRecord>[] = [
    { key: 'name', header: 'Name', render: (d) => <span className="font-medium">{d.name}</span> },
    { key: 'relationship', header: 'Relationship' },
    { key: 'dob', header: 'Date of Birth', render: (d) => dayjs(d.dateOfBirth).format('MMM D, YYYY') },
    { key: 'coverage', header: 'Medical Coverage', render: (d) => d.medicalCoverage ? <span className="text-success">Covered</span> : <span className="text-muted-foreground">Not covered</span> },
    { key: 'actions', header: 'Actions', render: () => <Button variant="ghost" size="sm" onClick={() => toast('Edit')}>Edit</Button> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Dependents' }]} title="Dependents" actions={<Button onClick={() => toast('Add dependent')}><FiPlus className="h-4 w-4" /> Add Dependent</Button>} />
      <PersonnelSubNav />
      <Card><CardContent className="pt-6">
        <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_DEPENDENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
      </CardContent></Card>
    </div>
  );
}

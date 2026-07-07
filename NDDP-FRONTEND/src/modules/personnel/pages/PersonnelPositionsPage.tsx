import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_POSITIONS, type PersonnelPosition } from '../constants/personnel-data';

export function PersonnelPositionsPage() {
  const columns: DataTableColumn<PersonnelPosition>[] = [
    { key: 'name', header: 'Position Name', render: (p) => <span className="font-medium">{p.name}</span> },
    { key: 'code', header: 'Code', render: (p) => <code>{p.code}</code> },
    { key: 'department', header: 'Department' },
    { key: 'reportsTo', header: 'Reports To' },
    { key: 'grade', header: 'Grade' },
    { key: 'vacant', header: 'Vacancy', render: (p) => p.vacant ? <span className="text-warning">Vacant</span> : <span className="text-success">Filled</span> },
    { key: 'status', header: 'Status', render: (p) => p.status },
    { key: 'actions', header: 'Actions', render: () => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast('Edit')}>Edit</Button>
        <Button variant="ghost" size="sm" onClick={() => toast('Disabled')}>Disable</Button>
      </div>
    )},
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Positions' }]} title="Job Titles / Positions" description="Manage official positions" actions={<Button onClick={() => toast('Create position')}><FiPlus className="h-4 w-4" /> Add Position</Button>} />
      <PersonnelSubNav />
      <Card><CardContent className="pt-6">
        <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_POSITIONS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
      </CardContent></Card>
    </div>
  );
}

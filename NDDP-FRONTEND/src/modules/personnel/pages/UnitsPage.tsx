import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetPersonnelUnitsQuery } from '../api/personnel.api';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { PersonnelUnit } from '../constants/personnel-data';

export function UnitsPage() {
  const { data: units = [], isLoading } = useGetPersonnelUnitsQuery();

  const columns: DataTableColumn<PersonnelUnit>[] = [
    { key: 'name', header: 'Unit Name', render: (u) => <span className="font-medium">{u.name}</span> },
    { key: 'code', header: 'Code', render: (u) => <code>{u.code}</code> },
    { key: 'department', header: 'Department' },
    { key: 'head', header: 'Head' },
    { key: 'count', header: 'Personnel', render: (u) => u.personnelCount },
    { key: 'status', header: 'Status', render: (u) => <span className={u.status === 'ACTIVE' ? 'text-success' : 'text-muted-foreground'}>{u.status}</span> },
    { key: 'actions', header: 'Actions', render: () => <Button variant="ghost" size="sm" onClick={() => toast('Edit')}>Edit</Button> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Units' }]} title="Units" description="Organizational units within departments" actions={<Button onClick={() => toast('Create unit')}><FiPlus className="h-4 w-4" /> Add Unit</Button>} />
      <PersonnelSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={units as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
    </div>
  );
}

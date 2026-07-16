import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetDepartmentsQuery } from '../api/users.api';
import { UserSubNav } from '../components/UserSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { Department } from '../constants/users-data';

export function DepartmentsPage() {
  const { data: departments = [], isLoading } = useGetDepartmentsQuery();

  const columns: DataTableColumn<Department>[] = [
    { key: 'name', header: 'Department Name', render: (d) => <span className="font-medium">{d.name}</span> },
    { key: 'code', header: 'Code', render: (d) => <code>{d.code}</code> },
    { key: 'manager', header: 'Manager' },
    { key: 'users', header: 'Users', render: (d) => d.userCount },
    { key: 'status', header: 'Status', render: (d) => <span className={d.status === 'ACTIVE' ? 'text-success' : 'text-muted-foreground'}>{d.status}</span> },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => toast('Edit')}>Edit</Button>
          <Button variant="ghost" size="sm" onClick={() => toast.error('Delete')}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'User Management', path: '/users/dashboard' }, { label: 'Departments' }]} title="Departments" description="Manage organizational departments" actions={<Button onClick={() => toast('Create department')}><FiPlus className="h-4 w-4" /> Add Department</Button>} />
      <UserSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={departments as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

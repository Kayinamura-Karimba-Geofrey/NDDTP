import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useGetPersonnelDepartmentsQuery } from '../api/personnel.api';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { PersonnelDepartment } from '../constants/personnel-data';
import { CreateDepartmentModal } from '../components/CreateDepartmentModal';

export function PersonnelDepartmentsPage() {
  const { data: departments = [], isLoading } = useGetPersonnelDepartmentsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<PersonnelDepartment>[] = [
    { key: 'name', header: 'Department Name', render: (d) => <span className="font-medium">{d.name}</span> },
    { key: 'code', header: 'Code', render: (d) => <code>{d.code}</code> },
    { key: 'manager', header: 'Manager' },
    { key: 'location', header: 'Location' },
    { key: 'count', header: 'Personnel', render: (d) => d.personnelCount },
    { key: 'budget', header: 'Budget Ref', render: (d) => d.budgetRef ?? '—' },
    { key: 'status', header: 'Status', render: (d) => <span className={d.status === 'ACTIVE' ? 'text-success' : 'text-muted-foreground'}>{d.status}</span> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Departments' }]} title="Departments" description="Manage organizational departments" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Add Department</Button>} />
      <PersonnelSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={departments as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>

      <CreateDepartmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetDependentsQuery } from '../api/personnel.api';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { DependentRecord } from '../constants/personnel-data';
import { AddDependentModal } from '../components/AddDependentModal';

export function DependentsPage() {
  const { data: dependents = [], isLoading } = useGetDependentsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<DependentRecord>[] = [
    { key: 'name', header: 'Name', render: (d) => <span className="font-medium">{d.name}</span> },
    { key: 'relationship', header: 'Relationship' },
    { key: 'dob', header: 'Date of Birth', render: (d) => dayjs(d.dateOfBirth).format('MMM D, YYYY') },
    { key: 'coverage', header: 'Medical Coverage', render: (d) => d.medicalCoverage ? <span className="text-success">Covered</span> : <span className="text-muted-foreground">Not covered</span> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Dependents' }]} title="Dependents" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Add Dependent</Button>} />
      <PersonnelSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={dependents as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>

      <AddDependentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

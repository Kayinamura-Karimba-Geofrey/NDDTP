import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useGetPersonnelPositionsQuery } from '../api/personnel.api';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { PersonnelPosition } from '../constants/personnel-data';
import { CreatePositionModal } from '../components/CreatePositionModal';

export function PersonnelPositionsPage() {
  const { data: positions = [], isLoading } = useGetPersonnelPositionsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<PersonnelPosition>[] = [
    { key: 'name', header: 'Position Name', render: (p) => <span className="font-medium">{p.name}</span> },
    { key: 'code', header: 'Code', render: (p) => <code>{p.code}</code> },
    { key: 'department', header: 'Department' },
    { key: 'reportsTo', header: 'Reports To' },
    { key: 'grade', header: 'Grade' },
    { key: 'vacant', header: 'Vacancy', render: (p) => p.vacant ? <span className="text-warning">Vacant</span> : <span className="text-success">Filled</span> },
    { key: 'status', header: 'Status', render: (p) => p.status },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Positions' }]} title="Job Titles / Positions" description="Manage official positions" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Add Position</Button>} />
      <PersonnelSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={positions as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>

      <CreatePositionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

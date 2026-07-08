import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { MaintenanceStatusBadge } from '../components/MaintenanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMaintenanceCategoriesQuery } from '../api/maintenance.api';
import type { MaintenanceCategory } from '../constants/maintenance-data';

export function MaintenanceCategoriesPage() {
  const { data: categories = [] } = useGetMaintenanceCategoriesQuery();

  const columns: DataTableColumn<MaintenanceCategory>[] = [
    { key: 'name', header: 'Category', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'desc', header: 'Description', render: (r) => r.description },
    { key: 'count', header: 'Requests', render: (r) => r.requestCount },
    { key: 'status', header: 'Status', render: (r) => <MaintenanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'Categories' }]} title="Maintenance Categories" description="HVAC, electrical, plumbing, workshop, and other request categories" actions={<Button onClick={() => toast('Create category')}><FiPlus className="h-4 w-4" /> New Category</Button>} />
      <MaintenanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={categories as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

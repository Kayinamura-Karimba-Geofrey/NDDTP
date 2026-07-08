import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetFleetAssignmentsQuery } from '../api/fleet.api';
import { FleetSubNav } from '../components/FleetSubNav';
import { FleetStatusBadge } from '../components/FleetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { VehicleAssignment } from '../constants/fleet-data';

export function VehicleAssignmentsPage() {
  const { data: assignments = [], isLoading } = useGetFleetAssignmentsQuery();

  const columns: DataTableColumn<VehicleAssignment>[] = [
    { key: 'vehicle', header: 'Vehicle', render: (r) => <span className="font-medium">{r.vehicle}</span> },
    { key: 'driver', header: 'Driver' },
    { key: 'dept', header: 'Department' },
    { key: 'date', header: 'Assigned', render: (r) => dayjs(r.assignmentDate).format('DD MMM YYYY') },
    { key: 'return', header: 'Expected Return', render: (r) => (r.expectedReturn ? dayjs(r.expectedReturn).format('DD MMM YYYY') : '—') },
    { key: 'purpose', header: 'Purpose', render: (r) => <span className="text-xs">{r.purpose}</span> },
    { key: 'status', header: 'Status', render: (r) => <FleetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Assignments' }]} title="Vehicle Assignments" description="Assign vehicles to departments or personnel" actions={<Button onClick={() => toast('New assignment request')}><FiPlus className="h-4 w-4" /> Request Assignment</Button>} />
      <FleetSubNav />
      <Card><CardContent className="pt-6">{isLoading ? <div className="data-table-empty">Loading...</div> : <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={assignments as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />}</CardContent></Card>
    </div>
  );
}

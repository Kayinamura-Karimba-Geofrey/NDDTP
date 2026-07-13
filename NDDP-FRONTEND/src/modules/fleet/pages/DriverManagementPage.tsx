import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetFleetDriversQuery } from '../api/fleet.api';
import { FleetSubNav } from '../components/FleetSubNav';
import { FleetStatusBadge } from '../components/FleetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { Driver } from '../constants/fleet-data';
import { CreateDriverModal } from '../components/CreateDriverModal';

export function DriverManagementPage() {
  const { data: drivers = [], isLoading } = useGetFleetDriversQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<Driver>[] = [
    { key: 'num', header: 'Driver #', render: (r) => <code className="text-xs">{r.driverNumber}</code> },
    { key: 'personnel', header: 'Personnel #', render: (r) => r.personnelNumber },
    { key: 'name', header: 'Full Name', render: (r) => <span className="font-medium">{r.fullName}</span> },
    { key: 'dept', header: 'Department' },
    { key: 'license', header: 'License Class' },
    { key: 'expiry', header: 'License Expiry', render: (r) => dayjs(r.licenseExpiry).format('DD MMM YYYY') },
    { key: 'medical', header: 'Medical', render: (r) => r.medicalClearance },
    { key: 'assign', header: 'Assignment', render: (r) => r.assignment ?? '—' },
    { key: 'exp', header: 'Experience' },
    { key: 'status', header: 'Status', render: (r) => <FleetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Drivers' }]} title="Driver Management" description="Authorized drivers and medical fitness" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Add Driver</Button>} />
      <FleetSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={drivers as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateDriverModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

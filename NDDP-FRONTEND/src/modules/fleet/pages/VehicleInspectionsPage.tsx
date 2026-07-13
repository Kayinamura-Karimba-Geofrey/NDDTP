import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetFleetInspectionsQuery } from '../api/fleet.api';
import { FleetSubNav } from '../components/FleetSubNav';
import { FleetStatusBadge } from '../components/FleetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { VehicleInspection } from '../constants/fleet-data';
import { CreateVehicleInspectionModal } from '../components/CreateVehicleInspectionModal';

export function VehicleInspectionsPage() {
  const { data: inspections = [], isLoading } = useGetFleetInspectionsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<VehicleInspection>[] = [
    { key: 'num', header: 'Inspection #', render: (r) => <code className="text-xs">{r.inspectionNumber}</code> },
    { key: 'vehicle', header: 'Vehicle', render: (r) => <span className="font-medium">{r.vehicle}</span> },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('DD MMM YYYY') },
    { key: 'inspector', header: 'Inspector' },
    { key: 'result', header: 'Result', render: (r) => <FleetStatusBadge status={r.result} /> },
    { key: 'notes', header: 'Notes', render: (r) => <span className="text-xs">{r.notes ?? '—'}</span> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Inspections' }]} title="Vehicle Inspections" description="Checklist: tires, brakes, lights, engine, fluids, safety equipment, body" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Inspection</Button>} />
      <FleetSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={inspections as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateVehicleInspectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

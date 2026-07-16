import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { FleetSubNav } from '../components/FleetSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_PARKING, type ParkingSlot } from '../constants/fleet-data';

export function ParkingGaragePage() {
  const columns: DataTableColumn<ParkingSlot>[] = [
    { key: 'garage', header: 'Garage / Location', render: (r) => <span className="font-medium">{r.garage}</span> },
    { key: 'slot', header: 'Slots' },
    { key: 'cap', header: 'Capacity', render: (r) => `${r.occupied} / ${r.capacity}` },
    { key: 'type', header: 'Type' },
    { key: 'vehicle', header: 'Allocated', render: (r) => r.vehicle ?? '—' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Parking' }]} title="Parking & Garage Management" description="Garage locations, parking slots, capacity, and maintenance bays" actions={<Button onClick={() => toast('Add parking zone')}><FiPlus className="h-4 w-4" /> Add Zone</Button>} />
      <FleetSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_PARKING as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

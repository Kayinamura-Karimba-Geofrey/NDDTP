import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { AssetSubNav } from '../components/AssetSubNav';
import { AssetStatusBadge } from '../components/AssetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_RESERVATIONS, type AssetReservation } from '../constants/asset-data';

export function AssetReservationsPage() {
  const columns: DataTableColumn<AssetReservation>[] = [
    { key: 'asset', header: 'Asset', render: (r) => <span className="font-medium">{r.assetName}</span> },
    { key: 'requester', header: 'Requester' },
    { key: 'from', header: 'Reservation', render: (r) => dayjs(r.reservationDate).format('MMM D, YYYY') },
    { key: 'to', header: 'Return', render: (r) => dayjs(r.returnDate).format('MMM D, YYYY') },
    { key: 'status', header: 'Status', render: (r) => <AssetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Reservations' }]} title="Asset Reservations" description="Reserve shared assets — projectors, equipment, meeting kits" actions={<Button onClick={() => toast('New reservation')}><FiPlus className="h-4 w-4" /> Reserve</Button>} />
      <AssetSubNav />
      <Card className="mb-4"><CardContent className="pt-4 text-sm text-muted-foreground">Workflow: Request → Approval → Reservation → Collection → Return</CardContent></Card>
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_RESERVATIONS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

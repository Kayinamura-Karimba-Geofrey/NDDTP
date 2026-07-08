import dayjs from 'dayjs';
import { FleetSubNav } from '../components/FleetSubNav';
import { FleetStatusBadge } from '../components/FleetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_LICENSES, type DriverLicense } from '../constants/fleet-data';

export function DriverLicensingPage() {
  const columns: DataTableColumn<DriverLicense>[] = [
    { key: 'driver', header: 'Driver', render: (r) => <span className="font-medium">{r.driver}</span> },
    { key: 'cat', header: 'Categories' },
    { key: 'expiry', header: 'Expiry', render: (r) => dayjs(r.expiry).format('DD MMM YYYY') },
    { key: 'end', header: 'Endorsements', render: (r) => r.endorsements ?? '—' },
    { key: 'rest', header: 'Restrictions', render: (r) => r.restrictions ?? '—' },
    { key: 'med', header: 'Medical Fitness' },
    { key: 'status', header: 'Status', render: (r) => <FleetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Licensing' }]} title="Driver Licensing" description="License categories, renewals, endorsements, and medical verification" />
      <FleetSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_LICENSES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

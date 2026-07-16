import toast from 'react-hot-toast';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { ProfileSubNav } from '../components/ProfileSubNav';
import { useGetMyProfileQuery } from '../api/profile.api';
import type { ProfileAddress } from '../constants/profile-data';

export function ProfileAddressesPage() {
  const { data: profile } = useGetMyProfileQuery();
  const addresses = profile?.addresses ?? [];

  const columns: DataTableColumn<ProfileAddress>[] = [
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'line1', header: 'Address', render: (r) => <span className="font-medium">{r.line1}{r.line2 ? `, ${r.line2}` : ''}</span> },
    { key: 'city', header: 'City', render: (r) => r.city },
    { key: 'district', header: 'District', render: (r) => r.district },
    { key: 'country', header: 'Country', render: (r) => r.country },
    { key: 'primary', header: 'Primary', render: (r) => (r.isPrimary ? 'Yes' : '—') },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'My Profile', path: '/profile' }, { label: 'Addresses' }]} title="Addresses" description="Home and work locations on your profile" />
      <ProfileSubNav />
      <Card className="mb-6">
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={addresses as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Add address</CardTitle></CardHeader>
        <CardContent className="grid gap-4 pt-4 sm:grid-cols-2">
          <Input label="Type" defaultValue="HOME" />
          <Input label="City" defaultValue="Kigali" />
          <Input label="Line 1" defaultValue="" className="sm:col-span-2" />
          <Input label="District" defaultValue="Gasabo" />
          <Input label="Country" defaultValue="Rwanda" />
          <div className="sm:col-span-2">
            <Button onClick={() => toast.success('Address added')}>Add Address</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

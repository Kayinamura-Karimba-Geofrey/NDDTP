import toast from 'react-hot-toast';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { ProfileSubNav } from '../components/ProfileSubNav';
import { useGetMyProfileQuery } from '../api/profile.api';
import type { ProfileEmergencyContact } from '../constants/profile-data';

export function ProfileEmergencyContactsPage() {
  const { data: profile } = useGetMyProfileQuery();
  const contacts = profile?.emergencyContacts ?? [];

  const columns: DataTableColumn<ProfileEmergencyContact>[] = [
    { key: 'name', header: 'Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'relationship', header: 'Relationship', render: (r) => r.relationship },
    { key: 'phone', header: 'Phone', render: (r) => r.phone },
    { key: 'email', header: 'Email', render: (r) => r.email ?? '—' },
    { key: 'primary', header: 'Primary', render: (r) => (r.isPrimary ? 'Yes' : '—') },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'My Profile', path: '/profile' }, { label: 'Emergency Contacts' }]} title="Emergency Contacts" description="People to notify in case of emergency" />
      <ProfileSubNav />
      <Card className="mb-6">
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={contacts as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Add contact</CardTitle></CardHeader>
        <CardContent className="grid gap-4 pt-4 sm:grid-cols-2">
          <Input label="Full name" defaultValue="" />
          <Input label="Relationship" defaultValue="Spouse" />
          <Input label="Phone" defaultValue="" />
          <Input label="Email" defaultValue="" />
          <div className="sm:col-span-2">
            <Button onClick={() => toast.success('Emergency contact added')}>Add Contact</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

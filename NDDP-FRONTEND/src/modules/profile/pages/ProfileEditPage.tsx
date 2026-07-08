import toast from 'react-hot-toast';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { ProfileSubNav } from '../components/ProfileSubNav';
import { useGetMyProfileQuery } from '../api/profile.api';

export function ProfileEditPage() {
  const { data: profile } = useGetMyProfileQuery();

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'My Profile', path: '/profile' }, { label: 'Edit' }]} title="Edit Profile" description="Update your personal and contact information" />
      <ProfileSubNav />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Personal details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4 sm:grid-cols-2">
            <Input label="First name" defaultValue={profile?.firstName ?? ''} />
            <Input label="Last name" defaultValue={profile?.lastName ?? ''} />
            <Input label="Middle name" defaultValue={profile?.middleName ?? ''} className="sm:col-span-2" />
            <Input label="Employee number" defaultValue={profile?.employeeNumber ?? ''} disabled />
            <Input label="Rank" defaultValue={profile?.rank ?? ''} />
            <Input label="Job title" defaultValue={profile?.jobTitle ?? ''} className="sm:col-span-2" />
            <Input label="Department" defaultValue={profile?.department ?? ''} className="sm:col-span-2" disabled />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Contact</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <Input label="Email" defaultValue={profile?.email ?? ''} />
            <Input label="Phone" defaultValue={profile?.phone ?? ''} />
            <Input label="Hire date" defaultValue={profile?.hireDate ?? ''} disabled />
            <div className="flex gap-2">
              <Button onClick={() => toast.success('Profile updated')}>Save Changes</Button>
              <Button variant="outline" onClick={() => toast('Changes discarded')}>Reset</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

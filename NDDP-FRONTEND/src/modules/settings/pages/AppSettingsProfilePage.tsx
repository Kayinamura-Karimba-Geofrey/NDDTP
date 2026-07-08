import toast from 'react-hot-toast';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { AppSettingsSubNav } from '../components/AppSettingsSubNav';
import { useGetProfileQuery } from '@/modules/authentication/api/auth.api';
import { ENABLE_MOCK_API } from '@/constants/app';

export function AppSettingsProfilePage() {
  const { data: profile } = useGetProfileQuery(undefined, { skip: ENABLE_MOCK_API });

  const fullName = profile
    ? `${profile.firstName} ${profile.lastName}`.trim()
    : 'Demo Administrator';
  const email = profile?.email ?? 'admin@mod.gov.rw';
  const department = profile?.department ?? 'Directorate of Digital Transformation';
  const jobTitle = profile?.jobTitle ?? 'System Administrator';

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Settings', path: '/settings/overview' }, { label: 'Profile' }]} title="Profile" description="Your account identity and contact details" />
      <AppSettingsSubNav />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Identity</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <Input label="First name" defaultValue={profile?.firstName ?? 'Demo'} />
            <Input label="Last name" defaultValue={profile?.lastName ?? 'Administrator'} />
            <Input label="Email" defaultValue={email} />
            <Input label="Department" defaultValue={department} />
            <Button onClick={() => toast.success('Profile saved')}>Save Profile</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Workspace defaults</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <Input label="Display name" defaultValue={fullName} />
            <Input label="Job title" defaultValue={jobTitle} />
            <Input label="Employee number" defaultValue={profile?.employeeNumber ?? 'EMP-0001'} />
            <Input label="Office location" defaultValue="HQ Complex" />
            <Button variant="outline" onClick={() => toast('Request sent to HR for review')}>Request HR Update</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

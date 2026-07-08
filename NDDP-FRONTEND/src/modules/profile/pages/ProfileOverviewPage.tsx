import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ProfileSubNav } from '../components/ProfileSubNav';
import { ProfileStatusBadge } from '../components/ProfileStatusBadge';
import { useGetMyProfileQuery } from '../api/profile.api';

export function ProfileOverviewPage() {
  const { data: profile } = useGetMyProfileQuery();

  if (!profile) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'My Profile', path: '/profile' }]} title="My Profile" description="Loading…" />
        <ProfileSubNav />
      </div>
    );
  }

  const fullName = `${profile.firstName}${profile.middleName ? ` ${profile.middleName}` : ''} ${profile.lastName}`.trim();

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'My Profile', path: '/profile' }, { label: 'Overview' }]}
        title={fullName}
        description={`${profile.jobTitle} · ${profile.department}`}
        actions={
          <div className="flex items-center gap-2">
            <ProfileStatusBadge status={profile.status} />
            <Link to="/profile/edit"><Button size="sm">Edit Profile</Button></Link>
          </div>
        }
      />
      <ProfileSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Employee No.', value: profile.employeeNumber },
          { label: 'Email', value: profile.email },
          { label: 'Phone', value: profile.phone },
          { label: 'Hire date', value: profile.hireDate },
        ].map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">{k.label}</p><p className="mt-1 text-sm font-semibold break-all">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm">Primary address</CardTitle>
            <Link to="/profile/addresses"><Button size="sm" variant="outline">Manage</Button></Link>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            {profile.addresses.find((a) => a.isPrimary) ? (
              (() => {
                const a = profile.addresses.find((x) => x.isPrimary)!;
                return <p>{a.line1}{a.line2 ? `, ${a.line2}` : ''}<br />{a.city}, {a.district}<br />{a.country}</p>;
              })()
            ) : (
              <p>No primary address on file.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm">Emergency contact</CardTitle>
            <Link to="/profile/emergency-contacts"><Button size="sm" variant="outline">Manage</Button></Link>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            {profile.emergencyContacts.find((c) => c.isPrimary) ? (
              (() => {
                const c = profile.emergencyContacts.find((x) => x.isPrimary)!;
                return <p><span className="font-medium text-foreground">{c.name}</span> · {c.relationship}<br />{c.phone}{c.email ? <><br />{c.email}</> : null}</p>;
              })()
            ) : (
              <p>No emergency contact on file.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

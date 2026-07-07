import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useGetUserByIdQuery } from '../api/users.api';
import { ProfileHeader } from '../components/ProfileHeader';
import { UserSubNav } from '../components/UserSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { Button } from '@/components/ui';

const TABS = ['Profile', 'Organization', 'Roles', 'Permissions', 'Authentication', 'Documents', 'History', 'Activity', 'Notes'] as const;

export function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading } = useGetUserByIdQuery(id!);
  const [tab, setTab] = useState<(typeof TABS)[number]>('Profile');

  if (isLoading) return <div className="data-table-empty">Loading user...</div>;
  if (!user) return <div className="data-table-empty">User not found</div>;

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'User Management', path: '/users/dashboard' }, { label: 'Users', path: '/users/list' }, { label: `${user.firstName} ${user.lastName}` }]} title="User Details" />
      <UserSubNav />
      <ProfileHeader user={user} />
      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-border pb-0">
        {TABS.map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={`shrink-0 border-b-2 px-4 py-2 text-sm font-medium ${tab === t ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground'}`}>{t}</button>
        ))}
      </div>
      <Card className="mt-4">
        <CardContent className="pt-6">
          {tab === 'Profile' && (
            <dl className="grid gap-4 sm:grid-cols-2">
              <div><dt className="text-sm text-muted-foreground">Employee Number</dt><dd className="font-medium">{user.employeeNumber}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Email</dt><dd>{user.email}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Phone</dt><dd>{user.phone ?? '—'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Position</dt><dd>{user.position}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Employment Status</dt><dd>{user.employmentStatus}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Created</dt><dd>{dayjs(user.createdAt).format('MMM D, YYYY')}</dd></div>
            </dl>
          )}
          {tab === 'Organization' && (
            <dl className="grid gap-4 sm:grid-cols-2">
              <div><dt className="text-sm text-muted-foreground">Department</dt><dd>{user.department}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Division</dt><dd>{user.division ?? '—'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Unit</dt><dd>{user.unit ?? '—'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Supervisor</dt><dd>{user.supervisor ?? '—'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Work Location</dt><dd>{user.workLocation ?? 'Kigali HQ'}</dd></div>
            </dl>
          )}
          {tab === 'Roles' && (
            <div className="space-y-4">
              <div><h4 className="font-medium">Assigned Roles</h4><p className="text-sm">{user.roles.length ? user.roles.join(', ') : 'No roles assigned'}</p></div>
              <Link to="/administration/assignments"><Button variant="outline" size="sm">Manage in Authorization</Button></Link>
            </div>
          )}
          {tab === 'Permissions' && <p className="text-sm text-muted-foreground">Read-only view from Authorization Service. Permission count based on assigned roles.</p>}
          {tab === 'Authentication' && (
            <dl className="grid gap-4 sm:grid-cols-2">
              <div><dt className="text-sm text-muted-foreground">Last Login</dt><dd>{user.lastLogin ? dayjs(user.lastLogin).format('MMM D, YYYY HH:mm') : 'Never'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Active Sessions</dt><dd>{user.activeSessions ?? 0}</dd></div>
              <div><dt className="text-sm text-muted-foreground">MFA Status</dt><dd>{user.mfaEnabled ? 'Enabled' : 'Disabled'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Account Locked</dt><dd>{user.accountLocked ? 'Yes' : 'No'}</dd></div>
              <div className="sm:col-span-2"><Link to="/auth/sessions"><Button variant="outline" size="sm">View Sessions</Button></Link></div>
            </dl>
          )}
          {tab === 'Documents' && <p className="text-sm text-muted-foreground">No documents uploaded. <Link to="/users/documents" className="underline">Manage documents</Link></p>}
          {tab === 'History' && <p className="text-sm text-muted-foreground"><Link to="/users/history" className="underline">View full audit history</Link></p>}
          {tab === 'Activity' && <p className="text-sm text-muted-foreground">Activity timeline for profile changes will appear here.</p>}
          {tab === 'Notes' && <textarea className="w-full rounded-lg border border-border p-3 text-sm" rows={4} placeholder="Administrator notes..." />}
        </CardContent>
      </Card>
    </div>
  );
}

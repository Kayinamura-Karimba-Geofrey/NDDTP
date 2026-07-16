import toast from 'react-hot-toast';
import { useGetUsersQuery } from '../api/users.api';
import { UserSubNav } from '../components/UserSubNav';
import { UserStatusBadge } from '../components/UserStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { PlatformUser } from '../constants/users-data';

const STATUSES = ['ACTIVE', 'PENDING', 'SUSPENDED', 'ARCHIVED', 'RETIRED', 'TERMINATED'] as const;

export function UserStatusPage() {
  const { data, isLoading } = useGetUsersQuery({ page: 1, limit: 50 });

  const columns: DataTableColumn<PlatformUser>[] = [
    { key: 'name', header: 'User', render: (u) => `${u.firstName} ${u.lastName}` },
    { key: 'emp', header: 'Employee #', render: (u) => u.employeeNumber },
    { key: 'status', header: 'Status', render: (u) => <UserStatusBadge status={u.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (u) => (
        <div className="flex gap-1">
          {u.status !== 'ACTIVE' && <Button variant="ghost" size="sm" onClick={() => toast.success('Activated')}>Activate</Button>}
          {u.status === 'ACTIVE' && <Button variant="ghost" size="sm" onClick={() => toast('Suspended')}>Suspend</Button>}
          <Button variant="ghost" size="sm" onClick={() => toast('Archived')}>Archive</Button>
          {u.status !== 'ACTIVE' && <Button variant="ghost" size="sm" onClick={() => toast.success('Restored')}>Restore</Button>}
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'User Management', path: '/users/dashboard' }, { label: 'User Status' }]} title="User Status" description="Manage account lifecycle: Active, Pending, Suspended, Archived, Retired, Terminated" />
      <UserSubNav />
      <div className="mb-4 flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <span key={s} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{s}</span>
        ))}
      </div>
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={(data?.data ?? []) as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { useGetRolesQuery } from '../api/authorization.api';
import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent, Input } from '@/components/ui';
import type { AuthRole } from '../constants/authorization-data';

export function RolesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const { data, isLoading } = useGetRolesQuery({ page: 1, limit: 50, search: search || undefined, status: statusFilter || undefined });

  const columns: DataTableColumn<AuthRole>[] = [
    { key: 'name', header: 'Role Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'description', header: 'Description', render: (r) => r.description ?? '—' },
    { key: 'userCount', header: 'Users' },
    { key: 'parent', header: 'Parent Role', render: (r) => r.parentRoleName ?? '—' },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${r.status === 'ACTIVE' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
          {r.status}
        </span>
      ),
    },
    { key: 'createdBy', header: 'Created By' },
    { key: 'createdAt', header: 'Created', render: (r) => dayjs(r.createdAt).format('MMM D, YYYY') },
    { key: 'updatedAt', header: 'Updated', render: (r) => dayjs(r.updatedAt).format('MMM D, YYYY') },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <div className="flex flex-wrap gap-1">
          <Button variant="ghost" size="sm" onClick={() => toast.success(`Viewing ${r.name}`)}>View</Button>
          <Button variant="ghost" size="sm" onClick={() => toast('Edit role')}>Edit</Button>
          <Button variant="ghost" size="sm" onClick={() => toast('Assign permissions')}>Permissions</Button>
          {!r.isSystem && (
            <Button variant="ghost" size="sm" onClick={() => toast.error('Disable role')}>Disable</Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authorization', path: '/administration/authorization' }, { label: 'Roles' }]}
        title="Roles"
        description="Manage system roles and their permissions"
        actions={<Button onClick={() => toast('Create role dialog')}><FiPlus className="h-4 w-4" /> Create Role</Button>}
      />
      <AuthorizationSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-3">
            <div className="relative max-w-xs flex-1">
              <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-10" placeholder="Search roles..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {(['', 'ACTIVE', 'DISABLED'] as const).map((s) => (
              <button
                key={s || 'all'}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
              >
                {s || 'All'}
              </button>
            ))}
          </div>
          {isLoading ? (
            <div className="data-table-empty">Loading roles...</div>
          ) : (
            <DataTable
              columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]}
              rows={(data?.data ?? []) as unknown as Record<string, unknown>[]}
              rowKey={(r) => String(r.id)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { useGetPermissionsQuery } from '../api/authorization.api';
import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent, Input } from '@/components/ui';
import type { AuthPermission } from '../constants/authorization-data';

export function PermissionsPage() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useGetPermissionsQuery({ page: 1, limit: 50, search: search || undefined });

  const columns: DataTableColumn<AuthPermission>[] = [
    { key: 'name', header: 'Permission Name', render: (p) => <code className="text-sm">{p.name}</code> },
    { key: 'description', header: 'Description', render: (p) => p.description ?? '—' },
    { key: 'module', header: 'Module', render: (p) => <span className="capitalize">{p.module}</span> },
    { key: 'type', header: 'Type', render: (p) => p.permissionType },
    {
      key: 'status',
      header: 'Status',
      render: (p) => (
        <span className={p.status === 'ACTIVE' ? 'text-success' : 'text-muted-foreground'}>{p.status}</span>
      ),
    },
    { key: 'createdAt', header: 'Created', render: (p) => dayjs(p.createdAt).format('MMM D, YYYY') },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => toast('Edit')}>Edit</Button>
          <Button variant="ghost" size="sm" onClick={() => toast('Disable')}>Disable</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authorization', path: '/administration/authorization' }, { label: 'Permissions' }]}
        title="Permissions"
        description="Every permission available in the system"
        actions={<Button onClick={() => toast('Create permission')}><FiPlus className="h-4 w-4" /> Create Permission</Button>}
      />
      <AuthorizationSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="relative mb-4 max-w-xs">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10" placeholder="Search permissions..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {isLoading ? (
            <div className="data-table-empty">Loading permissions...</div>
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

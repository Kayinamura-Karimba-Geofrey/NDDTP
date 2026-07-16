import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { FiPlus, FiSearch, FiDownload, FiPrinter } from 'react-icons/fi';
import { useGetUsersQuery } from '../api/users.api';
import { UserSubNav } from '../components/UserSubNav';
import { UserStatusBadge } from '../components/UserStatusBadge';
import { Avatar } from '@/components/ui';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent, Input } from '@/components/ui';
import type { PlatformUser } from '../constants/users-data';

export function UsersListPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading } = useGetUsersQuery({ page: 1, limit: 50, search: search || undefined, status: statusFilter || undefined });

  const columns: DataTableColumn<PlatformUser>[] = [
    { key: 'emp', header: 'Employee #', render: (u) => <code className="text-xs">{u.employeeNumber}</code> },
    {
      key: 'name',
      header: 'Full Name',
      render: (u) => (
        <div className="flex items-center gap-2">
          <Avatar name={`${u.firstName} ${u.lastName}`} src={u.profilePhotoUrl} size="sm" />
          <span className="font-medium">{u.firstName} {u.lastName}</span>
        </div>
      ),
    },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone', render: (u) => u.phone ?? '—' },
    { key: 'department', header: 'Department' },
    { key: 'position', header: 'Position' },
    { key: 'employment', header: 'Employment', render: (u) => u.employmentStatus },
    { key: 'status', header: 'Status', render: (u) => <UserStatusBadge status={u.status} /> },
    { key: 'roles', header: 'Roles', render: (u) => u.roles.length ? u.roles.join(', ') : <span className="text-warning">None</span> },
    { key: 'lastLogin', header: 'Last Login', render: (u) => u.lastLogin ? dayjs(u.lastLogin).format('MMM D, HH:mm') : '—' },
    { key: 'created', header: 'Created', render: (u) => dayjs(u.createdAt).format('MMM D, YYYY') },
    {
      key: 'actions',
      header: 'Actions',
      render: (u) => (
        <div className="flex flex-wrap gap-1">
          <Link to={`/users/${u.id}`}><Button variant="ghost" size="sm">View</Button></Link>
          <Link to={`/users/${u.id}/edit`}><Button variant="ghost" size="sm">Edit</Button></Link>
          <Button variant="ghost" size="sm" onClick={() => toast.success('Activated')}>Activate</Button>
          <Link to="/administration/assignments"><Button variant="ghost" size="sm">Roles</Button></Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'User Management', path: '/users/dashboard' }, { label: 'All Users' }]}
        title="Users"
        description="Main user administration screen"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast('Exporting...')}><FiDownload className="h-4 w-4" /> Export</Button>
            <Button variant="outline" size="sm" onClick={() => window.print()}><FiPrinter className="h-4 w-4" /> Print</Button>
            <Link to="/users/new"><Button><FiPlus className="h-4 w-4" /> Create User</Button></Link>
          </div>
        }
      />
      <UserSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-3">
            <div className="relative min-w-[200px] flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-10" placeholder="Search by name, email, employee #..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {['', 'ACTIVE', 'PENDING', 'SUSPENDED', 'INACTIVE'].map((s) => (
              <button key={s || 'all'} type="button" onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-medium ${statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{s || 'All'}</button>
            ))}
          </div>
          {isLoading ? <div className="data-table-empty">Loading users...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={(data?.data ?? []) as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

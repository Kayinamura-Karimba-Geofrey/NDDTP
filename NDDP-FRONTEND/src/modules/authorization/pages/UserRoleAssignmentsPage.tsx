import { useState } from 'react';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetAssignmentsQuery } from '../api/authorization.api';
import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { RoleAssignment } from '../constants/authorization-data';

export function UserRoleAssignmentsPage() {
  const { data: assignments = [], isLoading } = useGetAssignmentsQuery({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const columns: DataTableColumn<RoleAssignment>[] = [
    { key: 'employee', header: 'Employee', render: (r) => r.employeeName },
    { key: 'department', header: 'Department' },
    { key: 'roles', header: 'Current Roles', render: (r) => r.roleName },
    { key: 'status', header: 'Status', render: (r) => <span className="text-success">{r.status}</span> },
    { key: 'assignedBy', header: 'Assigned By' },
    { key: 'assignedAt', header: 'Assigned Date', render: (r) => dayjs(r.assignedAt).format('MMM D, YYYY') },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => toast(`Assign role to ${r.employeeName}`)}>Assign</Button>
          <Button variant="ghost" size="sm" onClick={() => toast.error(`Remove role from ${r.employeeName}`)}>Remove</Button>
          <Button variant="ghost" size="sm" onClick={() => toast('View permissions')}>Permissions</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authorization', path: '/administration/authorization' }, { label: 'Assignments' }]}
        title="User Role Assignments"
        description="Assign and manage roles for platform users"
        actions={<Button onClick={() => setDialogOpen(true)}><FiPlus className="h-4 w-4" /> Assign Role</Button>}
      />
      <AuthorizationSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="data-table-empty">Loading assignments...</div>
          ) : (
            <DataTable
              columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]}
              rows={assignments as unknown as Record<string, unknown>[]}
              rowKey={(r) => String(r.id)}
            />
          )}
        </CardContent>
      </Card>

      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal>
          <Card className="w-full max-w-md">
            <CardContent className="space-y-4 pt-6">
              <h3 className="text-lg font-semibold">Assign Role</h3>
              <p className="text-sm text-muted-foreground">Search user, select role, set effective and expiry dates.</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => { toast.success('Role assigned'); setDialogOpen(false); }}>Assign</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

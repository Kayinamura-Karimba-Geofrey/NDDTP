import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import { MOCK_TEMPORARY_ACCESS } from '../constants/authorization-data';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { TemporaryAccess } from '../constants/authorization-data';

export function TemporaryAccessPage() {
  const columns: DataTableColumn<TemporaryAccess>[] = [
    { key: 'user', header: 'User' },
    { key: 'permission', header: 'Permission', render: (r) => <code className="text-xs">{r.permission}</code> },
    { key: 'start', header: 'Start', render: (r) => dayjs(r.startDate).format('MMM D, YYYY') },
    { key: 'end', header: 'End', render: (r) => dayjs(r.endDate).format('MMM D, YYYY') },
    { key: 'auto', header: 'Auto Revoke', render: (r) => r.autoRevoke ? 'Yes' : 'No' },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <span className={r.status === 'ACTIVE' ? 'text-success' : 'text-muted-foreground'}>{r.status}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => r.status === 'ACTIVE' ? (
        <Button variant="ghost" size="sm" onClick={() => toast.success('Access revoked')}>Revoke</Button>
      ) : null,
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authorization', path: '/administration/authorization' }, { label: 'Temporary Access' }]}
        title="Temporary Access"
        description="Grant time-limited permissions for projects, audits, or emergencies"
        actions={<Button onClick={() => toast('Grant temporary access')}><FiPlus className="h-4 w-4" /> Grant Access</Button>}
      />
      <AuthorizationSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]}
            rows={MOCK_TEMPORARY_ACCESS as unknown as Record<string, unknown>[]}
            rowKey={(r) => String(r.id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

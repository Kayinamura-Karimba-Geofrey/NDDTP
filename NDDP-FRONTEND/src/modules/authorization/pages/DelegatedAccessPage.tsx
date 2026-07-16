import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import { MOCK_DELEGATIONS } from '../constants/authorization-data';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { DelegatedAccess } from '../constants/authorization-data';

export function DelegatedAccessPage() {
  const columns: DataTableColumn<DelegatedAccess>[] = [
    { key: 'delegator', header: 'Delegator' },
    { key: 'delegate', header: 'Delegate' },
    { key: 'start', header: 'Start', render: (r) => dayjs(r.startDate).format('MMM D, YYYY') },
    { key: 'end', header: 'End', render: (r) => dayjs(r.endDate).format('MMM D, YYYY') },
    { key: 'reason', header: 'Reason' },
    { key: 'permissions', header: 'Permissions', render: (r) => r.permissions.join(', ') },
    { key: 'status', header: 'Status', render: (r) => <span className="text-success">{r.status}</span> },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authorization', path: '/administration/authorization' }, { label: 'Delegated Access' }]}
        title="Delegated Access"
        description="Temporary delegation of approval authority"
        actions={<Button onClick={() => toast('Create delegation')}><FiPlus className="h-4 w-4" /> New Delegation</Button>}
      />
      <AuthorizationSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]}
            rows={MOCK_DELEGATIONS as unknown as Record<string, unknown>[]}
            rowKey={(r) => String(r.id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

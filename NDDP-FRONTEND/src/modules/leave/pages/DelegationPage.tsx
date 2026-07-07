import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_DELEGATIONS, type LeaveDelegation } from '../constants/leave-data';

export function DelegationPage() {
  const columns: DataTableColumn<LeaveDelegation>[] = [
    { key: 'from', header: 'Delegator', render: (d) => d.delegator },
    { key: 'to', header: 'Delegate', render: (d) => <span className="font-medium">{d.delegate}</span> },
    { key: 'start', header: 'Effective', render: (d) => dayjs(d.effectiveDate).format('MMM D, YYYY') },
    { key: 'end', header: 'Expiry', render: (d) => dayjs(d.expiryDate).format('MMM D, YYYY') },
    { key: 'reason', header: 'Reason' },
    { key: 'status', header: 'Status', render: (d) => <span className={d.status === 'ACTIVE' ? 'text-success' : 'text-muted-foreground'}>{d.status}</span> },
    { key: 'actions', header: 'Actions', render: () => <Button variant="ghost" size="sm" onClick={() => toast('Revoked')}>Revoke</Button> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Delegation' }]} title="Delegation" description="Delegate leave approval authority during absence" actions={<Button onClick={() => toast('New delegation')}><FiPlus className="h-4 w-4" /> New Delegation</Button>} />
      <LeaveSubNav />
      <Card><CardContent className="pt-6">
        <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_DELEGATIONS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
      </CardContent></Card>
    </div>
  );
}

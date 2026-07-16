import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_CARRY_OVER, type CarryOverRecord } from '../constants/leave-data';

export function CarryOverPage() {
  const columns: DataTableColumn<CarryOverRecord>[] = [
    { key: 'emp', header: 'Employee', render: (c) => <span className="font-medium">{c.employeeName}</span> },
    { key: 'type', header: 'Leave Type' },
    { key: 'eligible', header: 'Eligible', render: (c) => `${c.eligibleDays} days` },
    { key: 'carried', header: 'Carried', render: (c) => `${c.carriedDays} days` },
    { key: 'max', header: 'Max Carry-Over', render: (c) => c.maxCarryOver },
    { key: 'expiry', header: 'Expiry', render: (c) => dayjs(c.expiryDate).format('MMM D, YYYY') },
    { key: 'status', header: 'Status', render: (c) => <span className={c.status === 'ACTIVE' ? 'text-success' : 'text-muted-foreground'}>{c.status}</span> },
    { key: 'actions', header: 'Actions', render: () => <Button variant="ghost" size="sm" onClick={() => toast('Adjusted')}>Adjust</Button> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Carry Over' }]} title="Carry Over" description="Manage unused leave carry-forward and expiry" />
      <LeaveSubNav />
      <Card><CardContent className="pt-6">
        <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_CARRY_OVER as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
      </CardContent></Card>
    </div>
  );
}

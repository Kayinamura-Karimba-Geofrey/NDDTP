import dayjs from 'dayjs';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_ACCRUALS, type LeaveAccrualEntry } from '../constants/leave-data';

export function LeaveAccrualPage() {
  const columns: DataTableColumn<LeaveAccrualEntry>[] = [
    { key: 'emp', header: 'Employee', render: (a) => <span className="font-medium">{a.employeeName}</span> },
    { key: 'type', header: 'Leave Type' },
    { key: 'amount', header: 'Amount', render: (a) => `+${a.amount} days` },
    { key: 'accrual', header: 'Accrual Type', render: (a) => a.type },
    { key: 'date', header: 'Date', render: (a) => dayjs(a.date).format('MMM D, YYYY') },
    { key: 'notes', header: 'Notes', render: (a) => a.notes ?? '—' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Leave Accrual' }]} title="Leave Accrual" description="Monthly, annual, manual adjustments, and special allocations" />
      <LeaveSubNav />
      <Card><CardContent className="pt-6">
        <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_ACCRUALS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
      </CardContent></Card>
    </div>
  );
}

import { useState } from 'react';

import { useGetAllLeaveBalancesQuery } from '../api/leave.api';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { AdjustBalanceModal } from '../components/AdjustBalanceModal';
import { type LeaveBalance } from '../constants/leave-data';

export function LeaveBalancesPage() {
  const { data: balances = [], isLoading } = useGetAllLeaveBalancesQuery();
  const [selectedBalance, setSelectedBalance] = useState<LeaveBalance | null>(null);

  const grouped = balances.reduce<Record<string, LeaveBalance & { annual?: number; sick?: number; study?: number; compassionate?: number; carryOver?: number }>>((acc, b) => {
    const key = b.employeeName;
    if (!acc[key]) acc[key] = { ...b, annual: 0, sick: 0, study: 0, compassionate: 0, carryOver: 0 };
    if (b.leaveTypeName.includes('Annual')) acc[key].annual = b.availableDays;
    if (b.leaveTypeName.includes('Sick')) acc[key].sick = b.availableDays;
    if (b.leaveTypeName.includes('Study')) acc[key].study = b.availableDays;
    if (b.leaveTypeName.includes('Compassionate')) acc[key].compassionate = b.availableDays;
    if (b.carryOverDays) acc[key].carryOver = b.carryOverDays;
    return acc;
  }, {});

  const rows = Object.values(grouped);

  const columns: DataTableColumn<typeof rows[number]>[] = [
    { key: 'emp', header: 'Employee', render: (r) => <span className="font-medium">{r.employeeName}</span> },
    { key: 'dept', header: 'Department' },
    { key: 'annual', header: 'Annual', render: (r) => r.annual ?? '—' },
    { key: 'sick', header: 'Sick', render: (r) => r.sick ?? '—' },
    { key: 'study', header: 'Study', render: (r) => r.study ?? '—' },
    { key: 'comp', header: 'Compassionate', render: (r) => r.compassionate ?? '—' },
    { key: 'carry', header: 'Carry Over', render: (r) => r.carryOver ?? '—' },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => setSelectedBalance(r)}>Adjust</Button>
          <Button variant="ghost" size="sm" onClick={() => setSelectedBalance(r)}>Grant</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Leave Balances' }]} title="Leave Balances" description="HR administration of employee leave balances" />
      <LeaveSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.employeeName)} />
        )}
      </CardContent></Card>

      <AdjustBalanceModal
        isOpen={!!selectedBalance}
        onClose={() => setSelectedBalance(null)}
        employeeName={selectedBalance?.employeeName || ''}
        leaveTypeName={selectedBalance?.leaveTypeName || ''}
      />
    </div>
  );
}

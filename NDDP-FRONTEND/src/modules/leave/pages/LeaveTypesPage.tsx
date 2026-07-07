import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetLeaveTypesQuery } from '../api/leave.api';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { LeaveType } from '../constants/leave-data';

export function LeaveTypesPage() {
  const { data: types = [], isLoading } = useGetLeaveTypesQuery();

  const columns: DataTableColumn<LeaveType>[] = [
    { key: 'code', header: 'Code', render: (t) => <code>{t.code}</code> },
    { key: 'name', header: 'Name', render: (t) => <span className="font-medium">{t.name}</span> },
    { key: 'max', header: 'Max Days', render: (t) => t.maxDays },
    { key: 'paid', header: 'Paid', render: (t) => t.paid ? 'Yes' : 'No' },
    { key: 'carry', header: 'Carry Over', render: (t) => t.carryOverAllowed ? 'Yes' : 'No' },
    { key: 'docs', header: 'Docs Required', render: (t) => t.documentationRequired ? 'Yes' : 'No' },
    { key: 'accrual', header: 'Accrual', render: (t) => t.accrualType },
    { key: 'actions', header: 'Actions', render: () => <Button variant="ghost" size="sm" onClick={() => toast('Edit')}>Edit</Button> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Leave Types' }]} title="Leave Types" description="Manage leave categories and rules" actions={<Button onClick={() => toast('Add type')}><FiPlus className="h-4 w-4" /> Add Type</Button>} />
      <LeaveSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={types as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
    </div>
  );
}

import dayjs from 'dayjs';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_REVENUE, type RevenueRecord } from '../constants/finance-data';

export function RevenueManagementPage() {
  const columns: DataTableColumn<RevenueRecord>[] = [
    { key: 'category', header: 'Category' },
    { key: 'source', header: 'Source', render: (r) => <span className="font-medium">{r.source}</span> },
    { key: 'amount', header: 'Amount', render: (r) => `${(r.amount / 1e9).toFixed(2)}B RWF` },
    { key: 'date', header: 'Received', render: (r) => dayjs(r.receivedDate).format('DD MMM YYYY') },
    { key: 'status', header: 'Status', render: (r) => <FinanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Revenue' }]} title="Revenue Management" description="Optional — government funding, service revenue, grants, donations" />
      <FinanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_REVENUE as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

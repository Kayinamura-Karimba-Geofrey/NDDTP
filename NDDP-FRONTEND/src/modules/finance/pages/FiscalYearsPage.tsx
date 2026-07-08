import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_FISCAL_YEARS, type FiscalYear } from '../constants/finance-data';

export function FiscalYearsPage() {
  const columns: DataTableColumn<FiscalYear>[] = [
    { key: 'year', header: 'Fiscal Year', render: (r) => <span className="font-medium">{r.fiscalYear}</span> },
    { key: 'start', header: 'Start Date', render: (r) => dayjs(r.startDate).format('DD MMM YYYY') },
    { key: 'end', header: 'End Date', render: (r) => dayjs(r.endDate).format('DD MMM YYYY') },
    { key: 'closed', header: 'Closed By', render: (r) => r.closedBy ?? '—' },
    { key: 'closeDate', header: 'Close Date', render: (r) => r.closeDate ? dayjs(r.closeDate).format('DD MMM YYYY') : '—' },
    { key: 'status', header: 'Status', render: (r) => <FinanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Fiscal Years' }]} title="Fiscal Years" description="Manage financial periods" actions={<Button onClick={() => toast('Open fiscal year')}><FiPlus className="h-4 w-4" /> Open Fiscal Year</Button>} />
      <FinanceSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_FISCAL_YEARS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

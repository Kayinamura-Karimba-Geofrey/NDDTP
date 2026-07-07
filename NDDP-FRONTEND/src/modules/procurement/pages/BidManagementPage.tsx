import dayjs from 'dayjs';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_BIDS, type BidRecord } from '../constants/procurement-data';

export function BidManagementPage() {
  const columns: DataTableColumn<BidRecord>[] = [
    { key: 'tender', header: 'Tender #', render: (r) => <code className="text-xs">{r.tenderNumber}</code> },
    { key: 'supplier', header: 'Supplier', render: (r) => <span className="font-medium">{r.supplier}</span> },
    { key: 'amount', header: 'Bid Amount', render: (r) => `${(r.bidAmount / 1e6).toFixed(1)}M RWF` },
    { key: 'date', header: 'Submitted', render: (r) => dayjs(r.submissionDate).format('DD MMM YYYY') },
    { key: 'compliance', header: 'Compliance' },
    { key: 'tech', header: 'Technical', render: (r) => r.technicalScore },
    { key: 'fin', header: 'Financial', render: (r) => r.financialScore },
    { key: 'status', header: 'Status', render: (r) => <ProcurementStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Bids' }]} title="Bid Management" description="Manage supplier bids for tenders" />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_BIDS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

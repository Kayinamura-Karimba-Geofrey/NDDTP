import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetBidsQuery } from '../api/procurement.api';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { BidRecord } from '../constants/procurement-data';
import { SubmitBidModal } from '../components/SubmitBidModal';

export function BidManagementPage() {
  const { data: bids = [], isLoading } = useGetBidsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Bids' }]} title="Bid Management" description="Manage supplier bids for tenders" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Record Bid</Button>} />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={bids as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
      <SubmitBidModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

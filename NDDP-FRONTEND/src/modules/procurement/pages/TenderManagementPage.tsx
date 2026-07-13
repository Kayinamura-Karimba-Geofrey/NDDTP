import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetTendersQuery } from '../api/procurement.api';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { TenderRecord } from '../constants/procurement-data';
import { CreateTenderModal } from '../components/CreateTenderModal';

export function TenderManagementPage() {
  const { data: tenders = [], isLoading } = useGetTendersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<TenderRecord>[] = [
    { key: 'num', header: 'Tender #', render: (r) => <code className="text-xs">{r.tenderNumber}</code> },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'budget', header: 'Budget', render: (r) => `${(r.budget / 1e6).toFixed(0)}M RWF` },
    { key: 'deadline', header: 'Submission Deadline', render: (r) => dayjs(r.submissionDeadline).format('DD MMM YYYY') },
    { key: 'opening', header: 'Opening Date', render: (r) => dayjs(r.openingDate).format('DD MMM YYYY') },
    { key: 'committee', header: 'Committee' },
    { key: 'status', header: 'Status', render: (r) => <ProcurementStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Tenders' }]} title="Tender Management" description="High-value procurements — publish, evaluate, award" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Publish Tender</Button>} />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={tenders as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
      <CreateTenderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

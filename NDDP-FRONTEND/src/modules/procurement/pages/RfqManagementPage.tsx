import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetRfqsQuery } from '../api/procurement.api';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { RfqRecord } from '../constants/procurement-data';
import { CreateRfqModal } from '../components/CreateRfqModal';

export function RfqManagementPage() {
  const { data: rfqs = [], isLoading } = useGetRfqsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<RfqRecord>[] = [
    { key: 'num', header: 'RFQ #', render: (r) => <code className="text-xs">{r.rfqNumber}</code> },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'items', header: 'Items' },
    { key: 'suppliers', header: 'Suppliers Invited' },
    { key: 'closing', header: 'Closing Date', render: (r) => dayjs(r.closingDate).format('DD MMM YYYY') },
    { key: 'status', header: 'Status', render: (r) => <ProcurementStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'RFQ' }]} title="RFQ Management" description="Request for quotation — invite suppliers, receive quotes, evaluate" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Create RFQ</Button>} />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rfqs as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
      <CreateRfqModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

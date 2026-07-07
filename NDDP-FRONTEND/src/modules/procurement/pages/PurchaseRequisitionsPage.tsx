import { useState } from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetPurchaseRequisitionsQuery } from '../api/procurement.api';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { PurchaseRequisition } from '../constants/procurement-data';

export function PurchaseRequisitionsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading } = useGetPurchaseRequisitionsQuery({ page: 1, limit: 100 });
  const rows = (data?.data ?? []).filter((r) => !statusFilter || r.status === statusFilter);

  const columns: DataTableColumn<PurchaseRequisition>[] = [
    { key: 'num', header: 'Requisition #', render: (r) => <code className="text-xs">{r.requisitionNumber}</code> },
    { key: 'dept', header: 'Department' },
    { key: 'requester', header: 'Requester' },
    { key: 'category', header: 'Category' },
    { key: 'cost', header: 'Est. Cost', render: (r) => `${(r.estimatedCost / 1e6).toFixed(1)}M RWF` },
    { key: 'priority', header: 'Priority' },
    { key: 'date', header: 'Submitted', render: (r) => dayjs(r.submissionDate).format('DD MMM YYYY') },
    { key: 'status', header: 'Status', render: (r) => <ProcurementStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Requisitions' }]} title="Purchase Requisitions" description="Department requests for goods and services" actions={<Button onClick={() => toast('New requisition')}><FiPlus className="h-4 w-4" /> New Requisition</Button>} />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {['', 'DRAFT', 'SUBMITTED', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED'].map((s) => (
              <button key={s || 'all'} type="button" onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-medium ${statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{s ? s.replace(/_/g, ' ') : 'All'}</button>
            ))}
          </div>
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

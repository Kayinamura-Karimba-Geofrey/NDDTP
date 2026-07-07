import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_PURCHASE_REQUESTS, type PurchaseRequest } from '../constants/procurement-data';

export function PurchaseRequestsPage() {
  const columns: DataTableColumn<PurchaseRequest>[] = [
    { key: 'num', header: 'Request #', render: (r) => <code className="text-xs">{r.requestNumber}</code> },
    { key: 'req', header: 'Linked Requisition', render: (r) => <code className="text-xs">{r.linkedRequisition}</code> },
    { key: 'supplier', header: 'Supplier Type' },
    { key: 'method', header: 'Procurement Method' },
    { key: 'delivery', header: 'Expected Delivery', render: (r) => dayjs(r.expectedDelivery).format('DD MMM YYYY') },
    { key: 'budget', header: 'Budget Ref', render: (r) => <code className="text-xs">{r.budgetReference}</code> },
    { key: 'status', header: 'Status', render: (r) => <ProcurementStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Purchase Requests' }]} title="Purchase Requests" description="Formal procurement requests linked to requisitions" actions={<Button onClick={() => toast('New request')}><FiPlus className="h-4 w-4" /> New Request</Button>} />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_PURCHASE_REQUESTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

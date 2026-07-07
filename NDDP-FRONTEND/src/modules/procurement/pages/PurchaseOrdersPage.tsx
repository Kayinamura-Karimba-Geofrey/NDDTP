import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetPurchaseOrdersQuery } from '../api/procurement.api';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { PurchaseOrder } from '../constants/procurement-data';

export function PurchaseOrdersPage() {
  const { data, isLoading } = useGetPurchaseOrdersQuery({ page: 1, limit: 100 });
  const rows = data?.data ?? [];

  const columns: DataTableColumn<PurchaseOrder>[] = [
    { key: 'num', header: 'PO #', render: (r) => <code className="text-xs">{r.poNumber}</code> },
    { key: 'supplier', header: 'Supplier', render: (r) => <span className="font-medium">{r.supplier}</span> },
    { key: 'items', header: 'Items' },
    { key: 'amount', header: 'Total', render: (r) => `${(r.totalAmount / 1e6).toFixed(1)}M RWF` },
    { key: 'delivery', header: 'Delivery Date', render: (r) => r.deliveryDate !== '—' ? dayjs(r.deliveryDate).format('DD MMM YYYY') : '—' },
    { key: 'address', header: 'Delivery Address', render: (r) => <span className="text-xs">{r.deliveryAddress}</span> },
    { key: 'status', header: 'Status', render: (r) => <ProcurementStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Purchase Orders' }]} title="Purchase Orders" description="Official purchasing documents issued to suppliers" actions={<Button onClick={() => toast('Create PO')}><FiPlus className="h-4 w-4" /> Create PO</Button>} />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_RECEIPT_COORDINATION, type GoodsReceiptCoordination } from '../constants/procurement-data';

export function GoodsReceiptCoordinationPage() {
  const columns: DataTableColumn<GoodsReceiptCoordination>[] = [
    { key: 'num', header: 'Receipt #', render: (r) => <code className="text-xs">{r.receiptNumber}</code> },
    { key: 'po', header: 'PO #', render: (r) => <code className="text-xs">{r.poNumber}</code> },
    { key: 'warehouse', header: 'Warehouse' },
    { key: 'receiver', header: 'Receiver' },
    { key: 'inspection', header: 'Inspection' },
    { key: 'status', header: 'Status', render: (r) => <ProcurementStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Goods Receipt' }]} title="Goods Receipt Coordination" description="Coordinates delivery confirmation — PO to warehouse inspection to inventory update" />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          <p className="mb-4 text-sm text-muted-foreground">Receipt coordination links purchase orders to Inventory Service for stock updates. Inventory manages stock after receipt.</p>
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_RECEIPT_COORDINATION as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

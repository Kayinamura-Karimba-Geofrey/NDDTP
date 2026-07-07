import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_INVOICE_MATCHES, type InvoiceMatch } from '../constants/procurement-data';

export function InvoiceMatchingPage() {
  const columns: DataTableColumn<InvoiceMatch>[] = [
    { key: 'inv', header: 'Invoice #', render: (r) => <code className="text-xs">{r.invoiceNumber}</code> },
    { key: 'po', header: 'PO #', render: (r) => <code className="text-xs">{r.poNumber}</code> },
    { key: 'supplier', header: 'Supplier' },
    { key: 'amount', header: 'Amount', render: (r) => `${(r.amount / 1e6).toFixed(1)}M RWF` },
    { key: 'match', header: 'Match Result', render: (r) => <ProcurementStatusBadge status={r.matchResult} /> },
    { key: 'status', header: 'Status', render: (r) => <ProcurementStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Invoice Matching' }]} title="Invoice Matching" description="Three-way matching — Purchase Order, Goods Receipt, Supplier Invoice" />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          <p className="mb-4 text-sm text-muted-foreground">Compare PO → Goods Receipt → Supplier Invoice. Finance Service processes payments after successful match.</p>
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_INVOICE_MATCHES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

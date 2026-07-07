import { InventorySubNav } from '../components/InventorySubNav';
import { InventoryStatusBadge } from '../components/InventoryStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_SUPPLIERS, type SupplierRef } from '../constants/inventory-data';

export function InventorySuppliersPage() {
  const columns: DataTableColumn<SupplierRef>[] = [
    { key: 'code', header: 'Code', render: (r) => <code className="text-xs">{r.code}</code> },
    { key: 'name', header: 'Supplier Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'category', header: 'Category' },
    { key: 'contact', header: 'Contact' },
    { key: 'status', header: 'Status', render: (r) => <InventoryStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Suppliers' }]} title="Suppliers (Reference)" description="Supplier references from Procurement Service — authoritative source remains Procurement" />
      <InventorySubNav />
      <Card>
        <CardContent className="pt-6">
          <p className="mb-4 text-sm text-muted-foreground">Supplier records are maintained in the Procurement Service. This view provides read-only reference for warehouse operations.</p>
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_SUPPLIERS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

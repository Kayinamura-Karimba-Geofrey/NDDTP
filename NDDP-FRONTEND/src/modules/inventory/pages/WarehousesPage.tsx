import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useGetWarehousesQuery } from '../api/inventory.api';
import { InventorySubNav } from '../components/InventorySubNav';
import { InventoryStatusBadge } from '../components/InventoryStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { Warehouse } from '../constants/inventory-data';

export function WarehousesPage() {
  const { data: warehouses = [], isLoading } = useGetWarehousesQuery();

  const columns: DataTableColumn<Warehouse>[] = [
    { key: 'code', header: 'Code', render: (r) => <Link to={`/inventory/warehouses/${r.id}`} className="font-mono text-xs underline">{r.code}</Link> },
    { key: 'name', header: 'Warehouse Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'location', header: 'Location' },
    { key: 'manager', header: 'Manager', render: (r) => r.manager ?? '—' },
    { key: 'capacity', header: 'Capacity', render: (r) => r.capacity ?? '—' },
    { key: 'items', header: 'Items', render: (r) => r.itemCount?.toLocaleString() ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <InventoryStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Warehouses' }]} title="Warehouses" description="Physical storage locations for consumable stock" actions={<Button onClick={() => toast('Add warehouse')}><FiPlus className="h-4 w-4" /> Add Warehouse</Button>} />
      <InventorySubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={warehouses as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

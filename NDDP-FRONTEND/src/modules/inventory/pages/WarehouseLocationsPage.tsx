import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { InventorySubNav } from '../components/InventorySubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_LOCATIONS, type WarehouseLocation } from '../constants/inventory-data';

export function WarehouseLocationsPage() {
  const columns: DataTableColumn<WarehouseLocation>[] = [
    { key: 'warehouse', header: 'Warehouse', render: (r) => <span className="font-medium">{r.warehouse}</span> },
    { key: 'zone', header: 'Zone' },
    { key: 'aisle', header: 'Aisle' },
    { key: 'shelf', header: 'Shelf' },
    { key: 'bin', header: 'Bin', render: (r) => <code className="text-xs">{r.bin}</code> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Locations' }]} title="Warehouse Locations" description="Zones, aisles, shelves, and bins within warehouses" actions={<Button onClick={() => toast('Add location')}><FiPlus className="h-4 w-4" /> Add Location</Button>} />
      <InventorySubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_LOCATIONS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

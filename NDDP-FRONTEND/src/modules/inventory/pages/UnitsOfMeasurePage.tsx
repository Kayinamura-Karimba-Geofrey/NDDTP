import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { InventorySubNav } from '../components/InventorySubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_UNITS, type UnitOfMeasure } from '../constants/inventory-data';

export function UnitsOfMeasurePage() {
  const columns: DataTableColumn<UnitOfMeasure>[] = [
    { key: 'code', header: 'Code', render: (r) => <code className="text-xs">{r.code}</code> },
    { key: 'name', header: 'Unit Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'desc', header: 'Description' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Units of Measure' }]} title="Units of Measure" description="Standard units for inventory quantities" actions={<Button onClick={() => toast('Add unit')}><FiPlus className="h-4 w-4" /> Add Unit</Button>} />
      <InventorySubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_UNITS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

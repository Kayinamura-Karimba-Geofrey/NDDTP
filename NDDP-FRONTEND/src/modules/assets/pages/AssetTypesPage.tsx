import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { AssetSubNav } from '../components/AssetSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_TYPES, type AssetType } from '../constants/asset-data';

export function AssetTypesPage() {
  const columns: DataTableColumn<AssetType>[] = [
    { key: 'name', header: 'Type Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'category', header: 'Category' },
    { key: 'life', header: 'Useful Life' },
    { key: 'maint', header: 'Maintenance Schedule' },
    { key: 'inspect', header: 'Inspection Frequency' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Types' }]} title="Asset Types" description="Asset types within each category" actions={<Button onClick={() => toast('Add type')}><FiPlus className="h-4 w-4" /> Add Type</Button>} />
      <AssetSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_TYPES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

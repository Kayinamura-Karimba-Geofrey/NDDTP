import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useGetAssetCategoriesQuery } from '../api/asset.api';
import { AssetSubNav } from '../components/AssetSubNav';
import { AssetStatusBadge } from '../components/AssetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { AssetCategory } from '../constants/asset-data';
import { CreateCategoryModal } from '../components/CreateCategoryModal';

export function AssetCategoriesPage() {
  const { data: categories = [], isLoading } = useGetAssetCategoriesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<AssetCategory>[] = [
    { key: 'code', header: 'Code', render: (r) => <code className="text-xs">{r.code}</code> },
    { key: 'name', header: 'Category Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'desc', header: 'Description' },
    { key: 'count', header: 'Assets', render: (r) => r.assetCount?.toLocaleString() ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <AssetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Categories' }]} title="Asset Categories" description="Organize assets by category" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Add Category</Button>} />
      <AssetSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={categories as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
      <CreateCategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

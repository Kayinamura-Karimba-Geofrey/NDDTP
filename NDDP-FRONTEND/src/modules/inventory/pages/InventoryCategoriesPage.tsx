import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useGetInventoryCategoriesQuery } from '../api/inventory.api';
import { InventorySubNav } from '../components/InventorySubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { InventoryCategory } from '../constants/inventory-data';
import { CreateInventoryCategoryModal } from '../components/CreateInventoryCategoryModal';

export function InventoryCategoriesPage() {
  const { data: categories = [], isLoading } = useGetInventoryCategoriesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<InventoryCategory>[] = [
    { key: 'code', header: 'Code', render: (r) => <code className="text-xs">{r.code}</code> },
    { key: 'name', header: 'Category Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'desc', header: 'Description' },
    { key: 'count', header: 'Items', render: (r) => r.itemCount?.toLocaleString() ?? '—' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Categories' }]} title="Inventory Categories" description="Organize stock items by category" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Add Category</Button>} />
      <InventorySubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={categories as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
      <CreateInventoryCategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

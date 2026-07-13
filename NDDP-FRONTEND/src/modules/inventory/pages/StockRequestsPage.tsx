import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetStockRequestsQuery } from '../api/inventory.api';
import { InventorySubNav } from '../components/InventorySubNav';
import { InventoryStatusBadge } from '../components/InventoryStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { StockRequest } from '../constants/inventory-data';
import { CreateStockRequestModal } from '../components/CreateStockRequestModal';

export function StockRequestsPage() {
  const { data: requests = [], isLoading } = useGetStockRequestsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<StockRequest>[] = [
    { key: 'num', header: 'Request #', render: (r) => <code className="text-xs">{r.requestNumber}</code> },
    { key: 'dept', header: 'Department' },
    { key: 'requester', header: 'Requester' },
    { key: 'priority', header: 'Priority' },
    { key: 'date', header: 'Requested', render: (r) => dayjs(r.requestedDate).format('DD MMM YYYY') },
    { key: 'status', header: 'Status', render: (r) => <InventoryStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Stock Requests' }]} title="Stock Requests" description="Department requests for inventory items" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Request</Button>} />
      <InventorySubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={requests as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
      <CreateStockRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

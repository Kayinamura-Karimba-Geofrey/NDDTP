import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { InventorySubNav } from '../components/InventorySubNav';
import { InventoryStatusBadge } from '../components/InventoryStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_ISSUES, type GoodsIssue } from '../constants/inventory-data';

export function GoodsIssuePage() {
  const columns: DataTableColumn<GoodsIssue>[] = [
    { key: 'num', header: 'Issue #', render: (r) => <code className="text-xs">{r.issueNumber}</code> },
    { key: 'dept', header: 'Department' },
    { key: 'requester', header: 'Requester' },
    { key: 'warehouse', header: 'Warehouse', render: (r) => <span className="text-xs">{r.warehouse}</span> },
    { key: 'items', header: 'Items' },
    { key: 'qty', header: 'Quantity', render: (r) => r.quantity.toLocaleString() },
    { key: 'reason', header: 'Reason', render: (r) => <span className="text-xs">{r.reason}</span> },
    { key: 'status', header: 'Status', render: (r) => <InventoryStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Goods Issue' }]} title="Goods Issue" description="Issue stock to departments and personnel" actions={<Button onClick={() => toast('New issue')}><FiPlus className="h-4 w-4" /> New Issue</Button>} />
      <InventorySubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_ISSUES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

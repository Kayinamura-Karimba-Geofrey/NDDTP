import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useGetSuppliersQuery } from '../api/procurement.api';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { Supplier } from '../constants/procurement-data';

export function SupplierManagementPage() {
  const { data: suppliers = [], isLoading } = useGetSuppliersQuery();

  const columns: DataTableColumn<Supplier>[] = [
    { key: 'code', header: 'Code', render: (r) => <Link to={`/procurement/suppliers/${r.id}`} className="font-mono text-xs underline">{r.code}</Link> },
    { key: 'name', header: 'Company Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'category', header: 'Category' },
    { key: 'email', header: 'Email', render: (r) => r.email ?? '—' },
    { key: 'phone', header: 'Phone', render: (r) => r.phone ?? '—' },
    { key: 'rating', header: 'Rating', render: (r) => r.rating ? `${r.rating}/5` : '—' },
    { key: 'status', header: 'Status', render: (r) => <ProcurementStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Suppliers' }]} title="Supplier Management" description="Maintain supplier information and profiles" actions={<Button onClick={() => toast('Register supplier')}><FiPlus className="h-4 w-4" /> Register Supplier</Button>} />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={suppliers as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

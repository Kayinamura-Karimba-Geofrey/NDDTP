import { useParams, Link } from 'react-router-dom';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MOCK_SUPPLIER_PROFILES } from '../constants/procurement-data';

export function SupplierDetailPage() {
  const { id } = useParams();
  const supplier = MOCK_SUPPLIER_PROFILES.find((s) => s.id === id) ?? MOCK_SUPPLIER_PROFILES[0];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Suppliers', path: '/procurement/suppliers' }, { label: supplier.name }]} title={supplier.name} description={supplier.category} />
      <ProcurementSubNav />
      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg border border-border p-4">
        <div><p className="text-xs text-muted-foreground">Code</p><p className="font-mono font-medium">{supplier.code}</p></div>
        <div><p className="text-xs text-muted-foreground">Registration</p><p className="font-medium">{supplier.registrationNumber ?? '—'}</p></div>
        <div><p className="text-xs text-muted-foreground">Tax ID</p><p className="font-medium">{supplier.taxId ?? '—'}</p></div>
        <div><p className="text-xs text-muted-foreground">Status</p><ProcurementStatusBadge status={supplier.status} /></div>
        <div><p className="text-xs text-muted-foreground">Rating</p><p className="font-medium">{supplier.rating ? `${supplier.rating}/5` : '—'}</p></div>
        <Link to="/procurement/suppliers" className="ml-auto text-sm underline">← Back to suppliers</Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card><CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Overview</CardTitle></CardHeader><CardContent className="pt-4 text-sm text-muted-foreground">{supplier.overview}</CardContent></Card>
        <Card><CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Contact</CardTitle></CardHeader><CardContent className="space-y-2 pt-4 text-sm"><p>{supplier.email}</p><p>{supplier.phone}</p><p>{supplier.address}</p></CardContent></Card>
        <Card><CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Activity</CardTitle></CardHeader><CardContent className="space-y-2 pt-4 text-sm"><p>Contracts: {supplier.contractsCount}</p><p>Orders: {supplier.ordersCount}</p><p>Total Spend: {(supplier.totalSpend / 1e6).toFixed(0)}M RWF</p></CardContent></Card>
      </div>
    </div>
  );
}

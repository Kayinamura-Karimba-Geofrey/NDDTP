import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_VENDOR_REGISTRATIONS, type VendorRegistration } from '../constants/procurement-data';

export function VendorRegistrationPage() {
  const columns: DataTableColumn<VendorRegistration>[] = [
    { key: 'company', header: 'Company Name', render: (r) => <span className="font-medium">{r.companyName}</span> },
    { key: 'reg', header: 'Registration #', render: (r) => <code className="text-xs">{r.registrationNumber}</code> },
    { key: 'category', header: 'Category' },
    { key: 'date', header: 'Submitted', render: (r) => dayjs(r.submittedDate).format('DD MMM YYYY') },
    { key: 'status', header: 'Status', render: (r) => <ProcurementStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Vendor Registration' }]} title="Vendor Registration" description="Supplier registration applications and document verification" actions={<Button onClick={() => toast('Review application')}><FiPlus className="h-4 w-4" /> Review Application</Button>} />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          <p className="mb-4 text-sm text-muted-foreground">Required documents: Business Registration, Tax Certificate, Bank Details, Licenses, Compliance Certificates.</p>
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_VENDOR_REGISTRATIONS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

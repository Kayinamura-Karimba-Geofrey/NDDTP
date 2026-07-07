import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetMedicalClearancesQuery } from '../api/medical.api';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { MedicalStatusBadge } from '../components/MedicalStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { MedicalClearance } from '../constants/medical-data';

export function MedicalClearancesPage() {
  const { data: clearances = [], isLoading } = useGetMedicalClearancesQuery();

  const columns: DataTableColumn<MedicalClearance>[] = [
    { key: 'emp', header: 'Personnel', render: (r) => <span className="font-medium">{r.personnelName}</span> },
    { key: 'type', header: 'Clearance Type' },
    { key: 'issue', header: 'Issue Date', render: (r) => dayjs(r.issueDate).format('MMM D, YYYY') },
    { key: 'expiry', header: 'Expiry Date', render: (r) => dayjs(r.expiryDate).format('MMM D, YYYY') },
    { key: 'status', header: 'Status', render: (r) => <MedicalStatusBadge status={r.status} /> },
    { key: 'approved', header: 'Approved By', render: (r) => r.approvedBy },
    { key: 'actions', header: 'Actions', render: () => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast('Certificate downloaded')}>Download</Button>
        <Button variant="ghost" size="sm" onClick={() => toast('Renew clearance')}>Renew</Button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Clearances' }]} title="Medical Clearances" description="Medical clearance decisions and certificates" actions={<Button onClick={() => toast('Issue clearance')}><FiPlus className="h-4 w-4" /> Issue Clearance</Button>} />
      <MedicalSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={clearances as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

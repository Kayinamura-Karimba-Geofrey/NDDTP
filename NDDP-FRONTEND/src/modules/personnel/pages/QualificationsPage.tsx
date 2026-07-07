import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetPersonnelQualificationsQuery } from '../api/personnel.api';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { QualificationRecord } from '../constants/personnel-data';

export function QualificationsPage() {
  const { data: qualifications = [], isLoading } = useGetPersonnelQualificationsQuery();

  const columns: DataTableColumn<QualificationRecord>[] = [
    { key: 'person', header: 'Personnel', render: (q) => <span className="font-medium">{q.personnelName}</span> },
    { key: 'type', header: 'Type', render: (q) => q.type },
    { key: 'name', header: 'Qualification' },
    { key: 'institution', header: 'Institution' },
    { key: 'grad', header: 'Graduation', render: (q) => q.graduationDate ? dayjs(q.graduationDate).format('MMM YYYY') : '—' },
    { key: 'expiry', header: 'Expiry', render: (q) => q.expiryDate ? dayjs(q.expiryDate).format('MMM D, YYYY') : '—' },
    { key: 'status', header: 'Status', render: (q) => (
      <span className={q.status === 'VALID' ? 'text-success' : q.status === 'EXPIRING' ? 'text-warning' : 'text-destructive'}>{q.status}</span>
    )},
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Qualifications' }]} title="Qualifications" description="Educational qualifications and professional credentials" actions={<Button onClick={() => toast('Add qualification')}><FiPlus className="h-4 w-4" /> Add Qualification</Button>} />
      <PersonnelSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={qualifications as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
    </div>
  );
}

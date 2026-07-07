import dayjs from 'dayjs';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_QUALIFICATIONS, type QualificationRecord } from '../constants/personnel-data';

export function CertificationsPage() {
  const certs = MOCK_QUALIFICATIONS.filter((q) => q.type === 'PROFESSIONAL' || q.type === 'LICENSE');

  const columns: DataTableColumn<QualificationRecord>[] = [
    { key: 'person', header: 'Personnel', render: (q) => q.personnelName },
    { key: 'name', header: 'Certification' },
    { key: 'institution', header: 'Issuing Organization' },
    { key: 'expiry', header: 'Expiry Date', render: (q) => q.expiryDate ? dayjs(q.expiryDate).format('MMM D, YYYY') : '—' },
    { key: 'status', header: 'Status', render: (q) => (
      <span className={q.status === 'EXPIRING' ? 'text-warning font-medium' : q.status === 'VALID' ? 'text-success' : 'text-destructive'}>{q.status}</span>
    )},
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Certifications' }]} title="Certifications" description="Professional certifications with expiry alerts" />
      <PersonnelSubNav />
      <Card><CardContent className="pt-6">
        <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={certs as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
      </CardContent></Card>
    </div>
  );
}

import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useGetCertificationsQuery } from '../api/training.api';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { Certification } from '../constants/training-data';

export function CertificationsPage() {
  const { data: certifications = [], isLoading } = useGetCertificationsQuery();

  const columns: DataTableColumn<Certification>[] = [
    { key: 'num', header: 'Certificate #', render: (r) => <code className="text-xs">{r.certificateNumber}</code> },
    { key: 'course', header: 'Course' },
    { key: 'recipient', header: 'Recipient', render: (r) => <span className="font-medium">{r.recipient}</span> },
    { key: 'issue', header: 'Issue Date', render: (r) => dayjs(r.issueDate).format('MMM D, YYYY') },
    { key: 'expiry', header: 'Expiry', render: (r) => r.expiryDate ? dayjs(r.expiryDate).format('MMM D, YYYY') : '—' },
    { key: 'status', header: 'Status', render: (r) => <TrainingStatusBadge status={r.status} /> },
    { key: 'actions', header: 'Actions', render: () => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast('Downloading...')}>Download</Button>
        <Button variant="ghost" size="sm" onClick={() => toast('Certificate verified')}>Verify</Button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Certifications' }]} title="Certifications" description="Training certificates — issuance, renewal, and verification" />
      <TrainingSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={certifications as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

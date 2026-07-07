import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useGetPendingMedicalApprovalsQuery } from '../api/medical.api';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { MedicalStatusBadge } from '../components/MedicalStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { MedicalApproval } from '../constants/medical-data';

export function MedicalApprovalCenterPage() {
  const { data: queue = [], isLoading } = useGetPendingMedicalApprovalsQuery();

  const columns: DataTableColumn<MedicalApproval>[] = [
    { key: 'emp', header: 'Personnel', render: (r) => <span className="font-medium">{r.personnelName}</span> },
    { key: 'request', header: 'Request' },
    { key: 'status', header: 'Status', render: (r) => <MedicalStatusBadge status={r.status} /> },
    { key: 'reviewer', header: 'Reviewer' },
    { key: 'submitted', header: 'Submitted', render: (r) => dayjs(r.submittedAt).format('MMM D, YYYY') },
    { key: 'actions', header: 'Actions', render: (r) => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast(`Approved ${r.request}`)}>Approve</Button>
        <Button variant="ghost" size="sm" onClick={() => toast(`Rejected ${r.request}`)}>Reject</Button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Approvals' }]} title="Approval Center" description="Medical clearances, fitness certifications, and special assessments" />
      <MedicalSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={queue as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

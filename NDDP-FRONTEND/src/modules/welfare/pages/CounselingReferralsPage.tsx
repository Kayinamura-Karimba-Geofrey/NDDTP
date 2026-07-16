import dayjs from 'dayjs';
import { WelfareSubNav } from '../components/WelfareSubNav';
import { WelfareStatusBadge } from '../components/WelfareStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MOCK_COUNSELING, type CounselingReferral } from '../constants/welfare-data';

export function CounselingReferralsPage() {
  const columns: DataTableColumn<CounselingReferral>[] = [
    { key: 'emp', header: 'Employee', render: (r) => <span className="font-medium">{r.employeeName}</span> },
    { key: 'date', header: 'Referral Date', render: (r) => dayjs(r.referralDate).format('MMM D, YYYY') },
    { key: 'counselor', header: 'Counselor' },
    { key: 'status', header: 'Status', render: (r) => <WelfareStatusBadge status={r.status} /> },
    { key: 'next', header: 'Next Appointment', render: (r) => r.nextAppointment ? dayjs(r.nextAppointment).format('MMM D, YYYY') : '—' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'Counseling' }]} title="Counseling Referrals" description="Confidential counseling referrals — access restricted to authorized personnel" />
      <WelfareSubNav />
      <Card className="mb-4 border-warning/30 bg-warning/5">
        <CardContent className="pt-4 text-sm text-muted-foreground">Counseling information is restricted. Only authorized welfare officers and assigned counselors can view full session details.</CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_COUNSELING as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

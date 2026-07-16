import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { MedicalStatusBadge } from '../components/MedicalStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_REFERRALS, type MedicalReferral } from '../constants/medical-data';
import { CreateReferralModal } from '../components/CreateReferralModal';

export function MedicalReferralsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns: DataTableColumn<MedicalReferral>[] = [
    { key: 'num', header: 'Referral #', render: (r) => <code className="text-xs">{r.referralNumber}</code> },
    { key: 'emp', header: 'Personnel', render: (r) => <span className="font-medium">{r.personnelName}</span> },
    { key: 'reason', header: 'Reason' },
    { key: 'facility', header: 'Receiving Facility' },
    { key: 'appt', header: 'Appointment', render: (r) => r.appointmentDate ? dayjs(r.appointmentDate).format('MMM D, YYYY') : '—' },
    { key: 'status', header: 'Status', render: (r) => <MedicalStatusBadge status={r.status} /> },
    { key: 'outcome', header: 'Outcome', render: (r) => r.outcome ?? '—' },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Referrals' }]} title="Medical Referrals" description="Specialist referrals and outcomes" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Referral</Button>} />
      <MedicalSubNav />
      <Card className="mb-4">
        <CardContent className="pt-4">
          <p className="mb-2 text-sm font-medium">Referral Workflow</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {['Assessment', 'Referral', 'Appointment', 'Outcome', 'Close'].map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">{step}</span>
                {i < 4 && <span>↓</span>}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_REFERRALS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>

      <CreateReferralModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

import toast from 'react-hot-toast';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { INTERVIEW_PANEL } from '../constants/recruitment-data';

export function InterviewPanelPage() {
  const columns: DataTableColumn<(typeof INTERVIEW_PANEL)[number]>[] = [
    { key: 'name', header: 'Panel Member', render: (p) => <span className="font-medium">{p.name}</span> },
    { key: 'role', header: 'Role' },
    { key: 'dept', header: 'Department', render: (p) => p.department },
    { key: 'avail', header: 'Availability', render: (p) => <span className={p.availability.includes('Conflict') ? 'text-warning' : 'text-success'}>{p.availability}</span> },
    { key: 'actions', header: 'Actions', render: () => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast('Assigned')}>Assign</Button>
        <Button variant="ghost" size="sm" onClick={() => toast('Notified')}>Notify</Button>
      </div>
    )},
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Interview Panel' }]} title="Interview Panel" description="Manage panel members, availability, and conflict checks" />
      <RecruitmentSubNav />
      <Card><CardContent className="pt-6">
        <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={INTERVIEW_PANEL as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
      </CardContent></Card>
    </div>
  );
}

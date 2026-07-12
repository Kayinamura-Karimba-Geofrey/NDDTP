import { useState } from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { RecruitmentStatusBadge } from '../components/RecruitmentStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_WORKFORCE_REQUESTS, type WorkforceRequest } from '../constants/recruitment-data';
import { CreateWorkforceRequestModal } from '../components/CreateWorkforceRequestModal';

export function WorkforceRequestsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<WorkforceRequest>[] = [
    { key: 'num', header: 'Request #', render: (r) => <code className="text-xs">{r.requestNumber}</code> },
    { key: 'dept', header: 'Department', render: (r) => r.department },
    { key: 'pos', header: 'Position', render: (r) => <span className="font-medium">{r.position}</span> },
    { key: 'qty', header: 'Required', render: (r) => r.numberRequired },
    { key: 'priority', header: 'Priority', render: (r) => <span className={r.priority === 'URGENT' ? 'text-destructive font-medium' : ''}>{r.priority}</span> },
    { key: 'by', header: 'Requested By', render: (r) => r.requestedBy },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.requestedDate).format('MMM D, YYYY') },
    { key: 'status', header: 'Status', render: (r) => <RecruitmentStatusBadge status={r.status} /> },
    { key: 'actions', header: 'Actions', render: () => <Button variant="ghost" size="sm" onClick={() => toast('View workflow functionality coming soon')}>Workflow</Button> },
  ];

  return (
    <div>
      <PageHeader 
        breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Workforce Requests' }]} 
        title="Workforce Requests" 
        description="Department staffing requests before recruitment begins" 
        actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Request</Button>} 
      />
      <RecruitmentSubNav />
      <Card className="mb-4"><CardContent className="pt-4 text-sm text-muted-foreground">Workflow: Department → Manager Approval → HR Approval → Recruitment Team → Job Requisition</CardContent></Card>
      <Card><CardContent className="pt-6">
        <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_WORKFORCE_REQUESTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
      </CardContent></Card>

      <CreateWorkforceRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

import { useState } from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { RecruitmentStatusBadge } from '../components/RecruitmentStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { type JobRequisition } from '../constants/recruitment-data';
import { useGetRequisitionsQuery } from '../api/recruitment.api';
import { CreateRequisitionModal } from '../components/CreateRequisitionModal';

export function JobRequisitionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: requisitions = [], isLoading } = useGetRequisitionsQuery();

  const columns: DataTableColumn<JobRequisition>[] = [
    { key: 'num', header: 'Requisition #', render: (r) => <code className="text-xs">{r.requisitionNumber}</code> },
    { key: 'dept', header: 'Department' },
    { key: 'pos', header: 'Position', render: (r) => <span className="font-medium">{r.position}</span> },
    { key: 'type', header: 'Employment Type' },
    { key: 'vac', header: 'Vacancies', render: (r) => r.vacancies },
    { key: 'manager', header: 'Hiring Manager', render: (r) => r.hiringManager },
    { key: 'start', header: 'Expected Start', render: (r) => dayjs(r.expectedStartDate).format('MMM D, YYYY') },
    { key: 'budget', header: 'Budget', render: (r) => r.budgetApproved ? <span className="text-success">Approved</span> : <span className="text-warning">Pending</span> },
    { key: 'status', header: 'Status', render: (r) => <RecruitmentStatusBadge status={r.status} /> },
    { key: 'actions', header: 'Actions', render: (r) => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast('Edit functionality coming soon')}>Edit</Button>
        {r.status === 'APPROVED' && <Button variant="ghost" size="sm" onClick={() => toast('Navigate to Create Vacancy')}>Create Vacancy</Button>}
      </div>
    )},
  ];

  return (
    <div>
      <PageHeader 
        breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Job Requisitions' }]} 
        title="Job Requisitions" 
        description="Convert approved workforce requests into formal recruitment requests" 
        actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Requisition</Button>} 
      />
      <RecruitmentSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={requisitions as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      
      <CreateRequisitionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetVacanciesQuery, usePublishVacancyMutation } from '../api/recruitment.api';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { RecruitmentStatusBadge } from '../components/RecruitmentStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { HasAccess } from '@/components/ui/HasAccess';
import { usePermissions } from '@/hooks/usePermissions';
import type { Vacancy } from '../constants/recruitment-data';
import { CreateVacancyModal } from '../components/CreateVacancyModal';

export function VacancyManagementPage() {
  const { hasRole } = usePermissions();
  const [statusFilter, setStatusFilter] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<any>(undefined);

  const { data, isLoading } = useGetVacanciesQuery({ page: 1, limit: 50, status: statusFilter || undefined });
  const [publishVacancy] = usePublishVacancyMutation();

  const canManage = hasRole(['SUPER_ADMIN', 'ADMIN', 'RECRUITER']);

  const handleDuplicate = (v: Vacancy) => {
    setModalInitialData({
      jobTitle: v.jobTitle + ' (Copy)',
      department: v.department,
      location: v.location,
      employmentType: v.employmentType,
      closingDate: dayjs().add(30, 'day').format('YYYY-MM-DD'),
      description: 'Copied from ' + v.vacancyNumber,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (v: Vacancy) => {
    toast('Edit functionality coming soon');
  };

  const columns: DataTableColumn<Vacancy>[] = [
    { key: 'num', header: 'Vacancy #', render: (v) => <code className="text-xs">{v.vacancyNumber}</code> },
    { key: 'title', header: 'Job Title', render: (v) => <span className="font-medium">{v.jobTitle}</span> },
    { key: 'dept', header: 'Department' },
    { key: 'loc', header: 'Location' },
    { key: 'type', header: 'Employment Type' },
    { key: 'open', header: 'Open Date', render: (v) => dayjs(v.openDate).format('MMM D, YYYY') },
    { key: 'close', header: 'Closing Date', render: (v) => dayjs(v.closingDate).format('MMM D, YYYY') },
    { key: 'apps', header: 'Applications', render: (v) => v.applicationsReceived },
    { key: 'status', header: 'Status', render: (v) => <RecruitmentStatusBadge status={v.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (v) => (
        <div className="flex flex-wrap gap-1">
          <Link to="/recruitment/applications"><Button variant="ghost" size="sm">Applicants</Button></Link>
          {canManage && (
            <>
              <Button variant="ghost" size="sm" onClick={() => handleEdit(v)}>Edit</Button>
              {v.status === 'DRAFT' && <Button variant="ghost" size="sm" onClick={() => handlePublish(v.id)}>Publish</Button>}
              <Button variant="ghost" size="sm" onClick={() => handleDuplicate(v)}>Duplicate</Button>
            </>
          )}
        </div>
      ),
    },
  ];

  const handlePublish = async (id: string) => {
    try {
      await publishVacancy(id).unwrap();
      toast.success('Vacancy published successfully');
    } catch (err) {
      toast.error('Failed to publish vacancy');
    }
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Vacancy Management' }]}
        title="Vacancy Management"
        description="Central page for all open and closed vacancies"
        actions={
          <HasAccess roles={['SUPER_ADMIN', 'ADMIN', 'RECRUITER']}>
            <Button onClick={() => { setModalInitialData(undefined); setIsModalOpen(true); }}>
              <FiPlus className="h-4 w-4" /> Create Vacancy
            </Button>
          </HasAccess>
        }
      />
      <RecruitmentSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {['', 'OPEN', 'IN_PROGRESS', 'CLOSED', 'DRAFT'].map((s) => (
              <button key={s || 'all'} type="button" onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-medium ${statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{s ? s.replace('_', ' ') : 'All'}</button>
            ))}
          </div>
          {isLoading ? <div className="data-table-empty">Loading vacancies...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={(data?.data ?? []) as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>

      <CreateVacancyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={modalInitialData}
      />
    </div>
  );
}

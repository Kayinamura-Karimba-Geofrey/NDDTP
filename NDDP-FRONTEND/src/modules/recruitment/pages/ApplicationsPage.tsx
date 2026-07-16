import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useGetApplicationsQuery } from '../api/recruitment.api';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { RecruitmentStatusBadge } from '../components/RecruitmentStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import type { Application } from '../constants/recruitment-data';

export function ApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading } = useGetApplicationsQuery({ page: 1, limit: 50, status: statusFilter || undefined });

  const columns: DataTableColumn<Application>[] = [
    { key: 'num', header: 'Application #', render: (a) => <code className="text-xs">{a.applicationNumber}</code> },
    { key: 'name', header: 'Candidate', render: (a) => <span className="font-medium">{a.candidateName}</span> },
    { key: 'pos', header: 'Position' },
    { key: 'dept', header: 'Department' },
    { key: 'date', header: 'Applied', render: (a) => dayjs(a.applicationDate).format('MMM D, YYYY') },
    { key: 'status', header: 'Status', render: (a) => <RecruitmentStatusBadge status={a.status} /> },
    { key: 'recruiter', header: 'Recruiter', render: (a) => a.recruiter ?? '—' },
    { key: 'interview', header: 'Interview', render: (a) => a.interviewStatus ?? '—' },
    { key: 'decision', header: 'Decision', render: (a) => a.finalDecision ?? '—' },
    { key: 'actions', header: 'Actions', render: (a) => <Link to={`/recruitment/candidates/${a.candidateId}`}><span className="text-sm text-primary hover:underline">View</span></Link> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Applications' }]} title="Applications" description="Main application management screen" />
      <RecruitmentSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {['', 'SUBMITTED', 'SCREENING', 'SHORTLISTED', 'INTERVIEW', 'OFFERED', 'HIRED', 'REJECTED'].map((s) => (
              <button key={s || 'all'} type="button" onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-medium ${statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{s || 'All'}</button>
            ))}
          </div>
          {isLoading ? <div className="data-table-empty">Loading applications...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={(data?.data ?? []) as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

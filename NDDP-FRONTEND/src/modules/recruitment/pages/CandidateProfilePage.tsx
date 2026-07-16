import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Avatar } from '@/components/ui';
import { PageHeader } from '@/components/shared/PageHeader';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { RecruitmentStatusBadge } from '../components/RecruitmentStatusBadge';
import { Card, CardContent } from '@/components/ui';
import { useGetCandidatesQuery, useGetApplicationsQuery } from '../api/recruitment.api';

const TABS = ['Overview', 'Education', 'Experience', 'Skills', 'Documents', 'Applications', 'Assessments', 'Interviews', 'References', 'Background', 'Offer', 'Notes', 'Timeline'] as const;

export function CandidateProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: candidates = [] } = useGetCandidatesQuery();
  const { data: appsData } = useGetApplicationsQuery({ limit: 100 });
  
  const candidate = candidates.find((c) => c.id === id) ?? candidates[0] ?? { firstName: 'Unknown', lastName: '', email: '', source: '' };
  const applications = (appsData?.data || []).filter((a) => a.candidateId === candidate.id);
  const [tab, setTab] = useState<(typeof TABS)[number]>('Overview');

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Applications', path: '/recruitment/applications' }, { label: `${candidate.firstName} ${candidate.lastName}` }]} title="Candidate Profile" />
      <RecruitmentSubNav />
      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center">
        <Avatar name={`${candidate.firstName} ${candidate.lastName}`} size="lg" />
        <div>
          <h2 className="text-xl font-bold">{candidate.firstName} {candidate.lastName}</h2>
          <p className="text-sm text-muted-foreground">{candidate.email} · Source: {candidate.source}</p>
          {applications[0] && (
            <div className="mt-2 flex flex-wrap gap-2">
              <RecruitmentStatusBadge status={applications[0].status} />
              <span className="text-sm text-muted-foreground">Applied for: {applications[0].position}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={`shrink-0 border-b-2 px-3 py-2 text-xs font-medium sm:text-sm ${tab === t ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground'}`}>{t}</button>
        ))}
      </div>
      <Card className="mt-4">
        <CardContent className="pt-6">
          {tab === 'Overview' && (
            <dl className="grid gap-4 sm:grid-cols-2">
              <div><dt className="text-sm text-muted-foreground">Email</dt><dd>{candidate.email}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Phone</dt><dd>{candidate.phone ?? '—'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Source</dt><dd>{candidate.source}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Current Stage</dt><dd>{applications[0]?.status ?? '—'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Recruiter</dt><dd>{applications[0]?.recruiter ?? '—'}</dd></div>
            </dl>
          )}
          {tab === 'Applications' && (
            <ul className="space-y-2">{applications.map((a) => (
              <li key={a.id} className="flex justify-between border-b border-border pb-2">
                <span>{a.position} — {a.applicationNumber}</span>
                <RecruitmentStatusBadge status={a.status} />
              </li>
            ))}</ul>
          )}
          {tab === 'Documents' && <p className="text-sm text-muted-foreground"><Link to="/recruitment/resumes" className="underline">Manage resumes</Link></p>}
          {tab === 'Assessments' && <p className="text-sm text-muted-foreground"><Link to="/recruitment/assessments" className="underline">View assessments</Link></p>}
          {tab === 'Interviews' && <p className="text-sm text-muted-foreground"><Link to="/recruitment/interviews" className="underline">View interviews</Link></p>}
          {tab === 'Background' && <p className="text-sm text-muted-foreground"><Link to="/recruitment/background-verification" className="underline">Background verification</Link></p>}
          {tab === 'Offer' && <p className="text-sm text-muted-foreground"><Link to="/recruitment/offers" className="underline">Offer management</Link></p>}
          {tab === 'Timeline' && <p className="text-sm text-muted-foreground">Applied {applications[0] ? dayjs(applications[0].applicationDate).format('MMM D, YYYY') : '—'}</p>}
          {!['Overview', 'Applications', 'Documents', 'Assessments', 'Interviews', 'Background', 'Offer', 'Timeline'].includes(tab) && (
            <p className="text-sm text-muted-foreground">{tab} information will appear here.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

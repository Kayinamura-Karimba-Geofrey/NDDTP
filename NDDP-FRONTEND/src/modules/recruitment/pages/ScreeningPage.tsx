import toast from 'react-hot-toast';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetApplicationsQuery, useUpdateApplicationStatusMutation } from '../api/recruitment.api';

const CHECKLIST = ['Minimum Qualifications', 'Experience', 'Required Skills', 'Documents Complete', 'Eligibility'];

export function ScreeningPage() {
  const { data: appsData, isLoading } = useGetApplicationsQuery({ limit: 100 });
  const [updateStatus] = useUpdateApplicationStatusMutation();
  const pending = (appsData?.data || []).filter((a) => a.status === 'SCREENING' || a.status === 'SUBMITTED');

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Screening' }]} title="Screening" description="Evaluate applications against requirements" />
      <RecruitmentSubNav />
      <div className="grid gap-6 md:grid-cols-2">
        {isLoading ? <div className="col-span-2 text-center p-8 text-muted-foreground">Loading applications...</div> : pending.map((app) => (
          <Card key={app.id}>
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-between">
                <div><p className="font-medium">{app.candidateName}</p><p className="text-sm text-muted-foreground">{app.position} · {app.applicationNumber}</p></div>
              </div>
              <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {CHECKLIST.map((item) => (
                  <label key={item} className="flex items-center gap-2 text-sm"><input type="checkbox" /> {item}</label>
                ))}
              </div>
              <textarea className="mb-3 w-full rounded-lg border border-border p-2 text-sm" rows={2} placeholder="Comments..." />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => updateStatus({ id: app.id, status: 'REJECTED' })}>Reject</Button>
                <Button size="sm" onClick={() => updateStatus({ id: app.id, status: 'SHORTLISTED' })}>Shortlist</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

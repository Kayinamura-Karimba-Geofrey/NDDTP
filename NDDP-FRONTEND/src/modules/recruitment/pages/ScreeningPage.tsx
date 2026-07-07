import toast from 'react-hot-toast';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_APPLICATIONS } from '../constants/recruitment-data';

const CHECKLIST = ['Minimum Qualifications', 'Experience', 'Required Skills', 'Documents Complete', 'Eligibility'];

export function ScreeningPage() {
  const pending = MOCK_APPLICATIONS.filter((a) => a.status === 'SCREENING' || a.status === 'SUBMITTED');

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Screening' }]} title="Screening" description="Evaluate applications against requirements" />
      <RecruitmentSubNav />
      <div className="space-y-4">
        {pending.map((app) => (
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
                <Button size="sm" onClick={() => toast.success('Passed')}>Pass</Button>
                <Button size="sm" variant="outline" onClick={() => toast('Pending')}>Pending</Button>
                <Button size="sm" variant="danger" onClick={() => toast.error('Failed')}>Fail</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

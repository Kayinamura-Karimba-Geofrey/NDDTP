import { Link } from 'react-router-dom';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_VACANCIES } from '../constants/recruitment-data';

export function CandidatePortalPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Candidate Portal' }]} title="Candidate Portal" description="Public-facing portal configuration and preview" />
      <RecruitmentSubNav />
      <Card className="mb-6"><CardContent className="pt-6">
        <p className="mb-4 text-sm text-muted-foreground">Features: Browse vacancies · Search & filter · Candidate registration · Login · Profile management · Resume upload · Application tracking · Notifications · Saved jobs</p>
        <Link to="/recruitment/vacancies"><Button variant="outline">View Published Vacancies (Admin)</Button></Link>
      </CardContent></Card>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_VACANCIES.filter((v) => v.status === 'OPEN').map((v) => (
          <Card key={v.id}>
            <CardContent className="pt-6">
              <h3 className="font-semibold">{v.jobTitle}</h3>
              <p className="text-sm text-muted-foreground">{v.department} · {v.location}</p>
              <p className="mt-2 text-xs text-muted-foreground">{v.employmentType}</p>
              <Button className="mt-4" size="sm" variant="outline">Apply</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

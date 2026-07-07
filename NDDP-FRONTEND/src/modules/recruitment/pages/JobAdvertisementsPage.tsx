import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MOCK_VACANCIES } from '../constants/recruitment-data';

export function JobAdvertisementsPage() {
  const vacancy = MOCK_VACANCIES[0];
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Job Advertisements' }]} title="Job Advertisements" description="Manage public and internal job postings" actions={<Button onClick={() => toast('Publish')}>Publish Advertisement</Button>} />
      <RecruitmentSubNav />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Advertisement Content</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div><p className="font-medium text-muted-foreground">Job Title</p><p className="text-lg font-bold">{vacancy.jobTitle}</p></div>
            <div><p className="font-medium text-muted-foreground">Department</p><p>{vacancy.department}</p></div>
            <div><p className="font-medium text-muted-foreground">Location</p><p>{vacancy.location}</p></div>
            <div><p className="font-medium text-muted-foreground">Application Deadline</p><p>{dayjs(vacancy.closingDate).format('MMMM D, YYYY')}</p></div>
            <div><p className="font-medium text-muted-foreground">Responsibilities</p><p className="text-muted-foreground">Design and develop enterprise software solutions. Collaborate with cross-functional teams. Maintain code quality and documentation.</p></div>
            <div><p className="font-medium text-muted-foreground">Requirements</p><p className="text-muted-foreground">BSc in Computer Science or equivalent. 3+ years experience. Strong knowledge of modern web technologies.</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Preview</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => toast('Desktop preview')}>Desktop</Button>
              <Button variant="outline" size="sm" onClick={() => toast('Mobile preview')}>Mobile</Button>
              <Button variant="outline" size="sm" onClick={() => window.print()}>Print</Button>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-bold">{vacancy.jobTitle}</h3>
              <p className="text-sm text-muted-foreground">{vacancy.department} · {vacancy.location} · {vacancy.employmentType}</p>
              <p className="mt-3 text-sm">Join the Ministry of Defence digital transformation team...</p>
              <Button className="mt-4" size="sm">Apply Now</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

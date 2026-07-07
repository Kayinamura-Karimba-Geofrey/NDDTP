import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  { id: 'r1', name: 'Vacancy Report', description: 'Open and closed vacancies by department' },
  { id: 'r2', name: 'Recruitment Pipeline', description: 'Funnel conversion at each stage' },
  { id: 'r3', name: 'Time to Hire', description: 'Average days from application to hire' },
  { id: 'r4', name: 'Time to Fill', description: 'Days from requisition to offer acceptance' },
  { id: 'r5', name: 'Source of Hire', description: 'Candidate source effectiveness' },
  { id: 'r6', name: 'Offer Acceptance Rate', description: 'Offers accepted vs declined' },
  { id: 'r7', name: 'Candidate Conversion Rate', description: 'Application to hire conversion' },
  { id: 'r8', name: 'Interview Outcomes', description: 'Evaluation results summary' },
];

export function RecruitmentReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Reports' }]} title="Reports & Analytics" description="Generate recruitment reports and analytics" />
      <RecruitmentSubNav />
      <div className="grid gap-4 sm:grid-cols-2">
        {REPORTS.map((report) => (
          <Card key={report.id}>
            <CardContent className="flex items-start justify-between pt-6">
              <div><p className="font-medium">{report.name}</p><p className="mt-1 text-sm text-muted-foreground">{report.description}</p></div>
              <div className="flex shrink-0 gap-1">
                <Button variant="outline" size="sm" onClick={() => toast('Generating PDF...')}>PDF</Button>
                <Button variant="ghost" size="sm" onClick={() => toast.success('Exporting...')}><FiDownload className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

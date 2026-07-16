import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  { id: 'r1', name: 'Personnel by Department', description: 'Headcount breakdown by department' },
  { id: 'r2', name: 'Personnel by Employment Type', description: 'Permanent, contract, temporary, internship' },
  { id: 'r3', name: 'Retirement Forecast', description: 'Projected retirements over 5 years' },
  { id: 'r4', name: 'Skills Inventory', description: 'Workforce skills catalogue report' },
  { id: 'r5', name: 'Certification Expiry', description: 'Credentials expiring within 90 days' },
  { id: 'r6', name: 'Headcount Trends', description: 'Monthly personnel growth analysis' },
  { id: 'r7', name: 'Vacancy Report', description: 'Unfilled positions by department' },
  { id: 'r8', name: 'Years of Service Report', description: 'Service length distribution' },
];

export function PersonnelReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Reports' }]} title="Personnel Reports" description="Generate and export HR analytics reports" />
      <PersonnelSubNav />
      <div className="grid gap-4 sm:grid-cols-2">
        {REPORTS.map((report) => (
          <Card key={report.id}>
            <CardContent className="flex items-start justify-between pt-6">
              <div>
                <p className="font-medium">{report.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{report.description}</p>
              </div>
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

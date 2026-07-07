import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Medical Clearance Report',
  'Assessment Report',
  'Appointment Report',
  'Occupational Health Report',
  'Referral Report',
  'Vaccination Report',
  'Health Campaign Participation',
  'Medical Fitness Summary',
];

export function MedicalReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Reports' }]} title="Medical Reports" description="Generate and export operational health reports" />
      <MedicalSubNav />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REPORTS.map((report) => (
          <Card key={report}>
            <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium">{report}</p>
              <div className="flex flex-wrap gap-1">
                {(['PDF', 'Excel', 'CSV'] as const).map((fmt) => (
                  <Button key={fmt} variant="outline" size="sm" onClick={() => toast(`Exporting ${report} as ${fmt}`)}><FiDownload className="h-3 w-3" /> {fmt}</Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

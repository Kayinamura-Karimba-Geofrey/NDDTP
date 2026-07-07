import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Training Participation Report',
  'Course Completion Report',
  'Certification Report',
  'Instructor Performance Report',
  'Attendance Report',
  'Competency Matrix',
  'Skill Gap Analysis',
  'Department Training Report',
  'Training Calendar Report',
  'Learning Progress Report',
];

export function TrainingReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Reports' }]} title="Reports & Analytics" description="Generate and export training reports" />
      <TrainingSubNav />
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

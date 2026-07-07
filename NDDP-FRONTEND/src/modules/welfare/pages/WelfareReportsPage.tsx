import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { WelfareSubNav } from '../components/WelfareSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Welfare Program Participation',
  'Benefit Utilization',
  'Assistance Request Summary',
  'Emergency Support Report',
  'Counseling Activity Report',
  'Event Participation',
  'Department Engagement',
  'Budget Utilization',
  'Welfare Trends',
];

export function WelfareReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'Reports' }]} title="Reports & Analytics" description="Generate and export welfare reports" />
      <WelfareSubNav />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REPORTS.map((report) => (
          <Card key={report}>
            <CardContent className="flex items-center justify-between pt-6">
              <p className="text-sm font-medium">{report}</p>
              <div className="flex gap-1">
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

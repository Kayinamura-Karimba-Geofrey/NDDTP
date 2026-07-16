import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Department Performance Report', 'Individual Performance Report', 'KPI Achievement Report',
  'Goal Completion Report', 'Competency Analysis', 'Performance Distribution',
  'Recognition Report', 'Development Plan Progress', 'Review Completion Report', 'Performance Trend Report',
];

export function PerformanceReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Reports' }]} title="Performance Reports" description="Operational and executive performance analytics" />
      <PerformanceSubNav />
      <Card>
        <CardContent className="grid gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {REPORTS.map((report) => (
            <div key={report} className="flex items-center justify-between rounded-lg border border-border p-4">
              <span className="text-sm font-medium">{report}</span>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" onClick={() => toast(`Export ${report} — PDF`)}>PDF</Button>
                <Button size="sm" variant="outline" onClick={() => toast(`Export ${report} — Excel`)}><FiDownload className="h-3 w-3" /></Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

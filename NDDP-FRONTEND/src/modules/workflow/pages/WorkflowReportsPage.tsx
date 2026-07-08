import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Workflow Performance Report',
  'SLA Compliance Report',
  'Approval Duration Report',
  'Escalation Report',
  'Rejection Report',
  'Department Workflow Report',
  'Automation Statistics',
  'Pending Tasks Report',
];

export function WorkflowReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'Reports' }]} title="Workflow Reports" description="Performance, SLA, escalation, and department analytics" />
      <WorkflowSubNav />
      <Card>
        <CardContent className="grid gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {REPORTS.map((report) => (
            <div key={report} className="flex items-center justify-between rounded-lg border border-border p-4">
              <span className="text-sm font-medium">{report}</span>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" onClick={() => toast(`Export ${report} — PDF`)}>PDF</Button>
                <Button size="sm" variant="outline" onClick={() => toast(`Export ${report} — Excel`)}><FiDownload className="h-3 w-3" /></Button>
                <Button size="sm" variant="outline" onClick={() => toast(`Export ${report} — CSV`)}>CSV</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

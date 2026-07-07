import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { LeaveSubNav } from '../components/LeaveSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  { id: 'r1', name: 'Leave Balance Report', description: 'Current balances by employee and type' },
  { id: 'r2', name: 'Leave Utilization Report', description: 'Usage vs entitlement analysis' },
  { id: 'r3', name: 'Department Leave Report', description: 'Leave by department comparison' },
  { id: 'r4', name: 'Leave Trends', description: 'Historical usage patterns' },
  { id: 'r5', name: 'Leave Forecast', description: 'Projected leave usage' },
  { id: 'r6', name: 'Low Balance Alert', description: 'Employees with low remaining leave' },
  { id: 'r7', name: 'High Usage Report', description: 'Employees with high leave consumption' },
  { id: 'r8', name: 'Approval Performance', description: 'Approval turnaround metrics' },
  { id: 'r9', name: 'Leave by Type', description: 'Breakdown by leave category' },
  { id: 'r10', name: 'Calendar Export', description: 'Export leave calendar data' },
];

export function LeaveReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Reports' }]} title="Reports & Analytics" description="Generate leave reports and analytics" />
      <LeaveSubNav />
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

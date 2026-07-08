import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Open Work Orders Report',
  'Overdue Maintenance Report',
  'Preventive Compliance Report',
  'Technician Workload Report',
  'Parts Consumption Report',
  'Emergency Response Report',
  'SLA Compliance Report',
  'Asset Downtime Report',
];

export function MaintenanceReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'Reports' }]} title="Maintenance Reports" description="Work orders, SLA, preventive compliance, parts, and downtime exports" />
      <MaintenanceSubNav />
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

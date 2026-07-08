import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { FleetSubNav } from '../components/FleetSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Fleet Utilization Report',
  'Vehicle Assignment Report',
  'Driver Activity Report',
  'Fuel Consumption Report',
  'Maintenance Report',
  'Inspection Compliance Report',
  'Accident & Incident Report',
  'Vehicle Downtime Report',
  'Trip History Report',
  'Fleet Cost Analysis',
];

export function FleetReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Reports' }]} title="Fleet Reports" description="Operational and cost analytics for the fleet" />
      <FleetSubNav />
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

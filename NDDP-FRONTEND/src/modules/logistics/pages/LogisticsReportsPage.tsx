import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { LogisticsSubNav } from '../components/LogisticsSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Active Shipments Report',
  'Delayed Shipments Report',
  'On-Time Delivery Report',
  'Route Utilization Report',
  'Location Throughput Report',
  'Transport Mode Mix Report',
  'Critical Priority Movements',
  'Monthly Dispatch Summary',
];

export function LogisticsReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Logistics', path: '/logistics/dashboard' }, { label: 'Reports' }]} title="Logistics Reports" description="Shipments, delays, routes, and throughput exports" />
      <LogisticsSubNav />
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

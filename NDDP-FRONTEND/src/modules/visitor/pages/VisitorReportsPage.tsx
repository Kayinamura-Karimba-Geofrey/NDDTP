import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { VisitorSubNav } from '../components/VisitorSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Daily Visitor Throughput Report',
  'On-Site Occupancy Report',
  'Pending Approvals Report',
  'Site Utilization Report',
  'Blacklist Activity Report',
  'Badge Issuance Report',
  'Host Visit Load Report',
  'Check-In / Check-Out Audit Report',
];

export function VisitorReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Visitors', path: '/visitors/dashboard' }, { label: 'Reports' }]} title="Visitor Reports" description="Throughput, occupancy, approvals, sites, badges, and audit exports" />
      <VisitorSubNav />
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

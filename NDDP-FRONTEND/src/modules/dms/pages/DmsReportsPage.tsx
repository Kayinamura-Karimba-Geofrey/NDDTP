import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { DmsSubNav } from '../components/DmsSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Document Activity Report',
  'Approval Performance Report',
  'Signature Completion Report',
  'Retention Compliance Report',
  'Archive Growth Report',
  'Most Accessed Documents',
  'Department Usage Report',
  'Security Access Report',
  'Storage Usage Report',
  'Expired Access Links',
];

export function DmsReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Reports' }]} title="Reports & Analytics" description="Document activity, compliance, and usage analytics" />
      <DmsSubNav />
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

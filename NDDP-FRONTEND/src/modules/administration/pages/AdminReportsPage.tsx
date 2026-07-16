import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import { AdminSubNav } from '../components/AdminSubNav';

const REPORTS = [
  'Namespace Inventory Report',
  'Active Configuration Export',
  'Draft Entries Pending Activation',
  'Deprecated Keys Report',
  'Revision Audit Trail',
  'Environment Scope Matrix',
  'Service Health Snapshot',
  'Configuration Change Weekly Digest',
];

export function AdminReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'System Admin', path: '/administration/dashboard' }, { label: 'Reports' }]} title="Administration Reports" description="Configuration inventory, revisions, and health exports" />
      <AdminSubNav />
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

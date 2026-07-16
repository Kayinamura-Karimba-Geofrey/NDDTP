import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { AuditSubNav } from '../components/AuditSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'User Activity Report',
  'Audit Trail Report',
  'Security Event Report',
  'Compliance Status Report',
  'API Usage Report',
  'Performance Report',
  'Incident Report',
  'Error Summary Report',
  'Infrastructure Health Report',
];

export function AuditModuleReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'Reports' }]} title="Audit & Compliance Reports" description="Activity, security, compliance, API usage, performance, incident, and infrastructure reports" />
      <AuditSubNav />
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

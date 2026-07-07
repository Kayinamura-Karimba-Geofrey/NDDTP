import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

export function BulkExportPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Bulk Export' }]} title="Bulk Export" description="Export personnel data with optional filters" />
      <PersonnelSubNav />
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm"><span className="font-medium">Department</span><select className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"><option>All Departments</option></select></label>
            <label className="text-sm"><span className="font-medium">Employment Type</span><select className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"><option>All Types</option></select></label>
            <label className="text-sm"><span className="font-medium">Status</span><select className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"><option>All Statuses</option></select></label>
            <label className="text-sm"><span className="font-medium">Format</span><select className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"><option>Excel (.xlsx)</option><option>CSV</option><option>PDF</option></select></label>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => toast.success('Export started')}><FiDownload className="h-4 w-4" /> Export</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

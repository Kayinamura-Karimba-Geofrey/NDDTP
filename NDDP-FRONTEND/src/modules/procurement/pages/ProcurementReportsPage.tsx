import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Procurement Spend',
  'Supplier Performance',
  'Purchase Order Report',
  'Procurement Cycle Time',
  'Tender Report',
  'Contract Expiry Report',
  'Procurement by Department',
  'RFQ Report',
  'Bid Evaluation Summary',
  'Vendor Registration Report',
];

export function ProcurementReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Reports' }]} title="Procurement Reports" description="Operational and executive procurement reports" />
      <ProcurementSubNav />
      <Card>
        <CardContent className="grid gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {REPORTS.map((report) => (
            <div key={report} className="flex items-center justify-between rounded-lg border border-border p-4">
              <span className="text-sm font-medium">{report}</span>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" onClick={() => toast(`Export ${report} — PDF`)}>PDF</Button>
                <Button size="sm" variant="outline" onClick={() => toast(`Export ${report} — Excel`)}><FiDownload className="h-3 w-3" /></Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Budget Report',
  'Budget Utilization Report',
  'Department Expenditure',
  'Cost Center Report',
  'Outstanding Commitments',
  'Invoice Aging Report',
  'Payment Report',
  'Financial Variance Report',
  'Cash Flow Summary',
  'Annual Financial Summary',
];

export function FinanceReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Reports' }]} title="Financial Reports" description="Executive and operational financial reports" />
      <FinanceSubNav />
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

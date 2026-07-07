import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { InventorySubNav } from '../components/InventorySubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Stock Balance Report',
  'Low Stock Report',
  'Out-of-Stock Report',
  'Goods Receipt Report',
  'Goods Issue Report',
  'Warehouse Transfer Report',
  'Inventory Valuation Report',
  'Expiry Report',
  'Slow-Moving Items',
  'Fast-Moving Items',
  'Stock Adjustment Report',
  'Stock Count Variance Report',
];

export function InventoryReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Inventory', path: '/inventory/dashboard' }, { label: 'Reports' }]} title="Reports & Analytics" description="Operational and executive inventory reports" />
      <InventorySubNav />
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

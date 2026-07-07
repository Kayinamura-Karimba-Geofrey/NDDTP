import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { AssetSubNav } from '../components/AssetSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Asset Register', 'Assets by Department', 'Assignment Report', 'Maintenance Report',
  'Inspection Report', 'Warranty Expiry Report', 'Asset Utilization', 'Disposal Report',
  'Asset Age Analysis', 'Condition Report',
];

export function AssetReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Reports' }]} title="Reports & Analytics" description="Generate and export asset reports" />
      <AssetSubNav />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REPORTS.map((report) => (
          <Card key={report}>
            <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium">{report}</p>
              <div className="flex flex-wrap gap-1">
                {(['PDF', 'Excel', 'CSV'] as const).map((fmt) => (
                  <Button key={fmt} variant="outline" size="sm" onClick={() => toast(`Exporting ${report} as ${fmt}`)}><FiDownload className="h-3 w-3" /> {fmt}</Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PerformanceStatusBadge } from '../components/PerformanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_IDPS, type DevelopmentPlan } from '../constants/performance-data';

export function DevelopmentPlansPage() {
  const columns: DataTableColumn<DevelopmentPlan>[] = [
    { key: 'employee', header: 'Employee', render: (r) => <span className="font-medium">{r.employee}</span> },
    { key: 'goals', header: 'Career Goals' },
    { key: 'progress', header: 'Progress', render: (r) => `${r.progress}%` },
    { key: 'status', header: 'Status', render: (r) => <PerformanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Development Plans' }]} title="Individual Development Plans" description="Career development — integrates with Training Service" actions={<Button onClick={() => toast('Create IDP')}><FiPlus className="h-4 w-4" /> Create IDP</Button>} />
      <PerformanceSubNav />
      <Card>
        <CardContent className="pt-6">
          <p className="mb-4 text-sm text-muted-foreground">Training recommendations link to the <Link to="/training/my-learning" className="underline">Training Service</Link>.</p>
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_IDPS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

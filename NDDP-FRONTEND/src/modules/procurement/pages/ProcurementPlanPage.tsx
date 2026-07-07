import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_PLANS, type ProcurementPlan } from '../constants/procurement-data';

export function ProcurementPlanPage() {
  const columns: DataTableColumn<ProcurementPlan>[] = [
    { key: 'num', header: 'Plan #', render: (r) => <code className="text-xs">{r.planNumber}</code> },
    { key: 'year', header: 'Financial Year' },
    { key: 'dept', header: 'Department' },
    { key: 'cat', header: 'Category' },
    { key: 'budget', header: 'Est. Budget', render: (r) => `${(r.estimatedBudget / 1e6).toFixed(0)}M RWF` },
    { key: 'priority', header: 'Priority' },
    { key: 'officer', header: 'Responsible Officer' },
    { key: 'status', header: 'Status', render: (r) => <ProcurementStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Procurement Plan' }]} title="Procurement Plan" description="Annual or periodic procurement planning" actions={<Button onClick={() => toast('Create plan')}><FiPlus className="h-4 w-4" /> Create Plan</Button>} />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_PLANS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

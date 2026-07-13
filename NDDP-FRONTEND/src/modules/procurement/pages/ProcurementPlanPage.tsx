import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useGetProcurementPlansQuery } from '../api/procurement.api';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { ProcurementPlan } from '../constants/procurement-data';
import { CreateProcurementPlanModal } from '../components/CreateProcurementPlanModal';

export function ProcurementPlanPage() {
  const { data: plans = [], isLoading } = useGetProcurementPlansQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<ProcurementPlan>[] = [
    { key: 'num', header: 'Plan #', render: (r) => <code className="text-xs">{r.planNumber}</code> },
    { key: 'year', header: 'Financial Year', render: (r) => r.financialYear },
    { key: 'dept', header: 'Department', render: (r) => r.department },
    { key: 'cat', header: 'Category', render: (r) => r.category },
    { key: 'budget', header: 'Est. Budget', render: (r) => `${(r.estimatedBudget / 1e6).toFixed(0)}M RWF` },
    { key: 'priority', header: 'Priority', render: (r) => r.priority },
    { key: 'officer', header: 'Responsible Officer', render: (r) => r.responsibleOfficer },
    { key: 'status', header: 'Status', render: (r) => <ProcurementStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Procurement Plan' }]} title="Procurement Plan" description="Annual or periodic procurement planning" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Create Plan</Button>} />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={plans as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
      <CreateProcurementPlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { MaintenanceStatusBadge } from '../components/MaintenanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMaintenanceSlaQuery } from '../api/maintenance.api';
import type { SlaRule } from '../constants/maintenance-data';
import { CreateSlaRuleModal } from '../components/CreateSlaRuleModal';

export function MaintenanceSlaPage() {
  const { data: sla = [], isLoading } = useGetMaintenanceSlaQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<SlaRule>[] = [
    { key: 'priority', header: 'Priority', render: (r) => <span className="font-medium">{r.priority}</span> },
    { key: 'response', header: 'Response (hrs)', render: (r) => r.responseHours },
    { key: 'resolution', header: 'Resolution (hrs)', render: (r) => r.resolutionHours },
    { key: 'compliance', header: 'Compliance', render: (r) => r.compliance },
    { key: 'status', header: 'Status', render: (r) => <MaintenanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'SLA' }]} title="SLA Rules" description="Response and resolution targets by maintenance priority" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Add SLA Rule</Button>} />
      <MaintenanceSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={sla as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateSlaRuleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

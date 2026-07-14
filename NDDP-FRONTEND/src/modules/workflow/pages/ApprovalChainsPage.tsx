import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { WorkflowStatusBadge } from '../components/WorkflowStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetApprovalChainsQuery } from '../api/workflow.api';
import type { ApprovalChain } from '../constants/workflow-data';
import { CreateApprovalChainModal } from '../components/CreateApprovalChainModal';

export function ApprovalChainsPage() {
  const { data: chains = [], isLoading } = useGetApprovalChainsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<ApprovalChain>[] = [
    { key: 'name', header: 'Chain', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'service', header: 'Service', render: (r) => r.service },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'levels', header: 'Levels', render: (r) => <span className="text-xs">{r.levels.join(' → ')}</span> },
    { key: 'status', header: 'Status', render: (r) => <WorkflowStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'Approval Chains' }]} title="Approval Chains" description="Sequential, parallel, conditional, majority, and unanimous approvals" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Chain</Button>} />
      <WorkflowSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={chains as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateApprovalChainModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

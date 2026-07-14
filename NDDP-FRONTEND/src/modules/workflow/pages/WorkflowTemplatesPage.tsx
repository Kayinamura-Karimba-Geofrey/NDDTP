import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetWorkflowTemplatesQuery } from '../api/workflow.api';
import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { WorkflowStatusBadge } from '../components/WorkflowStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { WorkflowTemplate } from '../constants/workflow-data';
import { CreateWorkflowTemplateModal } from '../components/CreateWorkflowTemplateModal';

export function WorkflowTemplatesPage() {
  const { data: templates = [], isLoading } = useGetWorkflowTemplatesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<WorkflowTemplate>[] = [
    { key: 'name', header: 'Template', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'desc', header: 'Description', render: (r) => <span className="text-xs">{r.description}</span> },
    { key: 'cat', header: 'Category', render: (r) => r.category },
    { key: 'service', header: 'Service', render: (r) => r.service ?? '—' },
    { key: 'ver', header: 'Version', render: (r) => r.version },
    { key: 'status', header: 'Status', render: (r) => <WorkflowStatusBadge status={r.status} /> },
    { key: 'by', header: 'Created By', render: (r) => r.createdBy },
    { key: 'mod', header: 'Modified', render: (r) => dayjs(r.lastModified).format('DD MMM YYYY') },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'Templates' }]} title="Workflow Templates" description="Reusable workflow definitions for leave, procurement, finance, fleet, and more" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Template</Button>} />
      <WorkflowSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={templates as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateWorkflowTemplateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

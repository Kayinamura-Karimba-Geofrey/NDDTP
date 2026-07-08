import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { WorkflowStatusBadge } from '../components/WorkflowStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_RULES, type BusinessRule } from '../constants/workflow-data';

export function BusinessRulesPage() {
  const columns: DataTableColumn<BusinessRule>[] = [
    { key: 'name', header: 'Rule', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'cond', header: 'Condition', render: (r) => <code className="text-xs">{r.condition}</code> },
    { key: 'action', header: 'Action', render: (r) => r.action },
    { key: 'cat', header: 'Category', render: (r) => r.category },
    { key: 'status', header: 'Status', render: (r) => <WorkflowStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'Rules' }]} title="Business Rules" description="Centralized rules engine — configure without code changes" actions={<Button onClick={() => toast('Create rule')}><FiPlus className="h-4 w-4" /> New Rule</Button>} />
      <WorkflowSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_RULES as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

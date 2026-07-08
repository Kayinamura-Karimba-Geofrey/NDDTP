import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { WorkflowStatusBadge } from '../components/WorkflowStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_AUTOMATION, type AutomationRule } from '../constants/workflow-data';

export function AutomationRulesPage() {
  const columns: DataTableColumn<AutomationRule>[] = [
    { key: 'name', header: 'Rule', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'trigger', header: 'Trigger', render: (r) => r.trigger },
    { key: 'action', header: 'Action', render: (r) => r.action },
    { key: 'status', header: 'Status', render: (r) => <WorkflowStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'Automation' }]} title="Automation Rules" description="Automatic approve, notify, create records, and archive completed workflows" actions={<Button onClick={() => toast('Create automation')}><FiPlus className="h-4 w-4" /> New Rule</Button>} />
      <WorkflowSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_AUTOMATION as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useGetPendingTasksQuery } from '../api/workflow.api';
import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { WorkflowStatusBadge } from '../components/WorkflowStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const TABS = ['Pending', 'Approved', 'Rejected', 'Delegated', 'Completed'] as const;

export function MyApprovalsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Pending');
  const { data: tasks = [] } = useGetPendingTasksQuery();

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'My Approvals' }]} title="My Approvals" description="Personal approval inbox with bulk actions where appropriate" />
      <WorkflowSubNav />
      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-border pb-2">
        {TABS.map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium ${tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>{t}</button>
        ))}
      </div>
      <Card>
        <CardContent className="space-y-3 pt-6">
          {tab === 'Pending' && tasks.map((t) => (
            <div key={t.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4">
              <div>
                <p className="font-medium">{t.taskName}</p>
                <p className="text-xs text-muted-foreground">{t.workflow} · {t.workflowId} · Due {t.dueDate}</p>
              </div>
              <div className="flex items-center gap-2">
                <WorkflowStatusBadge status={t.status} />
                <Button size="sm" onClick={() => toast.success('Approved')}>Approve</Button>
                <Button size="sm" variant="outline" onClick={() => toast('Rejected')}>Reject</Button>
                <Button size="sm" variant="outline" onClick={() => toast('Delegated')}>Delegate</Button>
              </div>
            </div>
          ))}
          {tab === 'Pending' && !tasks.length && <p className="text-sm text-muted-foreground">No pending approvals.</p>}
          {tab !== 'Pending' && <p className="text-sm text-muted-foreground">{tab} items will appear here.</p>}
        </CardContent>
      </Card>
    </div>
  );
}

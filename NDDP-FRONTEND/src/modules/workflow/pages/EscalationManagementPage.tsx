import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { WorkflowStatusBadge } from '../components/WorkflowStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useGetEscalationRulesQuery } from '../api/workflow.api';
import { CreateEscalationRuleModal } from '../components/CreateEscalationRuleModal';

export function EscalationManagementPage() {
  const { data: escalations = [], isLoading } = useGetEscalationRulesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'Escalation' }]} title="Escalation Management" description="Automatic escalation for overdue tasks — reminder, reassignment, priority increase" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Add Rule</Button>} />
      <WorkflowSubNav />
      <Card className="mb-6">
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Escalation Path</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2 pt-4 text-sm">
          {['48h Reminder', '72h Supervisor', '96h Director'].map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded-full bg-muted px-3 py-1 font-medium">{s}</span>
              {i < 2 && <span className="text-muted-foreground">→</span>}
            </span>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-3 pt-6">
          {isLoading ? <div className="text-sm text-muted-foreground">Loading...</div> : escalations.map((e) => (
            <div key={e.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-4 text-sm">
              <div>
                <p className="font-medium">{e.name}</p>
                <p className="text-muted-foreground">After {e.triggerHours}h → {e.action} → {e.target}</p>
              </div>
              <WorkflowStatusBadge status={e.status} />
            </div>
          ))}
        </CardContent>
      </Card>
      <CreateEscalationRuleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

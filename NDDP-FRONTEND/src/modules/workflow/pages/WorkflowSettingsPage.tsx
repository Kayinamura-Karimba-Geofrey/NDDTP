import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function WorkflowSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'Settings' }]} title="Workflow Settings" description="Approval types, escalation, delegation, SLA, automation, and calendars" />
      <WorkflowSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Approval Types" defaultValue="Sequential, Parallel, Conditional, Majority, Unanimous" className="sm:col-span-2" />
          <Input label="Workflow Categories" defaultValue="HR, Finance, Procurement, Operations, Medical, Records" className="sm:col-span-2" />
          <Input label="Escalation Rules" defaultValue="48h reminder, 72h supervisor, 96h director" className="sm:col-span-2" />
          <Input label="Delegation Rules" defaultValue="Max 30 days, scope-limited, auditable" className="sm:col-span-2" />
          <Input label="Notification Templates" defaultValue="Task assigned, reminder, approval, rejection, escalation" className="sm:col-span-2" />
          <Input label="Working Days" defaultValue="Mon–Fri, 08:00–17:00" />
          <Input label="Holiday Calendar" defaultValue="National + organizational holidays" />
          <Input label="SLA Rules" defaultValue="Per workflow type — see SLA module" className="sm:col-span-2" />
          <Input label="Automation Policies" defaultValue="Auto-archive on completion, notify on assignment" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}

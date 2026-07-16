import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';

const INTEGRATIONS = [
  { service: 'Personnel', endpoint: 'POST /instances', description: 'Leave, transfer, promotion approvals' },
  { service: 'Procurement', endpoint: 'POST /instances', description: 'Requisitions, POs, tenders' },
  { service: 'Finance', endpoint: 'POST /instances', description: 'Budget, expenditure, payment approvals' },
  { service: 'Fleet', endpoint: 'POST /instances', description: 'Trip requests, vehicle assignments' },
  { service: 'Medical', endpoint: 'POST /instances', description: 'Clearances, referrals' },
  { service: 'Training', endpoint: 'POST /instances', description: 'Enrollment, certification approvals' },
  { service: 'DMS', endpoint: 'POST /instances', description: 'Document publication workflows' },
  { service: 'Performance', endpoint: 'POST /instances', description: 'Review and PIP approvals' },
  { service: 'Assets', endpoint: 'POST /instances', description: 'Disposal, transfer approvals' },
  { service: 'Notification', endpoint: 'Events', description: 'Task assigned, reminder, completion' },
  { service: 'Audit', endpoint: 'Logs', description: 'Immutable workflow action trail' },
];

export function ApiIntegrationsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'Integrations' }]} title="API Integrations" description="Every microservice calls Workflow — start, approve, reject, delegate, complete" />
      <WorkflowSubNav />
      <Card className="mb-6">
        <CardContent className="pt-6 text-sm">
          <p className="font-medium">Core APIs</p>
          <code className="mt-2 block rounded-lg bg-muted p-3 text-xs">
            POST /definitions · GET /definitions · POST /instances · GET /instances · POST /instances/:id/start<br />
            GET /tasks/me · POST /tasks/:id/approve · POST /tasks/:id/reject · POST /tasks/:id/skip
          </code>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="grid gap-3 pt-6 sm:grid-cols-2">
          {INTEGRATIONS.map((i) => (
            <div key={i.service} className="rounded-lg border border-border p-4">
              <p className="font-medium">{i.service}</p>
              <p className="font-mono text-xs text-primary">{i.endpoint}</p>
              <p className="mt-1 text-sm text-muted-foreground">{i.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

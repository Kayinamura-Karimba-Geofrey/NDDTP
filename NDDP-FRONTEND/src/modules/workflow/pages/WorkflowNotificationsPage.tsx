import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';

const EVENTS = [
  { event: 'Task Assigned', channels: 'In-app, Email' },
  { event: 'Reminder', channels: 'In-app, Email, SMS' },
  { event: 'Approval', channels: 'In-app, Email' },
  { event: 'Rejection', channels: 'In-app, Email' },
  { event: 'Escalation', channels: 'In-app, Email, SMS' },
  { event: 'Completion', channels: 'In-app, Email' },
];

export function WorkflowNotificationsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'Notifications' }]} title="Workflow Notifications" description="Email, SMS, in-app, push — integrated with Notification Service" />
      <WorkflowSubNav />
      <Card>
        <CardContent className="grid gap-3 pt-6 sm:grid-cols-2">
          {EVENTS.map((e) => (
            <div key={e.event} className="rounded-lg border border-border p-4">
              <p className="font-medium">{e.event}</p>
              <p className="text-sm text-muted-foreground">Channels: {e.channels}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

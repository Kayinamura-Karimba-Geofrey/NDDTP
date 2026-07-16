import { NotificationSubNav } from '../components/NotificationSubNav';
import { NotificationStatusBadge } from '../components/NotificationStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';

const INTEGRATIONS = [
  { name: 'SMTP Email Server', provider: 'Microsoft 365', status: 'ACTIVE', description: 'Primary email delivery via SMTP relay' },
  { name: 'SMS Gateway', provider: 'Africa\'s Talking', status: 'ACTIVE', description: 'Transactional and bulk SMS delivery' },
  { name: 'Push Notifications', provider: 'Firebase Cloud Messaging', status: 'ACTIVE', description: 'Android and iOS push delivery' },
  { name: 'Microsoft Teams', provider: 'Teams Webhook', status: 'INACTIVE', description: 'Optional Teams channel notifications' },
  { name: 'Slack', provider: 'Slack Webhook', status: 'INACTIVE', description: 'Optional Slack channel notifications' },
  { name: 'Event Bus', provider: 'RabbitMQ', status: 'ACTIVE', description: 'Consumes platform events from all services' },
];

export function NotificationIntegrationsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'Integrations' }]} title="Integrations" description="SMTP, SMS gateway, push services, Teams, Slack — configurable and replaceable without code changes" />
      <NotificationSubNav />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INTEGRATIONS.map((item) => (
          <Card key={item.name}>
            <CardContent className="pt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">{item.name}</h3>
                <NotificationStatusBadge status={item.status} />
              </div>
              <p className="text-sm text-muted-foreground">{item.provider}</p>
              <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { NotificationSubNav } from '../components/NotificationSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function NotificationSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Notifications', path: '/notifications/dashboard' }, { label: 'Settings' }]} title="Notification Settings" description="Default senders, providers, retry policy, rate limits, quiet hours, and retention" />
      <NotificationSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Default Sender Email" defaultValue="noreply@mod.gov.rw" className="sm:col-span-2" />
          <Input label="SMS Provider" defaultValue="Africa's Talking" />
          <Input label="Push Provider" defaultValue="Firebase Cloud Messaging" />
          <Input label="Retry Policy" defaultValue="3 attempts — 5 min, 30 min, 2 hours" className="sm:col-span-2" />
          <Input label="Rate Limits" defaultValue="Email: 100/min, SMS: 50/min, Push: 200/min" className="sm:col-span-2" />
          <Input label="Quiet Hours Default" defaultValue="22:00 – 06:00" />
          <Input label="Retention Period" defaultValue="365 days" />
          <Input label="Notification Priorities" defaultValue="Low, Normal, High, Urgent" className="sm:col-span-2" />
          <Input label="Language Settings" defaultValue="English, French, Kinyarwanda" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}

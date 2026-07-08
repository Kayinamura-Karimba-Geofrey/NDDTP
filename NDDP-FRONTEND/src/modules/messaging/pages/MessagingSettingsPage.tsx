import toast from 'react-hot-toast';
import { MessagingSubNav } from '../components/MessagingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function MessagingSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Messaging', path: '/messaging/dashboard' }, { label: 'Settings' }]} title="Messaging Settings" description="Notifications, mute rules, retention, and default channel preferences" />
      <MessagingSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Desktop Notifications" defaultValue="Enabled" />
          <Input label="Sound Alerts" defaultValue="Mentions only" />
          <Input label="Default Channel Type" defaultValue="GROUP" />
          <Input label="Show Presence" defaultValue="Enabled for collaborators" />
          <Input label="Mute Rules" defaultValue="Mute archived channel noise" className="sm:col-span-2" />
          <Input label="Message Retention" defaultValue="24 months (aligned with DMS policy)" className="sm:col-span-2" />
          <Input label="Read Receipts" defaultValue="Enabled" />
          <Input label="File Attachments" defaultValue="Max 25 MB" />
          <div className="sm:col-span-2"><Button onClick={() => toast('Settings saved')}>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}

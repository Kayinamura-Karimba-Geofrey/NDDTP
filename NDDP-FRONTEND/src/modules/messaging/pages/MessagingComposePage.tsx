import toast from 'react-hot-toast';
import { MessagingSubNav } from '../components/MessagingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function MessagingComposePage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Messaging', path: '/messaging/dashboard' }, { label: 'Compose' }]} title="Compose Message" description="Send a message to a channel or start a direct conversation" />
      <MessagingSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Channel / Recipient" defaultValue="HR Operations" className="sm:col-span-2" />
          <Input label="Channel Type" defaultValue="GROUP" />
          <Input label="Priority" defaultValue="Normal" />
          <Input label="Subject (optional)" defaultValue="Access review reminder" className="sm:col-span-2" />
          <Input label="Message" defaultValue="Reminder: access review closes Friday. Please complete outstanding items." className="sm:col-span-2" />
          <Input label="Attachments" defaultValue="None" className="sm:col-span-2" />
          <div className="sm:col-span-2 flex gap-2">
            <Button onClick={() => toast('Message sent')}>Send</Button>
            <Button variant="outline" onClick={() => toast('Draft saved')}>Save Draft</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

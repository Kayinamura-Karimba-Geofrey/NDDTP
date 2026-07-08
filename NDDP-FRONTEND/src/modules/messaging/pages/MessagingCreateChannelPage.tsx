import toast from 'react-hot-toast';
import { MessagingSubNav } from '../components/MessagingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function MessagingCreateChannelPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Messaging', path: '/messaging/dashboard' }, { label: 'Channels', path: '/messaging/channels' }, { label: 'New' }]} title="Create Channel" description="Create a direct, group, department, or broadcast channel" />
      <MessagingSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Channel Name" defaultValue="New Operations Cell" className="sm:col-span-2" />
          <Input label="Type" defaultValue="GROUP" />
          <Input label="Visibility" defaultValue="Members only" />
          <Input label="Description" defaultValue="Coordination channel for operations cell" className="sm:col-span-2" />
          <Input label="Initial Members" defaultValue="alice@mod.gov.rw, jean@mod.gov.rw" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button onClick={() => toast('Channel created')}>Create Channel</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MessagingSubNav } from '../components/MessagingSubNav';
import { MessagingStatusBadge } from '../components/MessagingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';
import { useGetChannelMessagesQuery, useGetMyChannelsQuery } from '../api/messaging.api';
import { MOCK_INBOX } from '../constants/messaging-data';

export function MessagingThreadPage() {
  const { id = 'CH-002' } = useParams();
  const { data: channels = [] } = useGetMyChannelsQuery();
  const { data: apiMessages = [] } = useGetChannelMessagesQuery(id);
  const channel = channels.find((c) => c.id === id);
  const messages = apiMessages.length
    ? apiMessages
    : MOCK_INBOX.filter((m) => m.channelId === id).length
      ? MOCK_INBOX.filter((m) => m.channelId === id)
      : MOCK_INBOX;

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Messaging', path: '/messaging/dashboard' },
          { label: 'Channels', path: '/messaging/channels' },
          { label: channel?.name ?? id },
        ]}
        title={channel?.name ?? 'Conversation'}
        description={`${channel?.type ?? 'CHANNEL'} · ${channel?.members ?? '—'} members`}
        actions={<Link to="/messaging/members"><Button variant="outline">Members</Button></Link>}
      />
      <MessagingSubNav />
      <Card className="mb-4">
        <CardContent className="space-y-4 pt-6">
          {messages.map((msg) => (
            <div key={msg.id} className="rounded-lg border border-border p-4">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{msg.sender}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{msg.sentAt}</span>
                  <MessagingStatusBadge status={msg.status} />
                </div>
              </div>
              <p className="text-sm">{msg.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row">
          <Input label="Reply" placeholder="Write a message…" className="flex-1" />
          <div className="flex items-end gap-2">
            <Button onClick={() => toast('Message sent')}>Send</Button>
            <Button variant="outline" onClick={() => toast('Marked as read')}>Mark Read</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

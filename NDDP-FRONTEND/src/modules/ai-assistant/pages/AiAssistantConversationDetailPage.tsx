import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiSend } from 'react-icons/fi';
import { AiAssistantSubNav } from '../components/AiAssistantSubNav';
import { AiAssistantStatusBadge } from '../components/AiAssistantStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { useGetAiConversationsQuery, useGetAiMessagesQuery } from '../api/ai-assistant.api';
import { cn } from '@/utils/cn';

export function AiAssistantConversationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: conversations = [] } = useGetAiConversationsQuery();
  const conversation = conversations.find((c) => c.id === id) ?? conversations[0];
  const { data: messages = [] } = useGetAiMessagesQuery(conversation?.id ?? '');
  const [draft, setDraft] = useState('');

  if (!conversation) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'AI Assistant', path: '/ai-assistant/dashboard' }, { label: 'Conversations', path: '/ai-assistant/conversations' }, { label: 'Not found' }]} title="Conversation Not Found" description="No conversation matches this reference" />
        <AiAssistantSubNav />
        <Link to="/ai-assistant/conversations"><Button variant="outline">Back to conversations</Button></Link>
      </div>
    );
  }

  const send = () => {
    if (!draft.trim()) {
      toast.error('Enter a message');
      return;
    }
    toast.success('Message sent');
    setDraft('');
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'AI Assistant', path: '/ai-assistant/dashboard' }, { label: 'Conversations', path: '/ai-assistant/conversations' }, { label: conversation.title }]}
        title={conversation.title}
        description={`${conversation.agentName} · ${conversation.messageCount} messages`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <AiAssistantStatusBadge status={conversation.status} />
            {conversation.status === 'ACTIVE' && (
              <>
                <Button size="sm" variant="outline" onClick={() => toast.success('Conversation closed')}>Close</Button>
                <Button size="sm" variant="outline" onClick={() => toast.success('Conversation archived')}>Archive</Button>
              </>
            )}
          </div>
        }
      />
      <AiAssistantSubNav />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Messages</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-4">
            {messages.length === 0 ? (
              <p className="text-sm text-muted-foreground">No messages yet. Ask a question below.</p>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm',
                    m.role === 'USER' ? 'ml-8 bg-primary text-primary-foreground' : 'mr-8 bg-muted',
                    m.status === 'FAILED' && 'ring-1 ring-destructive/40',
                  )}
                >
                  <div className="mb-1 flex items-center justify-between gap-2 text-[11px] opacity-80">
                    <span className="font-medium">{m.role}</span>
                    <span>{m.createdAt}{m.tokenCount ? ` · ${m.tokenCount} tok` : ''}{m.status !== 'COMPLETED' ? ` · ${m.status}` : ''}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{m.content || (m.status === 'PENDING' ? 'Generating…' : '—')}</p>
                </div>
              ))
            )}
            {conversation.status === 'ACTIVE' && (
              <div className="flex gap-2 pt-2">
                <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message…" className="flex-1" onKeyDown={(e) => e.key === 'Enter' && send()} />
                <Button onClick={send}><FiSend className="h-4 w-4" /></Button>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Conversation info</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">ID</span><span className="font-mono">{conversation.id}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Agent</span><Link to={`/ai-assistant/agents/${conversation.agentId}`} className="text-primary hover:underline">{conversation.agentName}</Link></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Created</span><span>{conversation.createdAt}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Last activity</span><span>{conversation.lastMessageAt}</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

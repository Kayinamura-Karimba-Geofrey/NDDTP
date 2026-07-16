import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AiAssistantSubNav } from '../components/AiAssistantSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';
import { useGetAiAgentsQuery } from '../api/ai-assistant.api';

export function AiAssistantNewConversationPage() {
  const navigate = useNavigate();
  const { data: agents = [] } = useGetAiAgentsQuery();
  const active = agents.filter((a) => a.status === 'ACTIVE');

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'AI Assistant', path: '/ai-assistant/dashboard' }, { label: 'Conversations', path: '/ai-assistant/conversations' }, { label: 'New' }]} title="New Conversation" description="Start a chat with an available assistant" />
      <AiAssistantSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">Agent</label>
            <select className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" defaultValue={active[0]?.id}>
              {active.map((a) => (
                <option key={a.id} value={a.id}>{a.name} ({a.agentType})</option>
              ))}
            </select>
          </div>
          <Input label="Title" defaultValue="New assistance request" className="sm:col-span-2" />
          <div className="sm:col-span-2 flex gap-2">
            <Button onClick={() => { toast.success('Conversation created'); navigate('/ai-assistant/conversations/CNV-801'); }}>Start Chat</Button>
            <Button variant="outline" onClick={() => toast('Draft discarded')}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useParams, Link } from 'react-router-dom';
import { AiAssistantSubNav } from '../components/AiAssistantSubNav';
import { AiAssistantStatusBadge } from '../components/AiAssistantStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useGetAiAgentsQuery } from '../api/ai-assistant.api';

export function AiAssistantAgentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: agents = [] } = useGetAiAgentsQuery();
  const agent = agents.find((a) => a.id === id) ?? agents[0];

  if (!agent) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'AI Assistant', path: '/ai-assistant/dashboard' }, { label: 'Agents', path: '/ai-assistant/agents' }, { label: 'Not found' }]} title="Agent Not Found" description="No agent matches this reference" />
        <AiAssistantSubNav />
        <Link to="/ai-assistant/agents"><Button variant="outline">Back to agents</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'AI Assistant', path: '/ai-assistant/dashboard' }, { label: 'Agents', path: '/ai-assistant/agents' }, { label: agent.name }]}
        title={agent.name}
        description={`${agent.code} · ${agent.agentType}`}
        actions={
          <div className="flex items-center gap-2">
            <AiAssistantStatusBadge status={agent.status} />
            <Link to="/ai-assistant/conversations/new"><Button size="sm">Start Chat</Button></Link>
          </div>
        }
      />
      <AiAssistantSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Model', value: agent.modelName },
          { label: 'Conversations', value: agent.conversationCount },
          { label: 'Type', value: agent.agentType },
        ].map((k) => (
          <Card key={k.label}><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">{k.label}</p><p className="mt-1 text-xl font-bold">{k.value}</p></CardContent></Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Description</CardTitle></CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">{agent.description}</CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">System prompt</CardTitle></CardHeader>
          <CardContent className="pt-4 text-sm font-mono text-muted-foreground whitespace-pre-wrap">{agent.systemPrompt}</CardContent>
        </Card>
      </div>
    </div>
  );
}

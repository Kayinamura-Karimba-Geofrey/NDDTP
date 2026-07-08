import toast from 'react-hot-toast';
import { AiAssistantSubNav } from '../components/AiAssistantSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function AiAssistantCreateAgentPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'AI Assistant', path: '/ai-assistant/dashboard' }, { label: 'Agents', path: '/ai-assistant/agents' }, { label: 'New' }]} title="Create Agent" description="Register a new assistant persona and system prompt" />
      <AiAssistantSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Code" defaultValue="GEN-HELP" />
          <Input label="Agent Type" defaultValue="GENERAL" />
          <Input label="Name" defaultValue="Help Desk Assistant" className="sm:col-span-2" />
          <Input label="Model" defaultValue="nddtp-lite-v1" />
          <Input label="Description" defaultValue="First-line help for common platform questions" />
          <Input label="System Prompt" defaultValue="You are a concise MoD help desk assistant. Prefer links to module pages." className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <Button onClick={() => toast.success('Agent created')}>Create Agent</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

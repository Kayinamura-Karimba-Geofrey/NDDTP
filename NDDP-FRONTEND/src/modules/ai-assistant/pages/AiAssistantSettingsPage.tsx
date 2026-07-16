import toast from 'react-hot-toast';
import { AiAssistantSubNav } from '../components/AiAssistantSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';

export function AiAssistantSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'AI Assistant', path: '/ai-assistant/dashboard' }, { label: 'Settings' }]} title="AI Assistant Settings" description="Default model, retention, and conversation limits" />
      <AiAssistantSubNav />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Defaults</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <Input label="Default agent" defaultValue="NDDTP General Assistant" />
            <Input label="Default model" defaultValue="nddtp-lite-v1" />
            <Input label="Max messages per conversation" defaultValue="100" type="number" />
            <Button onClick={() => toast.success('Defaults saved')}>Save</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Retention & safety</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <Input label="Auto-archive after (days)" defaultValue="30" type="number" />
            <Input label="Retain archived chats (days)" defaultValue="180" type="number" />
            <Input label="Content filter" defaultValue="Enabled — moderate" />
            <Button onClick={() => toast.success('Safety settings saved')}>Save</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

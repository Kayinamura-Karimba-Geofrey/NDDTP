import { Link } from 'react-router-dom';
import { AiAssistantSubNav } from '../components/AiAssistantSubNav';
import { AiAssistantStatusBadge } from '../components/AiAssistantStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMyAiConversationsQuery } from '../api/ai-assistant.api';
import type { AiConversationRecord } from '../constants/ai-assistant-data';

export function AiAssistantMyConversationsPage() {
  const { data: conversations = [] } = useGetMyAiConversationsQuery();

  const columns: DataTableColumn<AiConversationRecord>[] = [
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'agentName', header: 'Agent', render: (r) => r.agentName },
    { key: 'messageCount', header: 'Messages', render: (r) => r.messageCount },
    { key: 'lastMessageAt', header: 'Last Activity', render: (r) => r.lastMessageAt },
    { key: 'status', header: 'Status', render: (r) => <AiAssistantStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/ai-assistant/conversations/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'AI Assistant', path: '/ai-assistant/dashboard' }, { label: 'My Chats' }]} title="My Conversations" description="Chats you started with platform assistants" actions={<Link to="/ai-assistant/conversations/new"><Button>New Chat</Button></Link>} />
      <AiAssistantSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={conversations as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { AiAssistantSubNav } from '../components/AiAssistantSubNav';
import { AiAssistantStatusBadge } from '../components/AiAssistantStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetAiAgentsQuery } from '../api/ai-assistant.api';
import type { AiAgentRecord } from '../constants/ai-assistant-data';
import { CreateAiAgentModal } from '../components/CreateAiAgentModal';

export function AiAssistantAgentsPage() {
  const { data: agents = [], isLoading } = useGetAiAgentsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<AiAgentRecord>[] = [
    { key: 'code', header: 'Code', render: (r) => <span className="font-mono text-xs">{r.code}</span> },
    { key: 'name', header: 'Agent', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'agentType', header: 'Type', render: (r) => r.agentType },
    { key: 'modelName', header: 'Model', render: (r) => r.modelName },
    { key: 'conversationCount', header: 'Conversations', render: (r) => r.conversationCount },
    { key: 'status', header: 'Status', render: (r) => <AiAssistantStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/ai-assistant/agents/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'AI Assistant', path: '/ai-assistant/dashboard' }, { label: 'Agents' }]} title="Agents" description="Configured assistants available for conversations" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Agent</Button>} />
      <AiAssistantSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={agents as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateAiAgentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

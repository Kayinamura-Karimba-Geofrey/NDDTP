import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { AiAssistantSubNav } from '../components/AiAssistantSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const REPORTS = [
  'Active Conversations Report',
  'Agent Utilization Report',
  'Message Volume Report',
  'Failed Messages Report',
  'Average Latency Report',
  'Token Usage Report',
  'Closed vs Archived Report',
  'Top User Topics Report',
];

export function AiAssistantReportsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'AI Assistant', path: '/ai-assistant/dashboard' }, { label: 'Reports' }]} title="AI Assistant Reports" description="Usage, latency, token, and agent utilization exports" />
      <AiAssistantSubNav />
      <Card>
        <CardContent className="grid gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {REPORTS.map((report) => (
            <div key={report} className="flex items-center justify-between rounded-lg border border-border p-4">
              <span className="text-sm font-medium">{report}</span>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" onClick={() => toast(`Export ${report} — PDF`)}>PDF</Button>
                <Button size="sm" variant="outline" onClick={() => toast(`Export ${report} — Excel`)}><FiDownload className="h-3 w-3" /></Button>
                <Button size="sm" variant="outline" onClick={() => toast(`Export ${report} — CSV`)}>CSV</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

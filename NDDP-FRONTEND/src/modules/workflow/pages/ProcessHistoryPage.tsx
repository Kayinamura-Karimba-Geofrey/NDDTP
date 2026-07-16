import dayjs from 'dayjs';
import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_HISTORY } from '../constants/workflow-data';

export function ProcessHistoryPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'History' }]} title="Process History" description="Complete audit trail — user, time, decision, comments" />
      <WorkflowSubNav />
      <Card>
        <CardContent className="space-y-4 pt-6">
          {MOCK_HISTORY.map((h, i) => (
            <div key={h.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-primary" />
                {i < MOCK_HISTORY.length - 1 && <div className="w-px flex-1 bg-border" />}
              </div>
              <div className="pb-4">
                <p className="font-medium">{h.event} — {h.workflow}</p>
                <p className="text-sm text-muted-foreground">{h.actor}{h.decision ? ` · ${h.decision}` : ''}{h.comments ? ` — "${h.comments}"` : ''}</p>
                <p className="text-xs text-muted-foreground">{dayjs(h.date).format('DD MMM YYYY HH:mm')}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

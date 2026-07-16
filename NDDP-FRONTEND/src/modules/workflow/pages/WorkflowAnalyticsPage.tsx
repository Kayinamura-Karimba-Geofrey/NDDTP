import { WorkflowSubNav } from '../components/WorkflowSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';

const METRICS = [
  { label: 'Average Approval Time', value: '18.4 hours' },
  { label: 'Most Delayed Department', value: 'Finance (22h avg)' },
  { label: 'Workflow Volume (MTD)', value: '4,900' },
  { label: 'Top Bottleneck', value: 'Director Approval stage' },
  { label: 'Approval Rate', value: '92.4%' },
  { label: 'Automation Rate', value: '31%' },
  { label: 'Rejection Rate', value: '4.2%' },
];

export function WorkflowAnalyticsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Workflow', path: '/workflow/dashboard' }, { label: 'Analytics' }]} title="Workflow Analytics" description="Bottlenecks, approval rates, automation, and department performance" />
      <WorkflowSubNav />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {METRICS.map((m) => (
          <Card key={m.label}><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">{m.label}</p><p className="mt-1 text-xl font-bold">{m.value}</p></CardContent></Card>
        ))}
      </div>
    </div>
  );
}

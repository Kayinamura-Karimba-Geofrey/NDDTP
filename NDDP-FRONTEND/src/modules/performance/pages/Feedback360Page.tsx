import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';

export function Feedback360Page() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: '360° Feedback' }]} title="360° Feedback" description="Structured feedback from supervisor, peers, and direct reports" />
      <PerformanceSubNav />
      <Card>
        <CardContent className="space-y-4 pt-6 text-sm">
          <p className="text-muted-foreground">Participants: Self, Supervisor, Peers, Direct Reports (where applicable). Response attribution configurable per organizational policy.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border p-4"><p className="font-medium">Leadership Review — Alice Uwase</p><p className="text-muted-foreground">4 of 6 peer responses received</p></div>
            <div className="rounded-lg border border-border p-4"><p className="font-medium">Team Excellence — Patrick Habimana</p><p className="text-muted-foreground">Cycle open until 31 Jul 2026</p></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

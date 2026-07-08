import dayjs from 'dayjs';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_HISTORY } from '../constants/performance-data';

export function PerformanceHistoryPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'History' }]} title="Performance History" description="Timeline of goals, reviews, recognition, and development" />
      <PerformanceSubNav />
      <Card>
        <CardContent className="space-y-4 pt-6">
          {MOCK_HISTORY.map((h, i) => (
            <div key={h.id} className="flex gap-4">
              <div className="flex flex-col items-center"><div className="h-3 w-3 rounded-full bg-primary" />{i < MOCK_HISTORY.length - 1 && <div className="w-px flex-1 bg-border" />}</div>
              <div className="pb-4"><p className="font-medium">{h.event}</p><p className="text-sm text-muted-foreground">{h.description}</p><p className="text-xs text-muted-foreground">{dayjs(h.date).format('DD MMM YYYY')}</p></div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

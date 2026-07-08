import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_FEEDBACK } from '../constants/performance-data';

export function ContinuousFeedbackPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Feedback' }]} title="Continuous Feedback" description="Ongoing feedback outside formal reviews" actions={<Button onClick={() => toast('Give feedback')}><FiPlus className="h-4 w-4" /> Give Feedback</Button>} />
      <PerformanceSubNav />
      <Card>
        <CardContent className="space-y-4 pt-6">
          {MOCK_FEEDBACK.map((f) => (
            <div key={f.id} className="border-l-2 border-primary pl-4">
              <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">{f.type}</span><span className="text-sm">{f.from} → {f.to}</span></div>
              <p className="mt-1 text-sm">{f.message}</p>
              <p className="mt-1 text-xs text-muted-foreground">{dayjs(f.date).format('DD MMM YYYY')} · {f.acknowledged ? 'Acknowledged' : 'Awaiting acknowledgement'}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

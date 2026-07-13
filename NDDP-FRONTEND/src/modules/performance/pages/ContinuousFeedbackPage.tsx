import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useGetFeedbackQuery } from '../api/performance.api';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, Button } from '@/components/ui';
import dayjs from 'dayjs';
import { GiveFeedbackModal } from '../components/GiveFeedbackModal';

export function ContinuousFeedbackPage() {
  const { data: feedback = [], isLoading } = useGetFeedbackQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const typeColors: Record<string, string> = {
    Positive: 'bg-green-500/10 text-green-500',
    Constructive: 'bg-yellow-500/10 text-yellow-500',
    Recognition: 'bg-blue-500/10 text-blue-500',
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Feedback' }]} title="Continuous Feedback" description="Ongoing feedback outside formal reviews" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Give Feedback</Button>} />
      <PerformanceSubNav />
      {isLoading ? <div className="data-table-empty">Loading...</div> : (
        <div className="space-y-4">
          {feedback.map((f) => (
            <Card key={f.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[f.type] ?? 'bg-muted text-muted-foreground'}`}>{f.type}</span>
                      <span className="text-xs text-muted-foreground">{f.from} → {f.to}</span>
                      {f.acknowledged && <span className="text-xs text-muted-foreground">· Acknowledged</span>}
                    </div>
                    <p className="text-sm">{f.message}</p>
                  </div>
                  <p className="shrink-0 text-xs text-muted-foreground">{dayjs(f.date).format('MMM D, YYYY')}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <GiveFeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

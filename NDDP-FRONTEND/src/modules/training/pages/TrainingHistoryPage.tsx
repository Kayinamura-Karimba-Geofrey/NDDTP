import dayjs from 'dayjs';
import { useGetTrainingHistoryQuery } from '../api/training.api';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';

export function TrainingHistoryPage() {
  const { data: history = [], isLoading } = useGetTrainingHistoryQuery();

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'History' }]} title="Training History" description="Chronological log of all training interactions" />
      <TrainingSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="data-table-empty">Loading...</div>
          ) : (
            <div className="space-y-4">
              {history.map((entry, i) => (
                <div key={entry.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    {i < history.length - 1 && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-6">
                    <p className="text-xs text-muted-foreground">{dayjs(entry.date).format('MMM D, YYYY')}</p>
                    <p className="font-medium">{entry.event}</p>
                    <p className="text-sm text-muted-foreground">{entry.personnelName} — {entry.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

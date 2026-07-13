import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useGetRecognitionAwardsQuery } from '../api/performance.api';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, Button } from '@/components/ui';
import dayjs from 'dayjs';
import { NominateForAwardModal } from '../components/NominateForAwardModal';

export function RecognitionAwardsPage() {
  const { data: awards = [], isLoading } = useGetRecognitionAwardsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Recognition' }]} title="Recognition & Awards" description="Employee achievements and commendations" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Nominate</Button>} />
      <PerformanceSubNav />
      {isLoading ? <div className="data-table-empty">Loading...</div> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((a) => (
            <Card key={a.id}>
              <CardContent className="pt-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10 text-xl">🏆</div>
                  <div>
                    <p className="font-semibold text-sm">{a.award}</p>
                    <p className="text-xs text-muted-foreground">{dayjs(a.date).format('MMM D, YYYY')}</p>
                  </div>
                </div>
                <p className="text-sm font-medium">{a.employee}</p>
                <p className="text-xs text-muted-foreground">{a.department}</p>
                <p className="mt-2 text-sm text-muted-foreground">{a.reason}</p>
                <p className="mt-1 text-xs text-muted-foreground">Presented by {a.presentedBy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <NominateForAwardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

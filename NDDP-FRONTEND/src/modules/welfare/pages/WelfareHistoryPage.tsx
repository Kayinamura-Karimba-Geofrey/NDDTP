import dayjs from 'dayjs';
import { WelfareSubNav } from '../components/WelfareSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_WELFARE_HISTORY } from '../constants/welfare-data';

export function WelfareHistoryPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Welfare', path: '/welfare/dashboard' }, { label: 'History' }]} title="Welfare History" description="Timeline of welfare interactions and program participation" />
      <WelfareSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {MOCK_WELFARE_HISTORY.map((entry, i) => (
              <div key={entry.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  {i < MOCK_WELFARE_HISTORY.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="pb-6">
                  <p className="text-xs text-muted-foreground">{dayjs(entry.date).format('MMM D, YYYY')}</p>
                  <p className="font-medium">{entry.event}</p>
                  <p className="text-sm text-muted-foreground">{entry.employeeName} — {entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

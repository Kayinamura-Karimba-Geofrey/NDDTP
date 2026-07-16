import dayjs from 'dayjs';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_CALENDAR_EVENTS } from '../constants/finance-data';

export function FinanceCalendarPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Calendar' }]} title="Financial Calendar" description="Budget deadlines, payment dates, fiscal closing, audit dates" />
      <FinanceSubNav />
      <Card>
        <CardContent className="space-y-3 pt-6">
          {MOCK_CALENDAR_EVENTS.map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-lg border border-border p-4">
              <div><p className="font-medium">{e.title}</p><p className="text-xs text-muted-foreground">{e.type}</p></div>
              <p className="text-sm font-medium">{dayjs(e.date).format('DD MMM YYYY')}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

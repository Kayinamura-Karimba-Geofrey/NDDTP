import dayjs from 'dayjs';
import { FleetSubNav } from '../components/FleetSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_CALENDAR_EVENTS } from '../constants/fleet-data';

export function FleetCalendarPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Calendar' }]} title="Fleet Calendar" description="Scheduled trips, reservations, maintenance, inspections, and license renewals" />
      <FleetSubNav />
      <Card>
        <CardContent className="grid gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_CALENDAR_EVENTS.map((e) => (
            <div key={e.id} className="rounded-lg border border-border p-4">
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">{e.type}</span>
              <p className="mt-2 font-medium">{e.title}</p>
              <p className="text-sm text-muted-foreground">{dayjs(e.date).format('dddd, DD MMM YYYY')}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

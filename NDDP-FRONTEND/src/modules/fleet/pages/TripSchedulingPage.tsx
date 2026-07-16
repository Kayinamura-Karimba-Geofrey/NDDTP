import dayjs from 'dayjs';
import { FleetSubNav } from '../components/FleetSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MOCK_CALENDAR_EVENTS, MOCK_TRIPS, MOCK_MAINTENANCE } from '../constants/fleet-data';

export function TripSchedulingPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Scheduling' }]} title="Trip Scheduling" description="Daily, weekly, and monthly transport schedules" />
      <FleetSubNav />
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Vehicle Reservations</CardTitle></CardHeader>
          <CardContent className="space-y-2 pt-4 text-sm">
            {MOCK_TRIPS.filter((t) => t.status === 'APPROVED' || t.status === 'IN_PROGRESS').map((t) => (
              <div key={t.id} className="rounded-lg border border-border p-3">
                <p className="font-medium">{t.vehicle ?? 'Unassigned'} → {t.destination}</p>
                <p className="text-xs text-muted-foreground">{dayjs(t.departureDate).format('DD MMM YYYY')} · {t.driver ?? 'TBD'}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Driver Availability</CardTitle></CardHeader>
          <CardContent className="space-y-2 pt-4 text-sm">
            <div className="rounded-lg border border-border p-3"><p className="font-medium">Jean Bizimana</p><p className="text-xs text-muted-foreground">On trip — returns 18:00</p></div>
            <div className="rounded-lg border border-border p-3"><p className="font-medium">Alice Mukamana</p><p className="text-xs text-muted-foreground">Available after 14:00</p></div>
            <div className="rounded-lg border border-border p-3"><p className="font-medium">Grace Uwase</p><p className="text-xs text-muted-foreground">Available — medical pending</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Maintenance Blocks</CardTitle></CardHeader>
          <CardContent className="space-y-2 pt-4 text-sm">
            {MOCK_MAINTENANCE.filter((m) => m.status !== 'COMPLETED').map((m) => (
              <div key={m.id} className="rounded-lg border border-border p-3">
                <p className="font-medium">{m.vehicle} — {m.type}</p>
                <p className="text-xs text-muted-foreground">{dayjs(m.date).format('DD MMM YYYY')} · {m.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Schedule Overview</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_CALENDAR_EVENTS.map((e) => (
              <div key={e.id} className="rounded-lg border border-border p-3 text-sm">
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{e.type}</span>
                <p className="mt-1 font-medium">{e.title}</p>
                <p className="text-xs text-muted-foreground">{dayjs(e.date).format('DD MMM YYYY')}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { FleetSubNav } from '../components/FleetSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MOCK_VEHICLES } from '../constants/fleet-data';

export function GpsMonitoringPage() {
  const tracked = MOCK_VEHICLES.filter((v) => v.status === 'ON_TRIP' || v.status === 'ASSIGNED');

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'GPS' }]} title="GPS & Route Monitoring" description="Optional module — enable when telematics hardware and policy allow" />
      <FleetSubNav />
      <Card className="mb-6">
        <CardContent className="pt-6 text-sm text-muted-foreground">
          GPS tracking is configurable. When disabled, location fields remain manual. Displays vehicle location, route history, distance, idle time, speed alerts, and geofencing events when integration is active.
        </CardContent>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Live Positions (Simulated)</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm">
            {tracked.map((v) => (
              <div key={v.id} className="rounded-lg border border-border p-3">
                <p className="font-medium">{v.fleetNumber} — {v.registrationNumber}</p>
                <p className="text-xs text-muted-foreground">{v.location ?? 'Unknown'} · Status: {v.status}</p>
                <p className="text-xs text-muted-foreground">Last ping: 2 min ago · Speed: {v.status === 'ON_TRIP' ? '62 km/h' : '0 km/h idle'}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Map Placeholder</CardTitle></CardHeader>
          <CardContent className="flex h-64 items-center justify-center rounded-b-lg bg-muted text-sm text-muted-foreground">
            Map integration (external mapping services) — coming with telematics enablement
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

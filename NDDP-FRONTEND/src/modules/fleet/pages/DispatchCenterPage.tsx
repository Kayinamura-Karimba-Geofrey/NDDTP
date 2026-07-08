import { FleetSubNav } from '../components/FleetSubNav';
import { FleetStatusBadge } from '../components/FleetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MOCK_TRIPS, MOCK_VEHICLES, MOCK_DRIVERS } from '../constants/fleet-data';

export function DispatchCenterPage() {
  const activeTrips = MOCK_TRIPS.filter((t) => t.status === 'IN_PROGRESS' || t.status === 'APPROVED');
  const availableVehicles = MOCK_VEHICLES.filter((v) => v.status === 'AVAILABLE');
  const availableDrivers = MOCK_DRIVERS.filter((d) => d.status === 'ACTIVE' && !d.assignment);
  const pending = MOCK_TRIPS.filter((t) => t.status === 'PENDING');

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Dispatch' }]} title="Dispatch Center" description="Operational control — active trips, availability, and emergency dispatches" />
      <FleetSubNav />
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Active Trips</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm">
            {activeTrips.map((t) => (
              <div key={t.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{t.tripNumber}</span>
                  <FleetStatusBadge status={t.status} />
                </div>
                <p className="text-muted-foreground">{t.destination}</p>
                <p className="text-xs">{t.vehicle} · {t.driver}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Available Vehicles</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm">
            {availableVehicles.length ? availableVehicles.map((v) => (
              <div key={v.id} className="rounded-lg border border-border p-3">
                <p className="font-medium">{v.fleetNumber} — {v.registrationNumber}</p>
                <p className="text-xs text-muted-foreground">{v.vehicleType} · {v.location}</p>
              </div>
            )) : <p className="text-muted-foreground">No vehicles currently available.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Available Drivers</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm">
            {availableDrivers.length ? availableDrivers.map((d) => (
              <div key={d.id} className="rounded-lg border border-border p-3">
                <p className="font-medium">{d.fullName}</p>
                <p className="text-xs text-muted-foreground">{d.licenseClass} · {d.department}</p>
              </div>
            )) : <p className="text-muted-foreground">All active drivers are assigned.</p>}
            <div className="rounded-lg border border-dashed border-border p-3 text-muted-foreground">Standby pool: 6 relief drivers</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Pending Requests</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-4 text-sm">
            {pending.map((t) => (
              <div key={t.id} className="rounded-lg border border-border p-3">
                <p className="font-medium">{t.tripNumber} — {t.requester}</p>
                <p className="text-xs text-muted-foreground">{t.destination} · {t.priority}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Emergency Dispatches</CardTitle></CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            No emergency dispatches active. Urgent medical/security transport will appear here for immediate assignment.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

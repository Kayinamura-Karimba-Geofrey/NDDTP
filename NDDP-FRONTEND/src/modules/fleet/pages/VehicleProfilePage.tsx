import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetFleetVehicleQuery } from '../api/fleet.api';
import { FleetSubNav } from '../components/FleetSubNav';
import { FleetStatusBadge } from '../components/FleetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_FUEL, MOCK_MAINTENANCE, MOCK_INSPECTIONS, MOCK_INCIDENTS, MOCK_TRIPS, MOCK_ASSIGNMENTS } from '../constants/fleet-data';

const TABS = ['Overview', 'Specifications', 'Assignments', 'Trips', 'Fuel History', 'Maintenance', 'Inspections', 'Incidents', 'Documents', 'GPS History', 'Timeline'] as const;

export function VehicleProfilePage() {
  const { id = '' } = useParams();
  const { data: vehicle, isLoading } = useGetFleetVehicleQuery(id);
  const [tab, setTab] = useState<(typeof TABS)[number]>('Overview');

  if (isLoading) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Registry', path: '/fleet/registry' }, { label: 'Vehicle' }]} title="Vehicle Profile" description="Loading…" />
        <FleetSubNav />
        <div className="data-table-empty">Loading vehicle…</div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div>
        <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Registry', path: '/fleet/registry' }, { label: 'Vehicle' }]} title="Vehicle Not Found" description="No vehicle matches this ID" />
        <FleetSubNav />
        <Card><CardContent className="pt-6"><Link to="/fleet/registry" className="underline">Back to registry</Link></CardContent></Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Registry', path: '/fleet/registry' }, { label: vehicle.fleetNumber }]}
        title={`${vehicle.make} ${vehicle.model}`}
        description={`${vehicle.fleetNumber} · ${vehicle.registrationNumber}`}
      />
      <FleetSubNav />
      <Card className="mb-6">
        <CardContent className="flex flex-wrap items-center gap-6 pt-6">
          <div className="flex h-20 w-28 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">Photo</div>
          <div className="space-y-1">
            <p className="text-lg font-semibold">{vehicle.fleetNumber} — {vehicle.registrationNumber}</p>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <FleetStatusBadge status={vehicle.status} />
              <span>Driver: {vehicle.driver ?? 'Unassigned'}</span>
              <span>Dept: {vehicle.department ?? '—'}</span>
              <span>Odometer: {vehicle.odometer?.toLocaleString() ?? '—'} km</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-border pb-2">
        {TABS.map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium ${tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>{t}</button>
        ))}
      </div>
      <Card>
        <CardContent className="pt-6 text-sm">
          {tab === 'Overview' && (
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ['Registration', vehicle.registrationNumber],
                ['VIN / Chassis', vehicle.vin ?? '—'],
                ['Make', vehicle.make],
                ['Model', vehicle.model],
                ['Year', vehicle.year],
                ['Color', vehicle.color ?? '—'],
                ['Engine Number', vehicle.engineNumber ?? '—'],
                ['Purchase Date', vehicle.purchaseDate ?? '—'],
                ['Odometer', vehicle.odometer ? `${vehicle.odometer.toLocaleString()} km` : '—'],
                ['Condition', vehicle.condition ?? '—'],
                ['Location', vehicle.location ?? '—'],
              ].map(([k, v]) => (
                <div key={String(k)}><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
              ))}
            </dl>
          )}
          {tab === 'Specifications' && (
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ['Fuel Type', vehicle.fuelType ?? '—'],
                ['Transmission', vehicle.transmission ?? '—'],
                ['Seating Capacity', vehicle.seatingCapacity ?? '—'],
                ['Vehicle Type', vehicle.vehicleType],
                ['Insurance', 'Comprehensive — Active'],
                ['Tire Spec', '265/65R17'],
              ].map(([k, v]) => (
                <div key={String(k)}><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
              ))}
            </dl>
          )}
          {tab === 'Assignments' && (
            <ul className="space-y-2">
              {MOCK_ASSIGNMENTS.filter((a) => a.vehicle.includes(vehicle.fleetNumber)).map((a) => (
                <li key={a.id} className="border-b border-border pb-2">{a.driver} · {a.department} · {a.assignmentDate} · {a.status}</li>
              ))}
              {!MOCK_ASSIGNMENTS.some((a) => a.vehicle.includes(vehicle.fleetNumber)) && <p className="text-muted-foreground">No assignments recorded.</p>}
            </ul>
          )}
          {tab === 'Trips' && (
            <ul className="space-y-2">
              {MOCK_TRIPS.filter((t) => t.vehicle === vehicle.fleetNumber).map((t) => (
                <li key={t.id} className="border-b border-border pb-2">{t.tripNumber} — {t.destination} · {t.departureDate} · {t.status}</li>
              ))}
              {!MOCK_TRIPS.some((t) => t.vehicle === vehicle.fleetNumber) && <p className="text-muted-foreground">No trips for this vehicle.</p>}
            </ul>
          )}
          {tab === 'Fuel History' && (
            <ul className="space-y-2">
              {MOCK_FUEL.filter((f) => f.vehicle === vehicle.fleetNumber).map((f) => (
                <li key={f.id} className="border-b border-border pb-2">{f.date}: {f.quantity}L {f.fuelType} @ {f.station} — {f.cost.toLocaleString()} RWF</li>
              ))}
            </ul>
          )}
          {tab === 'Maintenance' && (
            <ul className="space-y-2">
              {MOCK_MAINTENANCE.filter((m) => m.vehicle === vehicle.fleetNumber).map((m) => (
                <li key={m.id} className="border-b border-border pb-2">{m.workOrder} · {m.type} · {m.date} · {m.status}</li>
              ))}
            </ul>
          )}
          {tab === 'Inspections' && (
            <ul className="space-y-2">
              {MOCK_INSPECTIONS.filter((i) => i.vehicle === vehicle.fleetNumber).map((i) => (
                <li key={i.id} className="border-b border-border pb-2">{i.inspectionNumber} · {i.date} · {i.result}</li>
              ))}
            </ul>
          )}
          {tab === 'Incidents' && (
            <ul className="space-y-2">
              {MOCK_INCIDENTS.filter((i) => i.vehicle === vehicle.fleetNumber).map((i) => (
                <li key={i.id} className="border-b border-border pb-2">{i.incidentNumber} · {i.date} · {i.severity} — {i.description}</li>
              ))}
              {!MOCK_INCIDENTS.some((i) => i.vehicle === vehicle.fleetNumber) && <p className="text-muted-foreground">No incidents recorded.</p>}
            </ul>
          )}
          {(tab === 'Documents' || tab === 'GPS History' || tab === 'Timeline') && (
            <p className="text-muted-foreground">{tab} data will appear here when records are available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { useGetFleetVehiclesQuery } from '../api/fleet.api';
import { FleetSubNav } from '../components/FleetSubNav';
import { FleetStatusBadge } from '../components/FleetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent, Input } from '@/components/ui';
import type { Vehicle } from '../constants/fleet-data';
import { CreateVehicleModal } from '../components/CreateVehicleModal';

export function FleetRegistryPage() {
  const { data, isLoading } = useGetFleetVehiclesQuery({ page: 1, limit: 100 });
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rows = useMemo(() => {
    let list = data?.data ?? [];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((v) =>
        [v.registrationNumber, v.fleetNumber, v.model, v.driver, v.department].some((f) => f?.toLowerCase().includes(q)),
      );
    }
    if (typeFilter) list = list.filter((v) => v.vehicleType === typeFilter);
    if (statusFilter) list = list.filter((v) => v.status === statusFilter);
    return list;
  }, [data, search, typeFilter, statusFilter]);

  const columns: DataTableColumn<Vehicle>[] = [
    { key: 'fleet', header: 'Fleet #', render: (r) => <Link to={`/fleet/vehicles/${r.id}`} className="font-medium text-primary underline-offset-2 hover:underline">{r.fleetNumber}</Link> },
    { key: 'reg', header: 'Registration', render: (r) => <code className="text-xs">{r.registrationNumber}</code> },
    { key: 'type', header: 'Type', render: (r) => r.vehicleType },
    { key: 'make', header: 'Make / Model', render: (r) => `${r.make} ${r.model}` },
    { key: 'year', header: 'Year', render: (r) => r.year },
    { key: 'dept', header: 'Department', render: (r) => r.department ?? '—' },
    { key: 'driver', header: 'Driver', render: (r) => r.driver ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <FleetStatusBadge status={r.status} /> },
    { key: 'loc', header: 'Location', render: (r) => <span className="text-xs">{r.location ?? '—'}</span> },
  ];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Registry' }]}
        title="Fleet Registry"
        description="Master list of all vehicles"
        actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Register Vehicle</Button>}
      />
      <FleetSubNav />
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-wrap gap-3">
            <div className="relative min-w-[220px] flex-1">
              <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search registration, fleet #, model, driver…" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">All Types</option>
              <option value="Passenger">Passenger</option>
              <option value="Truck">Truck</option>
              <option value="Bus">Bus</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Ambulance">Ambulance</option>
              <option value="Utility">Utility</option>
            </select>
            <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="AVAILABLE">Available</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="ON_TRIP">On Trip</option>
              <option value="UNDER_MAINTENANCE">Under Maintenance</option>
              <option value="OUT_OF_SERVICE">Out of Service</option>
            </select>
          </div>
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
      <CreateVehicleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

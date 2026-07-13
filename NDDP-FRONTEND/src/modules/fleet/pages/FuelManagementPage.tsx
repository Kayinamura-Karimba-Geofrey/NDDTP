import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetFleetFuelTransactionsQuery } from '../api/fleet.api';
import { FleetSubNav } from '../components/FleetSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import type { FuelTransaction } from '../constants/fleet-data';
import { CreateFuelTransactionModal } from '../components/CreateFuelTransactionModal';

export function FuelManagementPage() {
  const { data: fuel = [], isLoading } = useGetFleetFuelTransactionsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalLiters = fuel.reduce((s, f) => s + f.quantity, 0);
  const totalCost = fuel.reduce((s, f) => s + f.cost, 0);

  const columns: DataTableColumn<FuelTransaction>[] = [
    { key: 'num', header: 'Transaction #', render: (r) => <code className="text-xs">{r.transactionNumber}</code> },
    { key: 'vehicle', header: 'Vehicle' },
    { key: 'driver', header: 'Driver' },
    { key: 'station', header: 'Station' },
    { key: 'type', header: 'Fuel Type' },
    { key: 'qty', header: 'Qty (L)', render: (r) => r.quantity },
    { key: 'cost', header: 'Cost', render: (r) => `${r.cost.toLocaleString()} RWF` },
    { key: 'odo', header: 'Odometer', render: (r) => r.odometer.toLocaleString() },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('DD MMM YYYY') },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Fuel' }]} title="Fuel Management" description="Track fuel usage, cost per km, and abnormal consumption" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Log Fuel</Button>} />
      <FleetSubNav />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">Period Volume</p><p className="text-2xl font-bold">{totalLiters} L</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">Period Cost</p><p className="text-2xl font-bold">{(totalCost / 1000).toFixed(0)}K RWF</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-xs uppercase text-muted-foreground">Avg Efficiency</p><p className="text-2xl font-bold">8.4 L/100km</p></CardContent></Card>
      </div>
      <Card>
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Fuel Transactions</CardTitle></CardHeader>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={fuel as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
      <CreateFuelTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

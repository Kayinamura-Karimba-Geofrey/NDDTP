import { useGetKpisQuery } from '../api/performance.api';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PerformanceStatusBadge } from '../components/PerformanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { KpiRecord } from '../constants/performance-data';
import toast from 'react-hot-toast';

export function KpiManagementPage() {
  const { data: kpis = [], isLoading } = useGetKpisQuery();

  const columns: DataTableColumn<KpiRecord>[] = [
    { key: 'name', header: 'KPI Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'desc', header: 'Description', render: (r) => <span className="text-xs">{r.description}</span> },
    { key: 'target', header: 'Target', render: (r) => r.targetValue },
    { key: 'actual', header: 'Actual', render: (r) => r.actualValue },
    { key: 'freq', header: 'Frequency' },
    { key: 'weight', header: 'Weight', render: (r) => `${r.weight}%` },
    { key: 'status', header: 'Status', render: (r) => <PerformanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'KPIs' }]} title="KPI Management" description="Measurable key performance indicators" actions={<Button onClick={() => toast('Add KPI coming soon')}><FiPlus className="h-4 w-4" /> Add KPI</Button>} />
      <PerformanceSubNav />
      <Card><CardContent className="pt-6">{isLoading ? <div className="data-table-empty">Loading...</div> : <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={kpis as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />}</CardContent></Card>
    </div>
  );
}

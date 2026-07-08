import toast from 'react-hot-toast';
import { ReportingSubNav } from '../components/ReportingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { PERSONNEL_BY_DEPT } from '../constants/reporting-data';

export function DataExplorerPage() {
  const columns: DataTableColumn<{ name: string; value: number }>[] = [
    { key: 'name', header: 'Department', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'value', header: 'Personnel', render: (r) => r.value.toLocaleString() },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Explorer' }]} title="Data Explorer" description="Interactive analytics — search, filters, grouping, pivot, charts, drill-down, and cross-filtering" />
      <ReportingSubNav />
      <div className="mb-4 grid gap-4 sm:grid-cols-4">
        <Input label="Search" placeholder="Search datasets…" />
        <Input label="Filter" defaultValue="status = ACTIVE" />
        <Input label="Group By" defaultValue="Department" />
        <Input label="Chart" defaultValue="Bar" />
      </div>
      <div className="mb-4 flex gap-2">
        <Button size="sm" onClick={() => toast('Pivot applied')}>Pivot</Button>
        <Button size="sm" variant="outline" onClick={() => toast('Drill down')}>Drill Down</Button>
        <Button size="sm" variant="outline" onClick={() => toast('Drill through')}>Drill Through</Button>
        <Button size="sm" variant="outline" onClick={() => toast('Cross filter applied')}>Cross Filter</Button>
      </div>
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={PERSONNEL_BY_DEPT as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.name)} /></CardContent></Card>
    </div>
  );
}

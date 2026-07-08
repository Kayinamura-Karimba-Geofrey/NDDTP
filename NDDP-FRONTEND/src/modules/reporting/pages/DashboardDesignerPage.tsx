import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { ReportingSubNav } from '../components/ReportingSubNav';
import { ReportingStatusBadge } from '../components/ReportingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_DESIGNER_WIDGETS, type DashboardWidget } from '../constants/reporting-data';

const WIDGET_TYPES = ['Charts', 'Tables', 'KPIs', 'Maps', 'Progress Bars', 'Gauges', 'Calendars', 'Heatmaps'];

export function DashboardDesignerPage() {
  const columns: DataTableColumn<DashboardWidget>[] = [
    { key: 'name', header: 'Widget', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'domain', header: 'Domain', render: (r) => r.domain },
    { key: 'status', header: 'Status', render: (r) => <ReportingStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Designer' }]} title="Dashboard Designer" description="Build dashboards with charts, tables, KPIs, maps, gauges, calendars, and heatmaps" actions={<Button onClick={() => toast('New dashboard')}><FiPlus className="h-4 w-4" /> New Dashboard</Button>} />
      <ReportingSubNav />
      <div className="mb-6 flex flex-wrap gap-2">
        {WIDGET_TYPES.map((w) => (
          <button key={w} type="button" className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted" onClick={() => toast(`Add ${w} widget`)}>{w}</button>
        ))}
      </div>
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_DESIGNER_WIDGETS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

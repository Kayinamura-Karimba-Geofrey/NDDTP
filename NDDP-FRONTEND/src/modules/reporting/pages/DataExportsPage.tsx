import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import { ReportingSubNav } from '../components/ReportingSubNav';
import { ReportingStatusBadge } from '../components/ReportingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_EXPORTS, type ExportJob } from '../constants/reporting-data';

export function DataExportsPage() {
  const columns: DataTableColumn<ExportJob>[] = [
    { key: 'id', header: 'Job ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'name', header: 'Export', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'format', header: 'Format', render: (r) => r.format },
    { key: 'by', header: 'Requested By', render: (r) => r.requestedBy },
    { key: 'at', header: 'Requested At', render: (r) => r.requestedAt },
    { key: 'size', header: 'Size', render: (r) => r.size ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <ReportingStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => r.status === 'COMPLETED'
        ? <Button size="sm" variant="outline" onClick={() => toast(`Downloading ${r.name}`)}><FiDownload className="h-3 w-3" /></Button>
        : <span className="text-xs text-muted-foreground">—</span>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Exports' }]} title="Data Exports" description="PDF, Excel, CSV, and JSON — large exports processed asynchronously" actions={
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => toast('Export PDF')}>PDF</Button>
          <Button size="sm" variant="outline" onClick={() => toast('Export Excel')}>Excel</Button>
          <Button size="sm" variant="outline" onClick={() => toast('Export CSV')}>CSV</Button>
          <Button size="sm" variant="outline" onClick={() => toast('Export JSON')}>JSON</Button>
        </div>
      } />
      <ReportingSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_EXPORTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

import toast from 'react-hot-toast';
import { FiPlus, FiPlay } from 'react-icons/fi';
import { ReportingSubNav } from '../components/ReportingSubNav';
import { ReportingStatusBadge } from '../components/ReportingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetReportLibraryQuery } from '../api/reporting.api';
import type { ReportDefinition } from '../constants/reporting-data';

export function ReportLibraryPage() {
  const { data: reports = [] } = useGetReportLibraryQuery();

  const columns: DataTableColumn<ReportDefinition>[] = [
    { key: 'name', header: 'Report', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'category', header: 'Category', render: (r) => r.category },
    { key: 'desc', header: 'Description', render: (r) => r.description },
    { key: 'owner', header: 'Owner', render: (r) => r.owner },
    { key: 'format', header: 'Format', render: (r) => r.format },
    { key: 'last', header: 'Last Run', render: (r) => r.lastRun ?? '—' },
    { key: 'status', header: 'Status', render: (r) => <ReportingStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: () => <Button size="sm" variant="outline" onClick={() => toast('Report queued')}><FiPlay className="h-3 w-3" /> Run</Button>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Library' }]} title="Report Library" description="Central repository — personnel, finance, fleet, training, procurement, medical, performance, audit, and executive reports" actions={<Button onClick={() => toast('Create report')}><FiPlus className="h-4 w-4" /> New Report</Button>} />
      <ReportingSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={reports as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiDownload } from 'react-icons/fi';
import { ReportingSubNav } from '../components/ReportingSubNav';
import { ReportingStatusBadge } from '../components/ReportingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetExportJobsQuery } from '../api/reporting.api';
import type { ExportJob } from '../constants/reporting-data';
import { RequestExportModal } from '../components/RequestExportModal';

export function DataExportsPage() {
  const { data: exports = [], isLoading } = useGetExportJobsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Exports' }]} title="Data Exports" description="PDF, Excel, CSV, and JSON — large exports processed asynchronously" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Request Export</Button>} />
      <ReportingSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={exports as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <RequestExportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

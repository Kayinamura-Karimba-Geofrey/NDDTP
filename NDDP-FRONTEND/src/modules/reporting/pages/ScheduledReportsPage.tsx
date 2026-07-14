import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { ReportingSubNav } from '../components/ReportingSubNav';
import { ReportingStatusBadge } from '../components/ReportingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetScheduledReportsQuery } from '../api/reporting.api';
import type { ScheduledReport } from '../constants/reporting-data';
import { ScheduleReportModal } from '../components/ScheduleReportModal';

export function ScheduledReportsPage() {
  const { data: rows = [], isLoading } = useGetScheduledReportsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<ScheduledReport>[] = [
    { key: 'report', header: 'Report', render: (r) => <span className="font-medium">{r.report}</span> },
    { key: 'freq', header: 'Frequency', render: (r) => r.frequency },
    { key: 'next', header: 'Next Run', render: (r) => r.nextRun },
    { key: 'channels', header: 'Channels', render: (r) => r.channels },
    { key: 'recipients', header: 'Recipients', render: (r) => r.recipients },
    { key: 'status', header: 'Status', render: (r) => <ReportingStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Scheduled' }]} title="Scheduled Reports" description="Automatic generation — daily, weekly, monthly, quarterly, annual — via email, DMS, in-app, or secure download" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Schedule Report</Button>} />
      <ReportingSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <ScheduleReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

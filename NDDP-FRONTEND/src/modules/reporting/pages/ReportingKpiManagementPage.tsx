import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { ReportingSubNav } from '../components/ReportingSubNav';
import { ReportingStatusBadge } from '../components/ReportingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetReportingKpisQuery } from '../api/reporting.api';
import type { KpiItem } from '../constants/reporting-data';
import { CreateKpiModal } from '../components/CreateKpiModal';

export function ReportingKpiManagementPage() {
  const { data: kpis = [], isLoading } = useGetReportingKpisQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<KpiItem>[] = [
    { key: 'name', header: 'KPI', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'domain', header: 'Domain', render: (r) => r.domain },
    { key: 'owner', header: 'Owner', render: (r) => r.owner },
    { key: 'formula', header: 'Formula', render: (r) => <code className="text-xs">{r.formula}</code> },
    { key: 'target', header: 'Target', render: (r) => r.target },
    { key: 'actual', header: 'Actual', render: (r) => r.actual },
    { key: 'freq', header: 'Frequency', render: (r) => r.frequency },
    { key: 'trend', header: 'Trend', render: (r) => r.trend },
    { key: 'status', header: 'Status', render: (r) => <ReportingStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'KPIs' }]} title="KPI Management" description="Organization-wide KPIs with owners, formulas, targets, thresholds, and trends" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New KPI</Button>} />
      <ReportingSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={kpis as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateKpiModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

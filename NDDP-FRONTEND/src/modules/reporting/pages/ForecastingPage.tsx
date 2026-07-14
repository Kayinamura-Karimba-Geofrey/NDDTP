import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { ReportingSubNav } from '../components/ReportingSubNav';
import { ReportingStatusBadge } from '../components/ReportingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetForecastsQuery } from '../api/reporting.api';
import type { ForecastItem } from '../constants/reporting-data';
import { CreateForecastModal } from '../components/CreateForecastModal';

export function ForecastingPage() {
  const { data: forecasts = [], isLoading } = useGetForecastsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<ForecastItem>[] = [
    { key: 'name', header: 'Forecast', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'domain', header: 'Domain', render: (r) => r.domain },
    { key: 'horizon', header: 'Horizon', render: (r) => r.horizon },
    { key: 'method', header: 'Method', render: (r) => r.method },
    { key: 'confidence', header: 'Confidence', render: (r) => r.confidence },
    { key: 'status', header: 'Status', render: (r) => <ReportingStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: () => <Button size="sm" variant="outline" onClick={() => toast('Forecast refreshed')}>Refresh</Button>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Reporting', path: '/reports/dashboard' }, { label: 'Forecasting' }]} title="Forecasting" description="Predict budget, training demand, recruitment, vehicle replacement, inventory, and leave using statistical models" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Forecast</Button>} />
      <ReportingSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={forecasts as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateForecastModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

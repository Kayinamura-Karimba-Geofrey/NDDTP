import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useGetCostCentersQuery } from '../api/finance.api';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { FinanceStatusBadge } from '../components/FinanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { CostCenter } from '../constants/finance-data';
import { CreateCostCenterModal } from '../components/CreateCostCenterModal';

export function CostCentersPage() {
  const { data: centers = [], isLoading } = useGetCostCentersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<CostCenter>[] = [
    { key: 'code', header: 'Code', render: (r) => <code className="text-xs">{r.code}</code> },
    { key: 'name', header: 'Name', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'dept', header: 'Department' },
    { key: 'manager', header: 'Manager' },
    { key: 'budget', header: 'Budget', render: (r) => `${(r.budget / 1e6).toFixed(0)}M RWF` },
    { key: 'status', header: 'Status', render: (r) => <FinanceStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Cost Centers' }]} title="Cost Centers" description="Organizational cost centers and budget ownership" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Add Cost Center</Button>} />
      <FinanceSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={centers as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateCostCenterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

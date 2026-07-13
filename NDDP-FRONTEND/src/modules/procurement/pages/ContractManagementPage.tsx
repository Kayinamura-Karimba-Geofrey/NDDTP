import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetContractsQuery } from '../api/procurement.api';
import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { ProcurementStatusBadge } from '../components/ProcurementStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { ContractRecord } from '../constants/procurement-data';
import { CreateContractModal } from '../components/CreateContractModal';

export function ContractManagementPage() {
  const { data: contracts = [], isLoading } = useGetContractsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<ContractRecord>[] = [
    { key: 'num', header: 'Contract #', render: (r) => <code className="text-xs">{r.contractNumber}</code> },
    { key: 'supplier', header: 'Supplier', render: (r) => <span className="font-medium">{r.supplier}</span> },
    { key: 'type', header: 'Type' },
    { key: 'value', header: 'Value', render: (r) => `${(r.value / 1e6).toFixed(0)}M RWF` },
    { key: 'start', header: 'Start', render: (r) => dayjs(r.startDate).format('MMM YYYY') },
    { key: 'end', header: 'End', render: (r) => dayjs(r.endDate).format('MMM YYYY') },
    { key: 'renewal', header: 'Renewal', render: (r) => r.renewalDate ? dayjs(r.renewalDate).format('DD MMM YYYY') : '—' },
    { key: 'status', header: 'Status', render: (r) => <ProcurementStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Contracts' }]} title="Contract Management" description="Procurement contracts — renewals, amendments, milestones" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Contract</Button>} />
      <ProcurementSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={contracts as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
      <CreateContractModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

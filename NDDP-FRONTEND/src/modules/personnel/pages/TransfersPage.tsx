import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetPersonnelTransfersQuery } from '../api/personnel.api';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { TransferRecord } from '../constants/personnel-data';
import { InitiateTransferModal } from '../components/InitiateTransferModal';

export function TransfersPage() {
  const { data: transfers = [], isLoading } = useGetPersonnelTransfersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<TransferRecord>[] = [
    { key: 'person', header: 'Personnel', render: (t) => <span className="font-medium">{t.personnelName}</span> },
    { key: 'old', header: 'From', render: (t) => `${t.oldDepartment}${t.oldUnit ? ` / ${t.oldUnit}` : ''}` },
    { key: 'new', header: 'To', render: (t) => `${t.newDepartment}${t.newUnit ? ` / ${t.newUnit}` : ''}` },
    { key: 'reason', header: 'Reason' },
    { key: 'date', header: 'Effective Date', render: (t) => dayjs(t.effectiveDate).format('MMM D, YYYY') },
    { key: 'approved', header: 'Approved By', render: (t) => t.approvedBy },
    { key: 'status', header: 'Status', render: (t) => (
      <span className={t.status === 'COMPLETED' ? 'text-success' : t.status === 'PENDING' ? 'text-warning' : 'text-foreground'}>{t.status}</span>
    )},
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Transfers' }]} title="Transfers" description="Transfer personnel between departments, units, locations, and supervisors" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Transfer</Button>} />
      <PersonnelSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={transfers as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>

      <InitiateTransferModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

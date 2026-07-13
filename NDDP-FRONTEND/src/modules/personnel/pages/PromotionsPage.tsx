import { useState } from 'react';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { useGetPersonnelPromotionsQuery } from '../api/personnel.api';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { PromotionRecord } from '../constants/personnel-data';
import { InitiatePromotionModal } from '../components/InitiatePromotionModal';

export function PromotionsPage() {
  const { data: promotions = [], isLoading } = useGetPersonnelPromotionsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<PromotionRecord>[] = [
    { key: 'person', header: 'Personnel', render: (p) => <span className="font-medium">{p.personnelName}</span> },
    { key: 'old', header: 'Previous Position', render: (p) => p.oldPosition },
    { key: 'new', header: 'New Position', render: (p) => <span className="font-medium">{p.newPosition}</span> },
    { key: 'rank', header: 'Rank Change', render: (p) => p.oldRank && p.newRank ? `${p.oldRank} → ${p.newRank}` : '—' },
    { key: 'grade', header: 'Salary Grade', render: (p) => p.salaryGrade ?? '—' },
    { key: 'date', header: 'Effective Date', render: (p) => dayjs(p.effectiveDate).format('MMM D, YYYY') },
    { key: 'reason', header: 'Reason' },
    { key: 'approved', header: 'Approved By', render: (p) => p.approvedBy },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Promotions' }]} title="Promotions" description="Promotion workflow and history" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Promotion</Button>} />
      <PersonnelSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={promotions as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>

      <InitiatePromotionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

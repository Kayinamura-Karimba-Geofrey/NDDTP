import { useState } from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { RecruitmentSubNav } from '../components/RecruitmentSubNav';
import { RecruitmentStatusBadge } from '../components/RecruitmentStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { type Offer } from '../constants/recruitment-data';
import { useGetOffersQuery } from '../api/recruitment.api';
import { CreateOfferModal } from '../components/CreateOfferModal';

export function OfferManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: offers = [], isLoading } = useGetOffersQuery();

  const columns: DataTableColumn<Offer>[] = [
    { key: 'name', header: 'Candidate', render: (o) => <span className="font-medium">{o.candidateName}</span> },
    { key: 'pos', header: 'Position' },
    { key: 'dept', header: 'Department' },
    { key: 'start', header: 'Start Date', render: (o) => dayjs(o.startDate).format('MMM D, YYYY') },
    { key: 'expiry', header: 'Offer Expiry', render: (o) => dayjs(o.expiryDate).format('MMM D, YYYY') },
    { key: 'status', header: 'Status', render: (o) => <RecruitmentStatusBadge status={o.status} /> },
    { key: 'actions', header: 'Actions', render: (o) => (
      <div className="flex gap-1">
        {o.status === 'DRAFT' && <Button variant="ghost" size="sm" onClick={() => toast.success('Offer sent to candidate')}>Send</Button>}
        <Button variant="ghost" size="sm" onClick={() => toast('View offer document functionality coming soon')}>View</Button>
      </div>
    )},
  ];

  return (
    <div>
      <PageHeader 
        breadcrumbs={[{ label: 'Recruitment', path: '/recruitment/dashboard' }, { label: 'Offer Management' }]} 
        title="Offer Management" 
        description="Generate and manage employment offers" 
        actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Create Offer</Button>} 
      />
      <RecruitmentSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={offers as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>

      <CreateOfferModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

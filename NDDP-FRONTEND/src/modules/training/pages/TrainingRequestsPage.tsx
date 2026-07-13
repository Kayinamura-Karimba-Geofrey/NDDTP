import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useGetTrainingRequestsQuery } from '../api/training.api';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { TrainingRequest } from '../constants/training-data';
import dayjs from 'dayjs';
import { SubmitTrainingRequestModal } from '../components/SubmitTrainingRequestModal';

export function TrainingRequestsPage() {
  const { data: requests = [], isLoading } = useGetTrainingRequestsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<TrainingRequest>[] = [
    { key: 'emp', header: 'Personnel', render: (r) => <span className="font-medium">{r.personnelName}</span> },
    { key: 'course', header: 'Requested Course', render: (r) => r.requestedCourse },
    { key: 'priority', header: 'Priority' },
    { key: 'supervisor', header: 'Supervisor' },
    { key: 'submitted', header: 'Submitted', render: (r) => dayjs(r.submittedAt).format('MMM D, YYYY') },
    { key: 'status', header: 'Status', render: (r) => <TrainingStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Requests' }]} title="Training Requests" description="Personnel training requests and approval workflow" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Request</Button>} />
      <TrainingSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={requests as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>

      <SubmitTrainingRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

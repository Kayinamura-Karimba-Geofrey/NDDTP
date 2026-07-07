import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { TrainingSubNav } from '../components/TrainingSubNav';
import { TrainingStatusBadge } from '../components/TrainingStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_TRAINING_REQUESTS, type TrainingRequest } from '../constants/training-data';

export function TrainingRequestsPage() {
  const columns: DataTableColumn<TrainingRequest>[] = [
    { key: 'emp', header: 'Personnel', render: (r) => <span className="font-medium">{r.personnelName}</span> },
    { key: 'course', header: 'Requested Course' },
    { key: 'reason', header: 'Reason' },
    { key: 'priority', header: 'Priority' },
    { key: 'supervisor', header: 'Supervisor' },
    { key: 'status', header: 'Status', render: (r) => <TrainingStatusBadge status={r.status} /> },
    { key: 'submitted', header: 'Submitted', render: (r) => dayjs(r.submittedAt).format('MMM D, YYYY') },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Requests' }]} title="Training Requests" description="Personnel training requests and approval workflow" actions={<Button onClick={() => toast('Submit training request')}><FiPlus className="h-4 w-4" /> New Request</Button>} />
      <TrainingSubNav />
      <Card className="mb-4">
        <CardContent className="pt-4">
          <p className="mb-2 text-sm font-medium">Approval Workflow</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {['Personnel', 'Supervisor', 'Training Coordinator', 'Enrollment'].map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">{step}</span>
                {i < 3 && <span>↓</span>}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_TRAINING_REQUESTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

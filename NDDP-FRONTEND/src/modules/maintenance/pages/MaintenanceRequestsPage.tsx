import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { MaintenanceStatusBadge } from '../components/MaintenanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetMaintenanceRequestsQuery } from '../api/maintenance.api';
import type { MaintenanceRequest } from '../constants/maintenance-data';
import { CreateMaintenanceRequestModal } from '../components/CreateMaintenanceRequestModal';

export function MaintenanceRequestsPage() {
  const { data: requests = [], isLoading } = useGetMaintenanceRequestsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<MaintenanceRequest>[] = [
    { key: 'id', header: 'Request ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
    { key: 'category', header: 'Category', render: (r) => r.category },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'asset', header: 'Asset', render: (r) => r.asset },
    { key: 'priority', header: 'Priority', render: (r) => r.priority },
    { key: 'by', header: 'Requested By', render: (r) => r.requestedBy },
    { key: 'at', header: 'Requested At', render: (r) => r.requestedAt },
    { key: 'status', header: 'Status', render: (r) => <MaintenanceStatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      render: (r) => <Link to={`/maintenance/requests/${r.id}`}><Button size="sm" variant="outline">Open</Button></Link>,
    },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'Requests' }]} title="Maintenance Requests" description="Corrective, preventive, emergency, and inspection requests" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Request</Button>} />
      <MaintenanceSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={requests as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateMaintenanceRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

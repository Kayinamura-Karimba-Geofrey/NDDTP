import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { VisitorSubNav } from '../components/VisitorSubNav';
import { VisitorStatusBadge } from '../components/VisitorStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { useGetVisitSitesQuery } from '../api/visitor.api';
import type { VisitSite } from '../constants/visitor-data';
import { CreateVisitSiteModal } from '../components/CreateVisitSiteModal';

export function VisitorSitesPage() {
  const { data: sites = [], isLoading } = useGetVisitSitesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<VisitSite>[] = [
    { key: 'name', header: 'Site', render: (r) => <span className="font-medium">{r.name}</span> },
    { key: 'type', header: 'Type', render: (r) => r.type },
    { key: 'location', header: 'Location', render: (r) => r.location },
    { key: 'capacity', header: 'Capacity', render: (r) => r.capacity },
    { key: 'active', header: 'Active Visits', render: (r) => r.activeVisits },
    { key: 'status', header: 'Status', render: (r) => <VisitorStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Visitors', path: '/visitors/dashboard' }, { label: 'Sites' }]} title="Visit Sites" description="Controlled entry points — HQ, bases, clinics, and warehouses" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> New Site</Button>} />
      <VisitorSubNav />
      <Card><CardContent className="pt-6">
        {isLoading ? <div className="data-table-empty">Loading...</div> : (
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={sites as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        )}
      </CardContent></Card>
      <CreateVisitSiteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

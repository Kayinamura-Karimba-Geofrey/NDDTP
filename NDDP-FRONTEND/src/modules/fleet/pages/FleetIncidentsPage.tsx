import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { FleetSubNav } from '../components/FleetSubNav';
import { FleetStatusBadge } from '../components/FleetStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_INCIDENTS, type FleetIncident } from '../constants/fleet-data';

export function FleetIncidentsPage() {
  const columns: DataTableColumn<FleetIncident>[] = [
    { key: 'num', header: 'Incident #', render: (r) => <code className="text-xs">{r.incidentNumber}</code> },
    { key: 'vehicle', header: 'Vehicle' },
    { key: 'driver', header: 'Driver' },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('DD MMM YYYY') },
    { key: 'loc', header: 'Location' },
    { key: 'desc', header: 'Description', render: (r) => <span className="text-xs">{r.description}</span> },
    { key: 'sev', header: 'Severity' },
    { key: 'status', header: 'Status', render: (r) => <FleetStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Incidents' }]} title="Accident & Incident Management" description="Record incidents, damage assessment, and corrective actions" actions={<Button onClick={() => toast('Report incident')}><FiPlus className="h-4 w-4" /> Report Incident</Button>} />
      <FleetSubNav />
      <Card><CardContent className="pt-6"><DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_INCIDENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} /></CardContent></Card>
    </div>
  );
}

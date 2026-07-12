import { useState } from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { MedicalStatusBadge } from '../components/MedicalStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_INCIDENTS, type MedicalIncident } from '../constants/medical-data';
import { ReportIncidentModal } from '../components/ReportIncidentModal';

export function MedicalIncidentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns: DataTableColumn<MedicalIncident>[] = [
    { key: 'num', header: 'Incident #', render: (r) => <code className="text-xs">{r.incidentNumber}</code> },
    { key: 'emp', header: 'Personnel', render: (r) => <span className="font-medium">{r.personnelName}</span> },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('MMM D, YYYY') },
    { key: 'location', header: 'Location' },
    { key: 'description', header: 'Description' },
    { key: 'severity', header: 'Severity' },
    { key: 'status', header: 'Status', render: (r) => <MedicalStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Incidents' }]} title="Medical Incidents" description="Workplace medical incidents and follow-up" actions={<Button onClick={() => setIsModalOpen(true)}><FiPlus className="h-4 w-4" /> Report Incident</Button>} />
      <MedicalSubNav />
      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={MOCK_INCIDENTS as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>

      <ReportIncidentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

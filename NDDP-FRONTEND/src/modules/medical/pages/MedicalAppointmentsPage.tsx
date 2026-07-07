import { useState } from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useGetMedicalAppointmentsQuery } from '../api/medical.api';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { MedicalStatusBadge } from '../components/MedicalStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Button, Card, CardContent } from '@/components/ui';
import type { MedicalAppointment } from '../constants/medical-data';

export function MedicalAppointmentsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const { data, isLoading } = useGetMedicalAppointmentsQuery({ page: 1, limit: 50 });
  const rows = (data?.data ?? []).filter((r) => !statusFilter || r.status === statusFilter);

  const columns: DataTableColumn<MedicalAppointment>[] = [
    { key: 'num', header: 'Appointment #', render: (r) => <code className="text-xs">{r.appointmentNumber}</code> },
    { key: 'emp', header: 'Personnel', render: (r) => <span className="font-medium">{r.personnelName}</span> },
    { key: 'doctor', header: 'Medical Professional', render: (r) => r.medicalProfessional },
    { key: 'dept', header: 'Department' },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('MMM D, YYYY') },
    { key: 'time', header: 'Time' },
    { key: 'location', header: 'Location' },
    { key: 'type', header: 'Type' },
    { key: 'status', header: 'Status', render: (r) => <MedicalStatusBadge status={r.status} /> },
    { key: 'actions', header: 'Actions', render: () => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => toast('View appointment')}>View</Button>
        <Button variant="ghost" size="sm" onClick={() => toast('Rescheduled')}>Reschedule</Button>
      </div>
    ) },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Appointments' }]} title="Medical Appointments" description="Schedule and manage medical appointments" actions={<Button onClick={() => toast('Schedule appointment')}><FiPlus className="h-4 w-4" /> Schedule</Button>} />
      <MedicalSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {['', 'SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map((s) => (
              <button key={s || 'all'} type="button" onClick={() => setStatusFilter(s)} className={`rounded-full px-3 py-1 text-xs font-medium ${statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{s ? s.replace(/_/g, ' ') : 'All'}</button>
            ))}
          </div>
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={rows as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

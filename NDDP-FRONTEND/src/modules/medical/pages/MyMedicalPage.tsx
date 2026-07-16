import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { MedicalStatusBadge } from '../components/MedicalStatusBadge';
import { useGetMedicalAppointmentsQuery } from '../api/medical.api';
import { MY_MEDICAL_STATUS, MOCK_DOCUMENTS, MOCK_VACCINATIONS } from '../constants/medical-data';
import type { MedicalAppointment } from '../constants/medical-data';

export function MyMedicalPage() {
  const { data } = useGetMedicalAppointmentsQuery({ page: 1, limit: 10, mine: true });
  const myAppointments = data?.data ?? [];

  const columns: DataTableColumn<MedicalAppointment>[] = [
    { key: 'type', header: 'Appointment' },
    { key: 'date', header: 'Date', render: (r) => dayjs(r.date).format('MMM D, YYYY') },
    { key: 'time', header: 'Time' },
    { key: 'doctor', header: 'Doctor', render: (r) => r.medicalProfessional },
    { key: 'location', header: 'Location' },
    { key: 'status', header: 'Status', render: (r) => <MedicalStatusBadge status={r.status} /> },
  ];

  const myDocs = MOCK_DOCUMENTS.filter((d) => d.personnelName === 'Patrick Habimana');
  const myVaccines = MOCK_VACCINATIONS.filter((v) => v.personnelName === 'Patrick Habimana');

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'My Medical' }]} title="My Medical" description="Your personal medical information — visible only to you and authorized medical staff" />
      <MedicalSubNav />
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div><p className="text-xs text-muted-foreground">Clearance Status</p><p className="mt-1 font-semibold"><MedicalStatusBadge status="CLEARED" /></p></div>
          <div><p className="text-xs text-muted-foreground">Fitness Status</p><p className="mt-1 font-semibold">{MY_MEDICAL_STATUS.fitnessStatus}</p></div>
          <div><p className="text-xs text-muted-foreground">Next Assessment</p><p className="mt-1 font-semibold">{dayjs(MY_MEDICAL_STATUS.nextAssessmentDate).format('MMM D, YYYY')}</p></div>
          <div><p className="text-xs text-muted-foreground">Restrictions</p><p className="mt-1 font-semibold">{MY_MEDICAL_STATUS.restrictions ?? 'None'}</p></div>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Upcoming Appointments</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={myAppointments as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
        </CardContent>
      </Card>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Medical Documents</CardTitle></CardHeader>
          <CardContent className="pt-4 space-y-2">
            {myDocs.map((d) => (
              <div key={d.id} className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
                <span>{d.name}</span>
                <Link to="/medical/documents" className="text-xs underline">View</Link>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Vaccination Summary</CardTitle></CardHeader>
          <CardContent className="pt-4 space-y-2">
            {myVaccines.map((v) => (
              <div key={v.id} className="rounded-lg border border-border p-3 text-sm">
                <p className="font-medium">{v.vaccine} — {v.dose}</p>
                <p className="text-muted-foreground">{dayjs(v.administrationDate).format('MMM D, YYYY')}{v.nextDueDate ? ` · Next: ${dayjs(v.nextDueDate).format('MMM D, YYYY')}` : ''}</p>
                <MedicalStatusBadge status={v.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

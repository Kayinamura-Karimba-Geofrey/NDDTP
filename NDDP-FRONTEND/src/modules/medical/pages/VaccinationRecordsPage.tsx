import dayjs from 'dayjs';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { MedicalStatusBadge } from '../components/MedicalStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { useGetVaccinationRecordsQuery } from '../api/medical.api';
import type { VaccinationRecord } from '../constants/medical-data';

export function VaccinationRecordsPage() {
  const { data: vaccinations = [], isLoading } = useGetVaccinationRecordsQuery();

  const columns: DataTableColumn<VaccinationRecord>[] = [
    { key: 'emp', header: 'Personnel', render: (r) => <span className="font-medium">{r.personnelName}</span> },
    { key: 'vaccine', header: 'Vaccine' },
    { key: 'dose', header: 'Dose' },
    { key: 'admin', header: 'Administration Date', render: (r) => dayjs(r.administrationDate).format('MMM D, YYYY') },
    { key: 'next', header: 'Next Due', render: (r) => r.nextDueDate ? dayjs(r.nextDueDate).format('MMM D, YYYY') : '—' },
    { key: 'provider', header: 'Provider' },
    { key: 'status', header: 'Status', render: (r) => <MedicalStatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Vaccinations' }]} title="Vaccination Records" description="Vaccination history per organizational policy" />
      <MedicalSubNav />
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={vaccinations as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

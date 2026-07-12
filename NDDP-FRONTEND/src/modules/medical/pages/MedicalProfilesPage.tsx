import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { MedicalStatusBadge } from '../components/MedicalStatusBadge';
import { useGetMedicalProfilesQuery } from '../api/medical.api';
import type { MedicalProfile } from '../constants/medical-data';

export function MedicalProfilesPage() {
  const { data: profiles = [], isLoading } = useGetMedicalProfilesQuery();

  const columns: DataTableColumn<MedicalProfile>[] = [
    { key: 'name', header: 'Personnel', render: (r) => <Link to={`/medical/profiles/${r.id}`} className="font-medium underline">{r.firstName} {r.lastName}</Link> },
    { key: 'num', header: 'Personnel #', render: (r) => <code className="text-xs">{r.personnelNumber}</code> },
    { key: 'dept', header: 'Department' },
    { key: 'age', header: 'Age' },
    { key: 'blood', header: 'Blood Group', render: (r) => r.bloodGroup ?? '—' },
    { key: 'status', header: 'Medical Status', render: (r) => <MedicalStatusBadge status={r.medicalStatus} /> },
    { key: 'fitness', header: 'Fitness', render: (r) => r.fitnessStatus },
    { key: 'clearance', header: 'Clearance', render: (r) => <MedicalStatusBadge status={r.clearanceStatus === 'Cleared' ? 'CLEARED' : 'RESTRICTED'} /> },
  ];

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Profiles' }]} title="Medical Profiles" description="Occupational health records — authorized medical personnel only" />
      <MedicalSubNav />
      <Card className="mb-4 border-warning/30 bg-warning/5">
        <CardContent className="pt-4 text-sm text-muted-foreground">Access to medical profiles is restricted. All views are audit-logged.</CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          {isLoading ? <div className="data-table-empty">Loading...</div> : (
            <DataTable columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]} rows={profiles as unknown as Record<string, unknown>[]} rowKey={(r) => String(r.id)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

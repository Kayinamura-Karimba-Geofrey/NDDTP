import dayjs from 'dayjs';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { MedicalStatusBadge } from '../components/MedicalStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useGetFitnessRecordsQuery } from '../api/medical.api';

export function MedicalFitnessPage() {
  const { data: records = [], isLoading } = useGetFitnessRecordsQuery();

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Fitness' }]} title="Medical Fitness" description="Fitness-for-duty status and restrictions" />
      <MedicalSubNav />
      {isLoading ? (
        <div className="data-table-empty">Loading...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {records.map((f) => (
            <Card key={f.id}>
              <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">{f.personnelName}</CardTitle></CardHeader>
              <CardContent className="space-y-2 pt-4 text-sm">
                <p><MedicalStatusBadge status={f.status} /></p>
                <p><strong>Classification:</strong> {f.classification}</p>
                {f.restrictions && <p><strong>Restrictions:</strong> {f.restrictions}</p>}
                <p><strong>Review Date:</strong> {dayjs(f.reviewDate).format('MMM D, YYYY')}</p>
                {f.notes && <p className="text-muted-foreground">{f.notes}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

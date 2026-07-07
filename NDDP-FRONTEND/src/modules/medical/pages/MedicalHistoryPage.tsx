import dayjs from 'dayjs';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_MEDICAL_HISTORY } from '../constants/medical-data';

export function MedicalHistoryPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'History' }]} title="Medical History" description="Chronological timeline of medical interactions" />
      <MedicalSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {MOCK_MEDICAL_HISTORY.map((entry, i) => (
              <div key={entry.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  {i < MOCK_MEDICAL_HISTORY.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="pb-6">
                  <p className="text-xs text-muted-foreground">{dayjs(entry.date).format('MMM D, YYYY')}</p>
                  <p className="font-medium">{entry.event}</p>
                  <p className="text-sm text-muted-foreground">{entry.personnelName} — {entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

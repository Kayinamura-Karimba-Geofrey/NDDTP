import dayjs from 'dayjs';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_SERVICE_HISTORY } from '../constants/personnel-data';

export function EmploymentHistoryPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Employment History' }]} title="Employment History" description="Complete employment timeline — appointments, transfers, promotions, contract renewals" />
      <PersonnelSubNav />
      <Card>
        <CardContent className="pt-6">
          <ol className="relative border-l border-border pl-6">
            {MOCK_SERVICE_HISTORY.map((entry) => (
              <li key={entry.id} className="mb-6 ml-2">
                <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-background bg-primary" />
                <time className="text-xs text-muted-foreground">{dayjs(entry.date).format('MMM D, YYYY')}</time>
                <p className="font-medium text-foreground">{entry.event}</p>
                <p className="text-sm text-muted-foreground">{entry.description}</p>
                {entry.performedBy && <p className="text-xs text-muted-foreground">By {entry.performedBy}</p>}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

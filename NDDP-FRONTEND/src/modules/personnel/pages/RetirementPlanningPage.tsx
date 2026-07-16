import dayjs from 'dayjs';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { UPCOMING_RETIREMENTS, MOCK_PERSONNEL } from '../constants/personnel-data';

export function RetirementPlanningPage() {
  const nearRetirement = MOCK_PERSONNEL.filter((p) => p.yearsOfService >= 20);

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Retirement Planning' }]} title="Retirement Planning" description="Personnel approaching retirement and succession planning" />
      <PersonnelSubNav />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-4 font-semibold">Upcoming Retirements</h3>
            <ul className="space-y-3">
              {UPCOMING_RETIREMENTS.map((r) => (
                <li key={r.name} className="flex justify-between border-b border-border pb-2">
                  <div><p className="font-medium">{r.name}</p><p className="text-xs text-muted-foreground">{r.department}</p></div>
                  <time className="text-sm text-muted-foreground">{dayjs(r.date).format('MMM D, YYYY')}</time>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-4 font-semibold">Long Service (20+ years)</h3>
            <ul className="space-y-3">
              {nearRetirement.map((p) => (
                <li key={p.id} className="flex justify-between border-b border-border pb-2">
                  <span className="font-medium">{p.firstName} {p.lastName}</span>
                  <span className="text-sm text-muted-foreground">{p.yearsOfService} yrs · {p.position}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

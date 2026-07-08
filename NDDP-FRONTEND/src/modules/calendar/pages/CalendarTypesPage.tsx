import { CalendarSubNav } from '../components/CalendarSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { EVENTS_BY_TYPE } from '../constants/calendar-data';

const TYPE_META = [
  { type: 'MEETING', label: 'Meeting', description: 'Operational and leadership meetings', key: 'Meeting' },
  { type: 'TRAINING', label: 'Training', description: 'Courses, drills, and learning sessions', key: 'Training' },
  { type: 'CEREMONY', label: 'Ceremony', description: 'Official ceremonies and commemorations', key: 'Ceremony' },
  { type: 'LEAVE_BLOCK', label: 'Leave Block', description: 'Approved leave blocks synced from Leave Service', key: 'Leave Block' },
  { type: 'OTHER', label: 'Other', description: 'Miscellaneous scheduled activities', key: 'Other' },
];

export function CalendarTypesPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Calendar', path: '/calendar/dashboard' }, { label: 'Types' }]} title="Event Types" description="Supported calendar event types across organizational scheduling" />
      <CalendarSubNav />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TYPE_META.map((item) => {
          const count = EVENTS_BY_TYPE.find((e) => e.name === item.key)?.value ?? 0;
          return (
            <Card key={item.type}>
              <CardContent className="pt-6">
                <h3 className="font-medium">{item.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                <p className="mt-3 text-2xl font-bold">{count}</p>
                <p className="text-xs text-muted-foreground">events (sample)</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

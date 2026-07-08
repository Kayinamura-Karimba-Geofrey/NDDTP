import { AuditSubNav } from '../components/AuditSubNav';
import { AuditStatusBadge } from '../components/AuditStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_INCIDENTS } from '../constants/audit-data';

export function IncidentTimelinePage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'Incidents' }]} title="Incident Timeline" description="Incident history from detection through investigation, resolution, and closure" />
      <AuditSubNav />
      <div className="space-y-6">
        {MOCK_INCIDENTS.map((incident) => (
          <Card key={incident.id}>
            <CardContent className="pt-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-medium">{incident.title}</h3>
                  <p className="text-xs text-muted-foreground">{incident.id} · Started {incident.startedAt}</p>
                </div>
                <div className="flex gap-2">
                  <AuditStatusBadge status={incident.severity} />
                  <AuditStatusBadge status={incident.status} />
                </div>
              </div>
              <div className="relative space-y-0">
                {incident.timeline.map((event, i) => (
                  <div key={event.id} className="flex gap-4 pb-6 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</div>
                      {i < incident.timeline.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                      <p className="font-medium">{event.event}</p>
                      {event.actor && <p className="text-sm text-muted-foreground">{event.actor}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

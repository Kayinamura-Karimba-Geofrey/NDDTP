import { AuditSubNav } from '../components/AuditSubNav';
import { AuditStatusBadge } from '../components/AuditStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_TRACES } from '../constants/audit-data';

export function DistributedTracingPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Audit', path: '/audit/dashboard' }, { label: 'Tracing' }]} title="Distributed Tracing" description="End-to-end request traces across microservices using correlation IDs" />
      <AuditSubNav />
      <div className="space-y-6">
        {MOCK_TRACES.map((trace) => (
          <Card key={trace.id}>
            <CardContent className="pt-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-medium">{trace.rootOperation}</h3>
                  <p className="text-xs text-muted-foreground">Correlation: <code>{trace.correlationId}</code> · Started {trace.startedAt} · {trace.totalDuration}</p>
                </div>
                <AuditStatusBadge status={trace.status} />
              </div>
              <div className="relative space-y-0">
                {trace.spans.map((span, i) => (
                  <div key={span.id} className="flex gap-4 pb-6 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</div>
                      {i < trace.spans.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
                    </div>
                    <div>
                      <p className="font-medium">{span.service}</p>
                      <p className="text-sm text-muted-foreground">{span.operation} · {span.duration}</p>
                      <AuditStatusBadge status={span.status} />
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

import dayjs from 'dayjs';
import { FinanceSubNav } from '../components/FinanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_AUDIT_HISTORY } from '../constants/finance-data';

export function FinanceAuditPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Audit & Compliance' }]} title="Audit & Compliance" description="Full traceability of every financial transaction and configuration change" />
      <FinanceSubNav />
      <Card>
        <CardContent className="space-y-3 pt-6">
          {MOCK_AUDIT_HISTORY.map((e) => (
            <div key={e.id} className="rounded-lg border border-border p-4">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{e.event}</p>
                <p className="text-xs text-muted-foreground">{dayjs(e.date).format('DD MMM YYYY HH:mm')}</p>
              </div>
              <p className="text-sm text-muted-foreground">{e.description}</p>
              <p className="mt-1 text-xs">By: {e.performedBy}</p>
              {e.previousValue && e.newValue && (
                <p className="mt-1 text-xs text-muted-foreground">{e.previousValue} → {e.newValue}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

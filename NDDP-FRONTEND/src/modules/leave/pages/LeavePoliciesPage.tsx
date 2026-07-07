import { LeaveSubNav } from '../components/LeaveSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MOCK_POLICIES } from '../constants/leave-data';

export function LeavePoliciesPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Leave', path: '/leave/dashboard' }, { label: 'Leave Policies' }]} title="Leave Policies" description="Organization leave rules and compliance settings" />
      <LeaveSubNav />
      <Card>
        <CardContent className="pt-6">
          <dl className="space-y-4">
            {MOCK_POLICIES.map((p) => (
              <div key={p.id} className="flex justify-between border-b border-border pb-3 last:border-0">
                <div><dt className="font-medium">{p.name}</dt><dd className="text-sm text-muted-foreground">{p.rule}</dd></div>
                <dd className="text-sm font-medium">{p.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

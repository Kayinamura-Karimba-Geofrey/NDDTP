import { AssetSubNav } from '../components/AssetSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';

const STAGES = ['Requested', 'Purchased', 'Received', 'Registered', 'Assigned', 'Maintained', 'Transferred', 'Returned', 'Retired', 'Disposed'];

export function AssetLifecyclePage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Assets', path: '/assets/dashboard' }, { label: 'Lifecycle' }]} title="Asset Lifecycle" description="End-to-end asset lifecycle stages" />
      <AssetSubNav />
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-2">
            {STAGES.map((stage, i) => (
              <span key={stage} className="flex items-center gap-2">
                <span className="rounded-lg border border-border px-3 py-2 text-sm font-medium">{stage}</span>
                {i < STAGES.length - 1 && <span className="text-muted-foreground">↓</span>}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">Each stage transition is recorded in the audit trail. View individual asset lifecycle from the asset profile.</p>
        </CardContent>
      </Card>
    </div>
  );
}

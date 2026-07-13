import { useGetDevelopmentPlansQuery, useCreateDevelopmentPlanMutation } from '../api/performance.api';
import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PerformanceStatusBadge } from '../components/PerformanceStatusBadge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, Button } from '@/components/ui';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

export function DevelopmentPlansPage() {
  const { data: plans = [], isLoading } = useGetDevelopmentPlansQuery();
  const [createPlan, { isLoading: isCreating }] = useCreateDevelopmentPlanMutation();

  const handleCreate = async () => {
    try {
      await createPlan({ status: 'DRAFT' }).unwrap();
      toast.success('Development plan created');
    } catch {
      toast.error('Failed to create development plan');
    }
  };

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Development Plans' }]} title="Individual Development Plans" description="Career development — integrates with Training Service" actions={<Button onClick={handleCreate} isLoading={isCreating}><FiPlus className="h-4 w-4" /> Create IDP</Button>} />
      <PerformanceSubNav />
      {isLoading ? <div className="data-table-empty">Loading...</div> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <Card key={p.id}>
              <CardContent className="pt-6 space-y-3">
                <div>
                  <p className="font-semibold">{p.employee}</p>
                  <p className="text-sm text-muted-foreground">{p.careerGoals}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{p.progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
                <PerformanceStatusBadge status={p.status} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

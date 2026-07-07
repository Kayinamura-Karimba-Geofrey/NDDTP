import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import { APPROVAL_LEVELS } from '../constants/authorization-data';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export function ApprovalLevelsPage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authorization', path: '/administration/authorization' }, { label: 'Approval Levels' }]}
        title="Approval Levels"
        description="Configure multi-level approval workflows"
      />
      <AuthorizationSubNav />
      <div className="space-y-6">
        {APPROVAL_LEVELS.map((workflow) => (
          <Card key={workflow.id}>
            <CardHeader>
              <CardTitle className="text-base">{workflow.workflow}</CardTitle>
              <p className="text-sm text-muted-foreground">Escalation: {workflow.escalationRule}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-0">
                {workflow.levels.map((level, index) => (
                  <div key={level.name} className="flex w-full max-w-md flex-col items-center">
                    <div className="w-full rounded-lg border border-border bg-card px-4 py-3 text-center">
                      <p className="font-medium text-foreground">{level.name}</p>
                      <p className="text-xs text-muted-foreground">{level.role}{level.timeLimitHours > 0 ? ` · ${level.timeLimitHours}h limit` : ''}</p>
                    </div>
                    {index < workflow.levels.length - 1 && (
                      <div className="flex h-8 flex-col items-center justify-center text-muted-foreground">↓</div>
                    )}
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

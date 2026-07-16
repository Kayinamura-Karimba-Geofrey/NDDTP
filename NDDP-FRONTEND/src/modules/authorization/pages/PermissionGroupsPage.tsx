import { FiLayers } from 'react-icons/fi';
import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import { PERMISSION_GROUPS } from '../constants/authorization-data';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';

export function PermissionGroupsPage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authorization', path: '/administration/authorization' }, { label: 'Permission Groups' }]}
        title="Permission Groups"
        description="Organize permissions into logical groups"
      />
      <AuthorizationSubNav />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PERMISSION_GROUPS.map((group) => (
          <Card key={group.id} className="hover:shadow-[var(--shadow-elevated)] transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <FiLayers className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{group.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
                  <dl className="mt-3 flex gap-4 text-xs">
                    <div><dt className="text-muted-foreground">Permissions</dt><dd className="font-semibold text-foreground">{group.permissionCount}</dd></div>
                    <div><dt className="text-muted-foreground">Roles</dt><dd className="font-semibold text-foreground">{group.assignedRoleCount}</dd></div>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

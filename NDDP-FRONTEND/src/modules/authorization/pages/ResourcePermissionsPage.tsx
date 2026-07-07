import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import { PermissionMatrix } from '../components/PermissionMatrix';
import {
  RESOURCE_MATRIX_RESOURCES,
  RESOURCE_MATRIX_ROLES,
  RESOURCE_MATRIX_ACTIONS,
} from '../constants/authorization-data';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

function buildDefaultMatrix() {
  const values: Record<string, Record<string, boolean[]>> = {};
  for (const resource of RESOURCE_MATRIX_RESOURCES) {
    values[resource] = {};
    for (const role of RESOURCE_MATRIX_ROLES) {
      values[resource][role] = RESOURCE_MATRIX_ACTIONS.map((_, i) => {
        if (role === 'System Admin') return true;
        if (role === 'HR Officer' && resource.includes('Personnel')) return i < 4;
        if (role === 'Finance Officer' && resource.includes('Finance')) return i < 5;
        return i === 0;
      });
    }
  }
  return values;
}

export function ResourcePermissionsPage() {
  const matrix = useMemo(() => buildDefaultMatrix(), []);

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authorization', path: '/administration/authorization' }, { label: 'Resource Permissions' }]}
        title="Resource Permissions"
        description="Control access to system resources by role"
        actions={<Button onClick={() => toast.success('Matrix saved')}>Save Changes</Button>}
      />
      <AuthorizationSubNav />
      <Card>
        <CardContent className="pt-6">
          <PermissionMatrix
            rows={RESOURCE_MATRIX_RESOURCES}
            columns={RESOURCE_MATRIX_ROLES}
            actions={RESOURCE_MATRIX_ACTIONS}
            values={matrix}
            onToggle={() => toast('Permission updated')}
          />
        </CardContent>
      </Card>
    </div>
  );
}

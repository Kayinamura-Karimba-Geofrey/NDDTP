import toast from 'react-hot-toast';
import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import { RoleHierarchyTree } from '../components/RoleHierarchyTree';
import { ROLE_HIERARCHY } from '../constants/authorization-data';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui';

export function RoleHierarchyPage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authorization', path: '/administration/authorization' }, { label: 'Role Hierarchy' }]}
        title="Role Hierarchy"
        description="Visualize and manage the organizational role structure"
        actions={<Button onClick={() => toast('Create root role')}>Create Role</Button>}
      />
      <AuthorizationSubNav />
      <RoleHierarchyTree
        nodes={ROLE_HIERARCHY}
        onEdit={(n) => toast(`Edit ${n.name}`)}
        onDelete={(n) => toast.error(`Delete ${n.name}`)}
        onCreateChild={(n) => toast(`Create child under ${n.name}`)}
      />
    </div>
  );
}

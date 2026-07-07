import { RoleHierarchyTree, type HierarchyNode } from '@/modules/authorization/components/RoleHierarchyTree';
import { ORG_TREE } from '../constants/users-data';
import { PageHeader } from '@/components/shared/PageHeader';
import { UserSubNav } from '../components/UserSubNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import toast from 'react-hot-toast';

export function OrganizationalAssignmentsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'User Management', path: '/users/dashboard' }, { label: 'Organization' }]} title="Organizational Assignments" description="Department → Division → Section → Unit → Position → Supervisor" />
      <UserSubNav />
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Assignment Flow</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-foreground">
            {['Department', 'Division', 'Section', 'Unit', 'Position', 'Supervisor'].map((s, i, arr) => (
              <span key={s} className="flex items-center gap-2">
                <span className="rounded-lg border border-border px-3 py-2">{s}</span>
                {i < arr.length - 1 && <span className="text-muted-foreground">↓</span>}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
      <RoleHierarchyTree
        nodes={ORG_TREE as HierarchyNode[]}
        onEdit={(n) => toast(`Edit ${n.name}`)}
        onDelete={(n) => toast.error(`Delete ${n.name}`)}
        onCreateChild={(n) => toast(`Add unit under ${n.name}`)}
      />
    </div>
  );
}

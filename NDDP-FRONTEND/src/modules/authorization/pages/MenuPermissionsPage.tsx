import { useState } from 'react';
import toast from 'react-hot-toast';
import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import { MENU_TREE } from '../constants/authorization-data';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

const ROLES = ['HR Officer', 'Finance Officer', 'Logistics Officer'] as const;

function MenuTreeItem({ label, depth, role }: { label: string; depth: number; role: string }) {
  const [visible, setVisible] = useState(role === 'HR Officer' ? !label.includes('Finance') && !label.includes('Fleet') : label === 'Finance' || label === 'Dashboard');
  return (
    <label className="flex items-center gap-2 py-1.5" style={{ paddingLeft: `${depth * 20}px` }}>
      <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} className="rounded border-border" />
      <span className="text-sm text-foreground">{label}</span>
    </label>
  );
}

export function MenuPermissionsPage() {
  const [selectedRole, setSelectedRole] = useState<string>(ROLES[0]);

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authorization', path: '/administration/authorization' }, { label: 'Menu Permissions' }]}
        title="Menu Permissions"
        description="Control navigation menu visibility by role"
        actions={<Button onClick={() => toast.success('Menu permissions saved')}>Save</Button>}
      />
      <AuthorizationSubNav />
      <div className="mb-4 flex gap-2">
        {ROLES.map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => setSelectedRole(role)}
            className={`rounded-lg px-3 py-2 text-sm font-medium ${selectedRole === role ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          >
            {role}
          </button>
        ))}
      </div>
      <Card>
        <CardContent className="pt-6">
          {MENU_TREE.map((item) => (
            <div key={item.id}>
              <MenuTreeItem label={item.label} depth={0} role={selectedRole} />
              {item.children?.map((child) => (
                <MenuTreeItem key={child.id} label={child.label} depth={1} role={selectedRole} />
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

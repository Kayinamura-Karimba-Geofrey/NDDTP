import toast from 'react-hot-toast';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';
import { AdminSubNav } from '../components/AdminSubNav';

export function ConfigCreateNamespacePage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'System Admin', path: '/administration/dashboard' }, { label: 'Namespaces', path: '/administration/namespaces' }, { label: 'New' }]} title="Create Namespace" description="Register a new configuration namespace" />
      <AdminSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Code" defaultValue="NS-CUSTOM" />
          <Input label="Name" defaultValue="Custom Module" />
          <Input label="Description" defaultValue="Custom configuration namespace" className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <Button onClick={() => toast.success('Namespace created')}>Create Namespace</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

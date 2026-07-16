import toast from 'react-hot-toast';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
import { AdminSubNav } from '../components/AdminSubNav';

export function AdminSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'System Admin', path: '/administration/dashboard' }, { label: 'Settings' }]} title="Administration Settings" description="Defaults for configuration governance and change control" />
      <AdminSubNav />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Change control</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <Input label="Require approval to activate" defaultValue="Yes — dual control" />
            <Input label="Auto-deprecate unused keys (days)" defaultValue="90" type="number" />
            <Input label="Revision retention (days)" defaultValue="365" type="number" />
            <Button onClick={() => toast.success('Change control settings saved')}>Save</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-border pb-3"><CardTitle className="text-sm">Environment defaults</CardTitle></CardHeader>
          <CardContent className="grid gap-4 pt-4">
            <Input label="Default environment scope" defaultValue="ALL" />
            <Input label="Production write lock" defaultValue="Enabled for non-SUPER_ADMIN" />
            <Input label="Health probe interval (seconds)" defaultValue="30" type="number" />
            <Button onClick={() => toast.success('Environment defaults saved')}>Save</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

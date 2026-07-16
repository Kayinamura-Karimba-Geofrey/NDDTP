import toast from 'react-hot-toast';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';
import { AdminSubNav } from '../components/AdminSubNav';
import { useGetConfigNamespacesQuery } from '../api/configuration.api';

export function ConfigCreateEntryPage() {
  const { data: namespaces = [] } = useGetConfigNamespacesQuery();
  const active = namespaces.filter((n) => n.status === 'ACTIVE');

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'System Admin', path: '/administration/dashboard' }, { label: 'Entries', path: '/administration/entries' }, { label: 'New' }]} title="Create Config Entry" description="Add a draft configuration key under a namespace" />
      <AdminSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">Namespace</label>
            <select className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" defaultValue={active[0]?.id}>
              {active.map((n) => <option key={n.id} value={n.id}>{n.code} — {n.name}</option>)}
            </select>
          </div>
          <Input label="Key" defaultValue="feature.new_flag" />
          <Input label="Value type" defaultValue="BOOLEAN" />
          <Input label="Value" defaultValue="false" />
          <Input label="Environment" defaultValue="ALL" />
          <Input label="Description" defaultValue="Feature toggle description" className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <Button onClick={() => toast.success('Entry created as draft')}>Create Entry</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

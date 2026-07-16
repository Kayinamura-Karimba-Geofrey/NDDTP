import { useState } from 'react';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import { AuthorizationSubNav } from '../components/AuthorizationSubNav';
import { MOCK_POLICIES } from '../constants/authorization-data';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';

export function AccessPoliciesPage() {
  const [selected, setSelected] = useState(MOCK_POLICIES[0]);

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Authorization', path: '/administration/authorization' }, { label: 'Access Policies' }]}
        title="Access Policies"
        description="Organization-wide authorization rules"
        actions={<Button onClick={() => toast('New policy')}><FiPlus className="h-4 w-4" /> New Policy</Button>}
      />
      <AuthorizationSubNav />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-2">
          {MOCK_POLICIES.map((policy) => (
            <button
              key={policy.id}
              type="button"
              onClick={() => setSelected(policy)}
              className={`w-full rounded-lg border p-4 text-left transition-colors ${selected.id === policy.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'}`}
            >
              <p className="font-medium text-foreground">{policy.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{policy.module} · {policy.status}</p>
            </button>
          ))}
        </div>
        <Card className="lg:col-span-2">
          <CardContent className="space-y-4 pt-6">
            <div>
              <h3 className="text-lg font-semibold">{selected.name}</h3>
              <p className="text-sm text-muted-foreground">{selected.description}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Rule Expression</label>
              <textarea
                className="mt-1.5 w-full rounded-lg border border-border bg-card p-3 font-mono text-sm text-foreground"
                rows={4}
                defaultValue={selected.rule}
                onChange={() => toast('Rule updated', { id: 'rule' })}
              />
            </div>
            <p className="text-xs text-muted-foreground">Last updated: {dayjs(selected.updatedAt).format('MMM D, YYYY')}</p>
            <Button onClick={() => toast.success('Policy saved')}>Save Policy</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

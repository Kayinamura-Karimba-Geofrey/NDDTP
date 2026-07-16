import { FinanceSubNav } from '../components/FinanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function FinanceSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Finance', path: '/finance/dashboard' }, { label: 'Settings' }]} title="Financial Settings" description="Fiscal year rules, approval thresholds, payment methods, templates" />
      <FinanceSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Fiscal Year Start" defaultValue="July 1" />
          <Input label="Currency" defaultValue="RWF — Rwandan Franc" />
          <Input label="Approval Thresholds" defaultValue="Manager: 5M · Finance: 50M · Executive: 200M+" className="sm:col-span-2" />
          <Input label="Payment Methods" defaultValue="Bank Transfer, Electronic Payment, Cheque" className="sm:col-span-2" />
          <Input label="Budget Categories" defaultValue="Personnel, Operations, Capital, Maintenance, Training" className="sm:col-span-2" />
          <Input label="Number Formats" defaultValue="BUD-{DEPT}-{YEAR}, EXP-{YEAR}-{SEQ}" className="sm:col-span-2" />
          <Input label="ERP Integration" defaultValue="Optional — connect to external accounting platform" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}

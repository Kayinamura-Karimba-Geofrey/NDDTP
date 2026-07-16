import { ProcurementSubNav } from '../components/ProcurementSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function ProcurementSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Procurement', path: '/procurement/dashboard' }, { label: 'Settings' }]} title="Procurement Settings" description="Methods, approval levels, tender thresholds, and templates" />
      <ProcurementSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Procurement Methods" defaultValue="Direct, RFQ, Tender, Framework Agreement" className="sm:col-span-2" />
          <Input label="Tender Threshold" defaultValue="50,000,000 RWF" />
          <Input label="RFQ Threshold" defaultValue="5,000,000 RWF" />
          <Input label="Approval Levels" defaultValue="Manager → Procurement → Finance (by amount)" className="sm:col-span-2" />
          <Input label="PO Template" defaultValue="Standard MOD Purchase Order v2.1" className="sm:col-span-2" />
          <Input label="Contract Template" defaultValue="Supply Agreement, Construction, Services" className="sm:col-span-2" />
          <Input label="Evaluation Criteria" defaultValue="Technical 60%, Financial 40%" className="sm:col-span-2" />
          <Input label="Notification Templates" defaultValue="RFQ invite, PO issued, Approval request, Contract renewal" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}

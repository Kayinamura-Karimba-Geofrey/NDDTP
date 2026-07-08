import toast from 'react-hot-toast';
import { VisitorSubNav } from '../components/VisitorSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function VisitorRegisterPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Visitors', path: '/visitors/dashboard' }, { label: 'Directory', path: '/visitors/directory' }, { label: 'Register' }]} title="Register Visitor" description="Capture visitor identity, organization, and document details" />
      <VisitorSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Full Name" defaultValue="New Visitor" className="sm:col-span-2" />
          <Input label="Organization" defaultValue="External Partner" />
          <Input label="Phone" defaultValue="+250788000000" />
          <Input label="Email" defaultValue="visitor@example.rw" />
          <Input label="ID Document Type" defaultValue="NATIONAL_ID" />
          <Input label="ID Number" defaultValue="1198xxxxx01" className="sm:col-span-2" />
          <Input label="Notes" defaultValue="First-time visitor — escort required" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button onClick={() => toast('Visitor registered')}>Register</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}

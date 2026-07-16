import toast from 'react-hot-toast';
import { MaintenanceSubNav } from '../components/MaintenanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function MaintenanceCreateRequestPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Maintenance', path: '/maintenance/dashboard' }, { label: 'Requests', path: '/maintenance/requests' }, { label: 'New' }]} title="New Maintenance Request" description="Submit preventive, corrective, emergency, or inspection work" />
      <MaintenanceSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Title" defaultValue="AC Unit Failure — Boardroom" className="sm:col-span-2" />
          <Input label="Category" defaultValue="HVAC" />
          <Input label="Type" defaultValue="CORRECTIVE" />
          <Input label="Asset Reference" defaultValue="HVAC-HQ-04" />
          <Input label="Priority" defaultValue="HIGH" />
          <Input label="Location / Site" defaultValue="HQ Boardroom" className="sm:col-span-2" />
          <Input label="Description" defaultValue="Unit not cooling; possible compressor fault" className="sm:col-span-2" />
          <div className="sm:col-span-2 flex gap-2">
            <Button onClick={() => toast('Request submitted')}>Submit</Button>
            <Button variant="outline" onClick={() => toast('Draft saved')}>Save Draft</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

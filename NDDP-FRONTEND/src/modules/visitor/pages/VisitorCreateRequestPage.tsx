import toast from 'react-hot-toast';
import { VisitorSubNav } from '../components/VisitorSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function VisitorCreateRequestPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Visitors', path: '/visitors/dashboard' }, { label: 'Requests', path: '/visitors/requests' }, { label: 'New' }]} title="New Visit Request" description="Schedule a visitor appointment for host approval and gate check-in" />
      <VisitorSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Visitor" defaultValue="Paul Kagabo" className="sm:col-span-2" />
          <Input label="Host" defaultValue="HR Manager" />
          <Input label="Site" defaultValue="HQ Main Gate" />
          <Input label="Scheduled Start" defaultValue="2026-07-10 10:00" />
          <Input label="Scheduled End" defaultValue="2026-07-10 12:00" />
          <Input label="Purpose" defaultValue="Contract coordination meeting" className="sm:col-span-2" />
          <Input label="Escort Required" defaultValue="Yes" />
          <Input label="Vehicle Plate (optional)" defaultValue="RAD *** A" />
          <div className="sm:col-span-2 flex gap-2">
            <Button onClick={() => toast('Visit request submitted')}>Submit</Button>
            <Button variant="outline" onClick={() => toast('Draft saved')}>Save Draft</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

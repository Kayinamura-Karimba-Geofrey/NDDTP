import { FleetSubNav } from '../components/FleetSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function FleetSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Fleet', path: '/fleet/dashboard' }, { label: 'Settings' }]} title="Fleet Settings" description="Vehicle categories, fuel types, maintenance intervals, and approval rules" />
      <FleetSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Vehicle Categories" defaultValue="Passenger, Truck, Bus, Motorcycle, Ambulance, Utility" className="sm:col-span-2" />
          <Input label="Fuel Types" defaultValue="Diesel, Petrol, Hybrid, Electric" className="sm:col-span-2" />
          <Input label="Maintenance Intervals" defaultValue="Preventive every 5,000 km or 6 months" className="sm:col-span-2" />
          <Input label="Inspection Templates" defaultValue="Pre-trip, Monthly, Annual, Post-incident" className="sm:col-span-2" />
          <Input label="Approval Rules" defaultValue="Supervisor → Fleet Officer → Dept Manager (by priority)" className="sm:col-span-2" />
          <Input label="Driver Qualification Rules" defaultValue="Valid license + medical clearance within 12 months" className="sm:col-span-2" />
          <Input label="Notification Templates" defaultValue="License expiry, inspection due, trip approval, maintenance" className="sm:col-span-2" />
          <Input label="Trip Priorities" defaultValue="Normal, Urgent, Emergency" className="sm:col-span-2" />
          <Input label="GPS Module" defaultValue="Optional — disabled until telematics hardware available" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}

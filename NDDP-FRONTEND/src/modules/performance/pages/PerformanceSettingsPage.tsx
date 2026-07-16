import { PerformanceSubNav } from '../components/PerformanceSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function PerformanceSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Performance', path: '/performance/dashboard' }, { label: 'Settings' }]} title="Performance Settings" description="Rating scales, competency frameworks, review templates, and weights" />
      <PerformanceSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Rating Scale" defaultValue="Outstanding, Exceeds, Meets, Needs Improvement, Unsatisfactory" className="sm:col-span-2" />
          <Input label="Competency Framework" defaultValue="Leadership, Communication, Technical, Teamwork, Ethics" className="sm:col-span-2" />
          <Input label="Review Templates" defaultValue="Annual, Quarterly, Probation, Special" className="sm:col-span-2" />
          <Input label="Goal Weight Distribution" defaultValue="Organizational 20%, Department 30%, Individual 50%" className="sm:col-span-2" />
          <Input label="Approval Rules" defaultValue="Supervisor → HR → Executive (by rating level)" className="sm:col-span-2" />
          <Input label="Notification Templates" defaultValue="Review due, Feedback request, Coaching reminder, IDP milestone" className="sm:col-span-2" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}

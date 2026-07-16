import { TrainingSubNav } from '../components/TrainingSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

export function TrainingSettingsPage() {
  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Training', path: '/training/dashboard' }, { label: 'Settings' }]} title="Training Settings" description="Categories, templates, enrollment rules, and competency levels" />
      <TrainingSubNav />
      <Card>
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
          <Input label="Training Categories" defaultValue="Technical, Leadership, Compliance, Health & Safety, Professional Development" />
          <Input label="Default Passing Score (%)" type="number" defaultValue="70" />
          <Input label="Course Templates" defaultValue="Classroom, Online, Hybrid, Workshop" className="sm:col-span-2" />
          <Input label="Enrollment Rules" defaultValue="Supervisor approval required for external courses" className="sm:col-span-2" />
          <Input label="Attendance Policy" defaultValue="Minimum 80% attendance required for certification" className="sm:col-span-2" />
          <Input label="Competency Levels" defaultValue="Beginner, Intermediate, Advanced, Expert" />
          <Input label="Notification Templates" defaultValue="Enrollment confirmation, Exam reminder, Certificate expiry" />
          <div className="sm:col-span-2"><Button>Save Settings</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}
